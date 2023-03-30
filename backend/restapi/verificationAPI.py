from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from google.oauth2 import id_token
from google.auth.transport import requests

from django.conf import settings
from .models import Employees


class VerifyOAuthTokenApi(APIView):
    def get(self, request):
        CLIENT_ID = settings.ENV["OAUTH_CLIENT_ID"]

        try:
            auth_token = request.headers.get("Authorization").strip("\"")

        # Should be more spesific, possible scenarios are at least KeyError and AttributeError
        except Exception:
            return Response("Error: Not authorized", status=401) # Something else is wrong
        
        userinfo = {}

        try:
            userinfo = id_token.verify_oauth2_token(auth_token, requests.Request(), CLIENT_ID)
            
        except ValueError as error:
            return Response(f"Invalid token, you shall not pass! {error}", status=401) # Token invalid
 
        user = self.get_user_from_db(userinfo['email'])

        if not user:
            Employees.objects.create(
                first_name=userinfo['given_name'],
                last_name=userinfo['family_name'],
                email=userinfo['email'],
            )

            user = self.get_user_from_db(userinfo['email'])

        api_token, _ = Token.objects.get_or_create(user=user)

        return Response([user.id, auth_token, str(api_token)], status=200)

    def get_user_from_db(self, email):
        if Employees.objects.filter(email__exact=email).exists():
            return Employees.objects.get(email__exact=email)

        return False
