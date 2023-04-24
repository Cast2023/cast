from django.http import JsonResponse


def token_required(func):
    """login_requred analog for API"""

    def wrap(request, *args, **kwargs):
        error401 = JsonResponse({'error': 'Authentication error'}, status=401)

        if 'HTTP_AUTHORIZATION' in request.META:
            if request.user is None or not request.user.is_active:
                return error401
            else:
                return func(request, *args, **kwargs)
        else:
            return error401

    return wrap
