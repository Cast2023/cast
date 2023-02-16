from django.test import TestCase
from django.test import Client
from django.test.client import encode_multipart, RequestFactory


# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Employees

class EmployeeTests(APITestCase):
    url = '/api/consultant/'
    
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
    
    def test_get_employees_returns_the_created_user(self):
        
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result[0]['email'], 'tester@gmail.com')

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
    
    def test_filter_with_last_name_returns_selected_user(self):
        search_url = '/api/consultant/?last_name=Doe'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(result[0]['email'], 'tester@gmail.com')

    def test_editing_existing_employee_works(self):
        patch_url = '/api/consultant/1/'
        data = {
            'first_name': 'Jack',
            'last_name': 'Doe',
            'email': 'tester@gmail.com',
            'skills': []
        }
        factory = RequestFactory()
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        response = self.client.patch(patch_url, content, content_type=content_type)
        self.assertEqual(response.status_code, 200)
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # self.assertEqual(Employees.objects.filter(email = 'tester@gmail.com')[0].first_name, 'Jack')

        
    def creating_a_new_employee_works(self):
        """
        Ensure we can create a new Employee object.
        """
        url = '/api/consultant/'
        data = {
            'first_name': 'Sherlock',
            'last_name': 'Holmes',
            'email': 'baskerville@gmail.com',
            }
        response = self.client.post(url, data, format='json')
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employees.objects.count(), 3)
        self.assertEqual(Employees.objects.get().email, 'baskerville@gmail.com')