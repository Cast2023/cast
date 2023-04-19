from django.contrib.auth import authenticate
from restapi.models import Token


def get_token(request):
    """Get token from HTTP header"""
    
    if 'HTTP_AUTHORIZATION' in request.META:
        full_auth = request.META['HTTP_AUTHORIZATION'].split(' ')

        if len(full_auth) < 2 or full_auth[0] != 'Token':
            return None

        auth = full_auth[1].split('=')

        if len(auth) < 2 or auth[0] != 'token':
            return None

        token = auth[1].strip('"')

        return token

    return None


class AuthAPI(object):
    """
    Add user to request var for API calls
    Header format (RFC2617):
    Authorization: Token token="abcd1234"
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.get_full_path()[:4] != '/api':
            return self.get_response(request)

        token = get_token(request)
        if token:
            user = authenticate(token=token)
            fetched_token = Token.objects.get(token=token)

            if user and user.is_active and not fetched_token.is_expired:
                request.user = user

        return self.get_response(request)
