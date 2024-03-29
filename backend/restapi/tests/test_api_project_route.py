from django.test import Client
from django.test.client import encode_multipart
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from restapi.models import Project, Employees, Token


class ProjectGetTests(APITestCase):
    url = reverse('project-list')
    
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

        Project.objects.create(
            project_name='CastCorp',
            project_start_date='2021-10-19',
            project_end_date='2022-05-15',
            confidential=False
        )
        Project.objects.create(
            project_name='Castbook',
            project_start_date='2022-01-01',
            project_end_date='2022-12-30',
            confidential=True
        )

    def test_get_projects_returns_status_code_ok(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_get_projects_returns_a_list(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertIsInstance(result, list)
    
    def test_get_projects_returns_all_created_projects(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result[0]['project_name'] + result[1]['project_name'], 'CastCorpCastbook')


class ProjectPostTests(APITestCase):
    url = reverse('project-list')
    
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

        Project.objects.create(
            project_name='Castbook',
            project_start_date='2022-01-01',
            project_end_date='2022-12-30',
            confidential=True
        )
    
    def test_post_project_returns_status_code_201(self):
        data = {
            'project_name': 'CastCorp',
            'project_start_date': '2021-10-19',
            'project_end_date': '2022-05-15',
            'confidential': False
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        response = self.client.post(self.url, content, content_type=content_type)
        self.assertEqual(response.status_code, 201)

    def test_posted_project_is_found_in_db(self):
        data = {
            'project_name': 'CastCorp',
            'project_start_date': '2021-10-19',
            'project_end_date': '2022-05-15',
            'confidential': False
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        self.client.post(self.url, content, content_type=content_type)
        response = self.client.get(self.url)
        result = response.json()
        
        self.assertEqual(result[0]['project_name'] + result[1]['project_name'], 'CastbookCastCorp')
        self.assertEqual(result[1]['project_start_date'], '2021-10-19')
        self.assertEqual(result[1]['project_end_date'], '2022-05-15')
        self.assertFalse(result[1]['confidential'])
