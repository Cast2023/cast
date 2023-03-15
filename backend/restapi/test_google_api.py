from unittest.mock import patch, MagicMock

from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework.response import Response
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import Employees
from restapi.verificationAPI import VerifyOAuthTokenApi

class TestVerifyOAuthTokenApi(TestCase):
    def setUp(self):
        self.api = VerifyOAuthTokenApi()
        self.factory = APIRequestFactory()
        Employees.objects.create(first_name='Aku',last_name='Ankka',email='aku.ankka@gmail.com')

    def test_api_returns_response_object(self):
        request = self.factory.get("api/verify-google-token")
        return_value = self.api.get(request)

        self.assertIsInstance(return_value, Response)
        self.assertEqual(return_value.status_code, 401)
        self.assertTrue("Not authorized" in return_value.data)

    @patch.object(id_token, 'verify_oauth2_token', MagicMock(return_value={'email':'aku.ankka@gmail.com'}))
    @patch.object(requests, 'Request', MagicMock(return_value="Pepparkakor"))
    def test_api_returns_status_200_when_correct_token(self):
        header = {'HTTP_AUTHORIZATION': '"Bysanttilaista dädää!"'}
        request = self.factory.get("api/verify-google-token", **header)
        return_value = self.api.get(request)
        requests.Request.assert_called()
        self.assertEqual(return_value.status_code, 200)
    
    @patch.object(id_token, 'verify_oauth2_token', MagicMock(return_value={'email':'aku.ankka@gmail.com'}))
    @patch.object(requests, 'Request', MagicMock(return_value="Pepparkakor"))
    def test_existing_user_is_found_from_database(self):
        header = {'HTTP_AUTHORIZATION': '"Bysanttilaista dädää!"'}
        request = self.factory.get("api/verify-google-token", **header)
        return_value = self.api.get(request)
        user = Employees.objects.get(id=return_value.data[0])
        requests.Request.assert_called()
        self.assertTrue(user.email, 'aku.ankka@gmail.com')

    @patch.object(id_token, 'verify_oauth2_token', MagicMock(return_value={'email':'iines.ankka@gmail.com', 'first_name': 'Iines', 'last_name': 'Ankka'}))
    @patch.object(requests, 'Request', MagicMock(return_value="Pepparkakor"))
    def text_new_user_is_created_to_database(self):
        header = {'HTTP_AUTHORIZATION': '"Bysanttilaista dädää!"'}
        request = self.factory.get("api/verify-google-token", **header)
        return_value = self.api.get(request)
        user = Employees.objects.get(id=return_value.data[0])
        requests.Request.assert_called()
        self.assertTrue(user.email, 'iines.ankka@gmail.com')

    @patch.object(id_token, 'verify_oauth2_token', MagicMock(side_effect=ValueError()))
    @patch.object(requests, 'Request', MagicMock())
    def test_api_returns_status_401_when_incorrect_token(self):
        header = {'HTTP_AUTHORIZATION': '"Bysanttilaista dädää!"'}
        request = self.factory.get("api/verify-google-token", **header)
        return_value = self.api.get(request)

        id_token.verify_oauth2_token.assert_called()
        self.assertEqual(return_value.status_code, 401)
        self.assertTrue("Invalid token" in return_value.data)