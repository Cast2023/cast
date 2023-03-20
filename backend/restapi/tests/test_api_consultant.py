from django.test import Client
from django.test.client import encode_multipart
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from restapi.models import (
    Employees,
    Techs,
    Employee_tech_skills,
    Certificate,
    Employee_certificates,
    Project,
    Employee_projects
)

class EmployeeGetTests(APITestCase):
    url = reverse('consultant-list')
    
    def setUp(self):
        client = Client()

        user1 = Employees.objects.create(
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
        tech1 = Techs.objects.create(
            tech_name='Python'
        )
        cert1 = Certificate.objects.create(
            vendor='Amazon',
            certificate_name='AWS Certified Cloud Practitioner'
        )
        project1 = Project.objects.create(
            project_name='CastCorp',
            project_start_date='2021-10-19',
            project_end_date='2022-05-15',
            confidential=False
        )
        Employee_tech_skills.objects.create(
            employee = user1,
            tech = tech1,
            skill_level = 3
        )  
        Employee_certificates.objects.create(
            employee = user1,
            cert = cert1,
            valid_until = '2025-01-01'
        )
        Employee_projects.objects.create(
            employee = user1,
            project = project1,
            employee_participation_start_date = '2022-01-01',
            employee_participation_end_date = '2022-03-30',
            allocation_busy = 60,
        )
        self.response = client.get(self.url)
        self.result = self.response.json()

    def test_get_employees_returns_status_code_ok(self):
        self.assertEqual(self.response.status_code, 200)

    def test_get_employees_returns_a_list(self):        
        self.assertIsInstance(self.result, list)
    
    def test_get_employees_returns_correct_name_for_single_user(self):
        self.assertEqual(self.result[1]['first_name'], 'Jane')
        self.assertEqual(self.result[1]['last_name'], 'Watson')
        
    def test_get_employees_returns_correct_contact_info_for_single_user(self):
        self.assertEqual(self.result[1]['email'], 'watson@gmail.com')
        self.assertEqual(self.result[1]['phone_number'], '+358502345678')
        
    def test_get_employees_returns_correct_location_for_single_user(self):
        self.assertEqual(self.result[1]['location_country'], 'Finland')
        self.assertEqual(self.result[1]['location_city'], 'Helsinki')
        
    def test_get_employees_returns_correct_worktime_info_for_single_user(self):
        self.assertEqual(self.result[1]['worktime_allocation'], 100)
        self.assertEqual(self.result[1]['allocation_until'], '2029-12-31')
    
    def test_get_employees_returns_correct_preferences_for_single_user(self):
        self.assertEqual(self.result[1]['wants_to_do'], 'Manufacturing sector')
        self.assertEqual(self.result[1]['wants_not_to_do'], 'Banking sector')
        
    def test_get_employees_returns_correct_certs_for_single_user(self):
        certs = self.result[0]['certificates']
        self.assertEqual(len(certs), 1)
        self.assertEqual(certs[0]['vendor'], 'Amazon')
        self.assertEqual(certs[0]['certificate'], 'AWS Certified Cloud Practitioner')
        self.assertEqual(certs[0]['valid_until'], '2025-01-01')
        
    def test_get_employees_returns_correct_projects_for_single_user(self):
        projects = self.result[0]['projects']
        self.assertEqual(len(projects), 1)
        self.assertEqual(projects[0]['project_name'], 'CastCorp')
        self.assertEqual(projects[0]['project_start_date'], '2021-10-19')
        self.assertEqual(projects[0]['employee_participation_start_date'], '2022-01-01')
        self.assertEqual(projects[0]['employee_participation_end_date'], '2022-03-30')
        self.assertEqual(projects[0]['project_end_date'], '2022-05-15')
        self.assertEqual(projects[0]['allocation_busy'], 60)
        self.assertEqual(projects[0]['confidential'], "False")


        
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
        
    
