from unittest import skip
from django.test import TestCase
from django.test import Client
from django.test.client import encode_multipart, RequestFactory

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from .models import Employees, Techs, Employee_tech_skills

class EmployeeGetTests(APITestCase):
    url = reverse('consultant-list')
    
    def setUp(self):

        self.client = Client()

        Employees.objects.create(
            first_name='John',
            last_name='Doe',
            email='tester@gmail.com'
            )
        
        Employees.objects.create(
            first_name='Jane',
            last_name='Watson',
            email='watson@gmail.com'
            )

    def test_get_employees_returns_status_code_ok(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_get_employees_returns_a_list(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertIsInstance(result, list)
    
    def test_get_employees_returns_a_created_user(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result[0]['email'], 'tester@gmail.com')

class EmployeeUpdateTests(APITestCase):
    """Each TestCase is a transaction and so there is no pre-knowledge of the id's of database instances.
        Because of this the created employees are first fetched and an id is extracted to ensure that
        tests run properly.
    """
    def setUp(self):
        self.client = APIClient()
        self.factory = APIRequestFactory()

        user1 = Employees.objects.create(
            first_name='John',
            last_name='Doe',
            email='tester@gmail.com'
            )
        
        Employees.objects.create(
            first_name='Jane',
            last_name='Watson',
            email='watson@gmail.com'
            )
        tech1 = Techs.objects.create(
            tech_name='Python'
        )
        Employee_tech_skills.objects.create(
            employee = user1,
            tech = tech1,
            skill_level = 3
        )
        self.url_base = reverse('consultant-list')
    
    def get_base_url(self):
        response_base = self.client.get(self.url_base).json()
        employee = response_base[0]
        url = reverse('consultant-detail', args=[employee['id']])
        return url
    
    def test_get_employee_by_id_returns_status_code_ok(self):
        url = self.get_base_url()
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
    
    def test_editing_existing_employee_works(self):
        url = self.get_base_url()
        data = {
            'first_name': 'Jackie',
            'last_name': 'Doe',
            'email': 'tester@gmail.com',
        }
        
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Employees.objects.filter(email = 'tester@gmail.com')[0].first_name, 'Jackie')

    def test_update_content_with_skills_returns_200(self):
        url = self.get_base_url()
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'tester@gmail.com',
            'skills': [
                {
                    "skill_level": 1,
                    "tech": 1,
                },
            ]
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        response = self.client.patch(url, content, content_type=content_type)
        self.assertEqual(response.status_code, 200)
    
    def test_a_skill_level_can_be_altered_data(self):
        url = self.get_base_url()
        data = {
            'first_name': 'John',
            'last_name': 'Dough',
            'email': 'tester@gmail.com',
            'skills': [
                {
                    'tech': 1,        
                    'skill_level': 2
                }
            ]
        }
        
        client = self.client
        response = client.patch(url, data, format='json')
        response = self.client.get(url)
        result = response.json()
        self.assertEqual(result['skills'][0]['skill_level'], 2)
        

        
class EmployeeSearchTests(APITestCase):
    url = reverse('consultant-list')    
    def setUp(self):
        self.client = Client()
        Employees.objects.create(
            first_name='John',
            last_name='Doe',
            email='tester@gmail.com'
            )
        Employees.objects.create(
            first_name='Jane',
            last_name='Watson',
            email='watson@gmail.com'
            )

    def test_search_returns_a_match_on_last_name(self):
        search_url = '/api/consultant/?search=Doe'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(result[0]['email'], 'tester@gmail.com')

    def test_with_string_gmail_returns_two_matches(self):
        search_url = '/api/consultant/?search=gmail'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 2)
    
class EmployeeFiltertTests(APITestCase):

    def setUp(self):

        self.client = Client()

        Employees.objects.create(
            first_name='John',
            last_name='Doe',
            email='tester@gmail.com'
            )
        
        Employees.objects.create(
            first_name='Jane',
            last_name='Watson',
            email='watson@gmail.com'
            )

    def test_filter_with_last_name_returns_selected_user(self):
        search_url = '/api/consultant/?last_name=Doe'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(result[0]['email'], 'tester@gmail.com')

class TechGetTests(APITestCase):
    url = reverse('tech-list')
    
    def setUp(self):

        self.client = Client()

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