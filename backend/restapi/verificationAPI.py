from rest_framework.views import APIView
from rest_framework.response import Response
from google.oauth2 import id_token
from google.auth.transport import requests

from django.conf import settings
from .models import Users


class VerifyOAuthTokenApi(APIView):
    def get(self, request):
        CLIENT_ID = settings.ENV["OAUTH_CLIENT_ID"]

        try:
            token = request.headers.get("Authorization").strip("\"")

            try:
                #idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
                id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
                return Response("Just keep swimming.", status=200) # Token OK

            except ValueError:
                return Response("Invalid token, you shall not pass!", status=401) # Token invalid

        # Should be more spesific, possible scenarios are at least KeyError and AttributeError
        except Exception:
            return Response("Error: Not authorized", status=401) # Something else is wrong
