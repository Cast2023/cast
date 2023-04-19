from django.test import Client
from django.test.client import encode_multipart
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from restapi.models import Project, Employees, Token
from django.utils import timezone

class ProjectGetTests(APITestCase):
    url = reverse('integration-token-list')
    
    def setUp(self):
        self.client = Client()

        user1 = Employees.objects.create(
            first_name='John',
            last_name='Doe',
            email='tester@gmail.com'
        )
        self.token_for_user1 = Token.objects.create(user=user1, token='1234567890')
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token token=' + self.token_for_user1.token)
        self.factory = APIRequestFactory()

        Token.objects.create(
            token = 'abc123',
            ttl = 3600,
            created_at = timezone.now(),
            token_name = 'integration_one',
            is_integration_token = True,
            user = user1
        )

        Token.objects.create(
            token = 'bcd234',
            ttl = 36000,
            created_at = timezone.now(),
            token_name = 'integration_two',
            is_integration_token = True,
            user = user1
        )



    def test_get_integration_tokens_returns_status_code_ok(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_get_integration_tokens_returns_a_list(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertIsInstance(result, list)
    
    def test_get_integration_tokens_returns_all_created_tokens(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result[0]['token'] + result[1]['token'], 'abc123bcd234')


class IntegrationTokenPostTests(APITestCase):
    url = reverse('integration-token-list')
    
    def setUp(self):
        self.client = Client()

        self.user1 = Employees.objects.create(
            first_name='John',
            last_name='Doe',
            email='tester@gmail.com'
        )
        self.token_for_user1 = Token.objects.create(user=self.user1, token='1234567890')
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token token=' + self.token_for_user1.token)
        self.factory = APIRequestFactory()

        Token.objects.create(
            token = 'abc123',
            ttl = 3600,
            created_at = timezone.now(),
            token_name = 'integration_one',
            is_integration_token = True,
            user = self.user1
        )
    
    def test_post_project_returns_status_code_201(self):
        data = {
            'token': 'bcd123',
            'ttl': 3600,
            'created_at': '2021-10-19 16:01:00',
            'token_name': 'integration_two',
            'is_integration_token': False,
            'user': self.user1.id
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        response = self.client.post(self.url, content, content_type=content_type)
        self.assertEqual(response.status_code, 201)

    def test_posted_project_is_found_in_db(self):
        data = {
            'token': 'cde345',
            'ttl': 3600,
            'created_at': '2021-10-19 16:01:00',
            'token_name': 'integration_two',
            'is_integration_token': False,
            'user': self.user1.id
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        response = self.client.post(self.url, content, content_type=content_type)
        result = response.json()
        print(result)
        
        self.assertEqual(result['token'], 'cde345')


class IntegrationTokenPostTests(APITestCase):
    
    def setUp(self):
        self.client = Client()
        self.url = reverse('integration-token-list')

        self.user1 = Employees.objects.create(
            first_name='John',
            last_name='Doe',
            email='tester@gmail.com'
        )
        self.token_for_user1 = Token.objects.create(user=self.user1, token='1234567890')
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token token=' + self.token_for_user1.token)
        self.factory = APIRequestFactory()

        self.token = Token.objects.create(
            token = 'abc123',
            ttl = 3600,
            created_at = timezone.now(),
            token_name = 'integration_one',
            is_integration_token = True,
            user = self.user1
        )
    
    def test_delete_token_returns_204(self):
        token_object_path = self.url + str(self.token.id)
        response = self.client.delete(token_object_path)
        self.assertEqual(response.status_code, 204)
