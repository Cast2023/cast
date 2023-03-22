from django.test import Client
from django.test.client import encode_multipart
from django.urls import reverse
from rest_framework.test import APITestCase
from restapi.models import Certificate


class CertificateGetTests(APITestCase):
    url = reverse('cert-list')
    
    def setUp(self):
        self.client = Client()

        Certificate.objects.create(
            vendor='Microsoft',
            certificate_name='AZ 900: Microsoft Azure Fundamental'
        )
        Certificate.objects.create(
            vendor='Amazon',
            certificate_name='AWS Certified Cloud Practitioner'
        )

    def test_get_certs_returns_status_code_ok(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_get_certs_returns_a_list(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertIsInstance(result, list)
    
    def test_get_certs_returns_all_created_certs(self):
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result[0]['vendor'] + result[1]['vendor'], 'MicrosoftAmazon')


class CertificatePostTests(APITestCase):
    url = reverse('cert-list')
    
    def setUp(self):
        self.client = Client()

        Certificate.objects.create(
            vendor='Amazon',
            certificate_name='AWS Certified Cloud Practitioner'
        )
    
    def test_post_cert_returns_status_code_201(self):
        data = {
            'vendor': 'Microsoft',
            'certificate_name': 'AZ 900: Microsoft Azure Fundamental'
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        response = self.client.post(self.url, content, content_type=content_type)
        self.assertEqual(response.status_code, 201)

    def test_posted_cert_is_found_in_db(self):
        data = {
            'vendor': 'Microsoft',
            'certificate_name': 'AZ 900: Microsoft Azure Fundamental'
        }
        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        self.client.post(self.url, content, content_type=content_type)
        response = self.client.get(self.url)
        result = response.json()
        
        self.assertEqual(result[0]['vendor'] + result[1]['vendor'], 'AmazonMicrosoft')
        self.assertEqual(result[1]['certificate_name'], 'AZ 900: Microsoft Azure Fundamental')
