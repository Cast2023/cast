from django.test import Client
from django.test.client import encode_multipart
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from restapi.models import Employees, Techs, Employee_tech_skills, Certificate, Project, Employee_certificates, Employee_projects
class EmployeeFilterTests(APITestCase):
    def setUp(self):

        self.client = Client()
        
        tech_python = Techs.objects.create(
            tech_name='Python'
        )
        tech_django = Techs.objects.create(
            tech_name='Django'
        )
        tech_react = Techs.objects.create(
            tech_name='React'
        )
        tech_js = Techs.objects.create(
            tech_name='JavaScript'
        )

        cert_aws_1 = Certificate.objects.create(
            certificate_name='AWS Certified Cloud Practitioner',
            vendor='AWS',
        )
        cert_aws_2 = Certificate.objects.create(
            certificate_name='AWS Certified Solutions Architect - Associate',
            vendor='AWS',
        )
        cert_aws_3 = Certificate.objects.create(
            certificate_name='AWS Certified Developer - Associate',
            vendor='AWS',
        )
        
        cert_ms_1 = Certificate.objects.create(
            certificate_name='Microsoft Certified: Azure Fundamentals',
            vendor='Microsoft',
        )
        cert_ms_2 = Certificate.objects.create(
            certificate_name='Microsoft Certified: Azure Data Fundamentals',
            vendor='Microsoft',
        )
        cert_ms_3 = Certificate.objects.create(
            certificate_name='Microsoft Certified: Azure AI Fundamentals',
            vendor='Microsoft',
        )

        project_1 = Project.objects.create(
            project_name='Project 1',
            project_start_date='2020-01-01',
            project_end_date='2020-12-31',
            confidential=True,
        )
        project_2 = Project.objects.create(
            project_name='Project 2',
            project_start_date='2022-01-01',
            project_end_date='2023-12-31',
            confidential=False,
        )
        project_3 = Project.objects.create(
            project_name='Project 3',
            project_start_date='2023-01-01',
            project_end_date='2024-12-31',
            confidential=True,
        )

        consultant_1 = Employees.objects.create(
            first_name='John',
            last_name='Doe',
            email='tester@gmail.com',
            phone_number='1234567890',
            location_country='Finland',
            location_city='Helsinki',
            worktime_allocation='80',
            allocation_until='2021-01-01',
            wants_to_do='Backend',
            wants_not_to_do='Frontend',
        )



        consultant_2 = Employees.objects.create(
            first_name='Jane',
            last_name='Watson',
            email='watson@gmail.com',
            phone_number='0415559091',
            location_country='Finland',
            location_city='Vaasa',
            worktime_allocation='100',
            allocation_until='2024-01-01',
            wants_to_do='Django',
            wants_not_to_do='Cobol',
        )

        consultant_3 = Employees.objects.create(
            first_name='Pauline',
            last_name='Robson',
            email='robson@gmail.com',
            phone_number='7779995551',
            location_country='Finland',
            location_city='Espoo',
            worktime_allocation='600',
            allocation_until='2023-07-01',
            wants_to_do='GitHub',
            wants_not_to_do='GitLab',
        )


        Employee_tech_skills.objects.create(employee=consultant_1, tech=tech_python, skill_level=1, tech_preference=True)
        Employee_tech_skills.objects.create(employee=consultant_1, tech=tech_django, skill_level=2, tech_preference=True)
        Employee_tech_skills.objects.create(employee=consultant_1, tech=tech_react, skill_level=3, tech_preference=False)
        Employee_tech_skills.objects.create(employee=consultant_2, tech=tech_js, skill_level=1, tech_preference=True)
        Employee_tech_skills.objects.create(employee=consultant_2, tech=tech_django, skill_level=1, tech_preference=False)
        Employee_certificates.objects.create(employee=consultant_1, cert=cert_aws_1, valid_until='2023-01-01')
        Employee_certificates.objects.create(employee=consultant_1, cert=cert_aws_2, valid_until='2024-01-01')
        Employee_certificates.objects.create(employee=consultant_1, cert=cert_ms_3, valid_until='2023-06-01')
        Employee_certificates.objects.create(employee=consultant_2, cert=cert_ms_1, valid_until='2023-01-01')
        Employee_certificates.objects.create(employee=consultant_2, cert=cert_ms_2, valid_until='2024-06-01')
        Employee_projects.objects.create(employee=consultant_1, project=project_1)
        Employee_projects.objects.create(employee=consultant_1, project=project_2)
        Employee_projects.objects.create(employee=consultant_2, project=project_1)
        Employee_projects.objects.create(employee=consultant_2, project=project_3)

    
    def test_filter_with_last_name_returns_one_match(self):
        search_url = '/api/consultant/?last_name=Watson'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 1)
    
    def test_filter_with_last_name_returns_selected_user(self):
        search_url = '/api/consultant/?last_name=Doe'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(result[0]['email'], 'tester@gmail.com')

    def test_filter_with_first_name_returns_one_match(self):
        search_url = '/api/consultant/?first_name=Jane'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 1)
    
    def test_filter_with_first_name_returns_selected_user(self):
        search_url = '/api/consultant/?first_name=John'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(result[0]['email'], 'tester@gmail.com')

    def test_filter_vendor_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?cert_vendor=AWS'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 1)

    def test_filter_certificates_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?certificate=Microsoft Certified: Azure Fundamentals'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 1)

    def test_filter_by_project_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?project=Project 1'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 2)

    def test_filter_by_tech_skill_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?tech=Django'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 2)
    
    def test_filter_by_two_tech_skills_return_all_applicable_matches(self):
        search_url = '/api/consultant/?tech=django,python'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 1)

    def test_filter_by_tech_and_preference_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?tech_and_pref=django,true'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 1)

    def test_filter_by_tech_and_skill_level_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?tech_and_level=django,2'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 1)

    def test_filter_certificates_valid_less_than_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?cert_valid_until__lte=2023-01-01'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 2)

    def test_filter_certificates_valid_more_than_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?cert_valid_until__gte=2024-01-01'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 2)
    
    def test_filter_certificates_valid_more_than_or_vendor_microsoft_returns_all_applicable_matches(self):
        search_url = '/api/consultant/?cert_valid_until__gte=2024-01-01&cert_vendor=Microsoft'
        response = self.client.get(search_url)
        result = response.json()
        self.assertEqual(len(result), 2)
