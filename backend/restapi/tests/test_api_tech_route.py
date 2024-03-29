from django.test import Client
from django.test.client import encode_multipart
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from restapi.models import Techs, Employees, Token

class TechFilterTests(APITestCase):
    url = reverse('tech-list')
    
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

        Techs.objects.create(
            tech_name='Python'
        )

        Techs.objects.create(
            tech_name='Java'
        )
    def test_filter_tech_name_returns_correct_tech(self):
        search_url = '/api/tech/?tech_name=Java'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(result[0]['tech_name'], 'Java')

class TechGetTests(APITestCase):
    url = reverse('tech-list')
    
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

        Techs.objects.create(
            tech_name='Python'
        )

        Techs.objects.create(
            tech_name='Java'
        )

    def test_get_techs_returns_status_code_ok(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_get_techs_returns_a_list(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertIsInstance(result, list)
    
    def test_get_techs_returns_all_created_techs(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result[0]['tech_name'] + result[1]['tech_name'], 'PythonJava')

class TechPostTests(APITestCase):
    url = reverse('tech-list')
    
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

        Techs.objects.create(
            tech_name='Python'
        )
    
    def test_post_tech_returns_status_code_201(self):
        data = {
            'tech_name': 'Java',
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        response = self.client.post(self.url, content, content_type=content_type)
        self.assertEqual(response.status_code, 201)

    def test_posted_tech_is_found_in_db(self):
        data = {
            'tech_name': 'Java',
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        self.client.post(self.url, content, content_type=content_type)
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result[0]['tech_name'] + result[1]['tech_name'], 'PythonJava')

    def test_posting_existing_tech_returns_existing_tech(self):
        data = {
            'tech_name': 'Python',
        }
        search_url = '/api/tech/?tech_name=Python'

        get_original = self.client.get(search_url)
        original = get_original.json()
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        self.client.post(self.url, content, content_type=content_type)
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(str(result[0]['id'])+result[0]['tech_name'], str(original[0]['id'])+original[0]['tech_name'])