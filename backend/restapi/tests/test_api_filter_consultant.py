from django.test import Client
from django.test.client import encode_multipart
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from restapi.models import Employees, Techs, Employee_tech_skills


class EmployeeFilterTests(APITestCase):
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