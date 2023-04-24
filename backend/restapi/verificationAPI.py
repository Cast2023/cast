from rest_framework.views import APIView
from rest_framework.response import Response
from google.oauth2 import id_token
from google.auth.transport import requests
from django.utils import timezone

from django.conf import settings
from .models import Employees, Token
from .utils import generate_token


class VerifyOAuthTokenApi(APIView):
    def get(self, request):
        CLIENT_ID = settings.ENV["OAUTH_CLIENT_ID"]

        try:
            auth_token = request.headers.get("Authorization").strip("\"")

        # Should be more spesific, possible scenarios are at least KeyError and AttributeError
        except Exception:
            return Response("Error: Not authorized", status=401) # Something else is wrong
        
        try:
            userinfo = id_token.verify_oauth2_token(auth_token, requests.Request(), CLIENT_ID)
            user, _ = Employees.objects.filter(email__exact=userinfo['email']).get_or_create(
                email=userinfo['email'],
                defaults={
                    "first_name":userinfo['given_name'],
                    "last_name":userinfo['family_name'],
                }
            )
            api_token, _ = Token.objects.get_or_create(user=user, is_integration_token=False)
            if api_token.is_expired:
                api_token.token = generate_token()
                api_token.created_at = timezone.now()
                api_token.ttl = 3600
                api_token.save()

    
        except (ValueError, KeyError) as error: # error for debugging purposes, should be removed later
            return Response(f"Invalid token, you shall not pass! {error}", status=401) # Auth token invalid
        
        return Response([user.id, auth_token, api_token.token], status=200)
