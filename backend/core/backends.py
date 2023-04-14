from django.contrib.auth.backends import BaseBackend

from restapi.models import Employees, Token


class TokenBackend(BaseBackend):
    """Token authentication for API"""

    def authenticate(self, request, token=None):
        try:
            token = Token.objects.get(token=token)
            return token.user
        except Token.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Employees.objects.get(pk=user_id)
        except Employees.DoesNotExist:
            return None