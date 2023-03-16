from django.test import Client
from django.test.client import encode_multipart
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from restapi.models import Employees, Techs, Employee_tech_skills


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
            email='watson@gmail.com',
            phone_number='+358502345678',
            location_country='Finland',
            location_city='Helsinki',
            worktime_allocation=100,
            allocation_until='2029-12-31',
            wants_to_do='Manufacturing sector',
            wants_not_to_do='Banking sector'
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
        self.assertEqual(result[1]['first_name'], 'Jane')
        self.assertEqual(result[1]['last_name'], 'Watson')
        self.assertEqual(result[1]['email'], 'watson@gmail.com')
        self.assertEqual(result[1]['phone_number'], '+358502345678')
        self.assertEqual(result[1]['location_country'], 'Finland')
        self.assertEqual(result[1]['location_city'], 'Helsinki')
        self.assertEqual(result[1]['worktime_allocation'], 100)
        self.assertEqual(result[1]['allocation_until'], '2029-12-31')
        self.assertEqual(result[1]['wants_to_do'], 'Manufacturing sector')
        self.assertEqual(result[1]['wants_not_to_do'], 'Banking sector')


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
        userdata = self.client.get(url).json()
        tech_id = userdata['skills'][0]['tech']
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'tester@gmail.com',
            'skills': [
                {
                    'tech': tech_id,        
                    'skill_level': 2
                }
            ]
        }
        self.client.patch(url, data, format='json')
        response = self.client.get(url)
        result = response.json()
        self.assertEqual(result['skills'][0]['skill_level'], 2)
        
    
