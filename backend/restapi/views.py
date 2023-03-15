from rest_framework import viewsets, filters, generics, status
from django_filters import rest_framework as rest_filters
import pandas as pd
from rest_framework.response import Response
import datetime

from restapi.models import Employees, Techs, Certificate, Employee_certificates
from .serializers import TechSerializer, CertSerializer, ConsultantSerializer, FileUploadSerializer


class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSerializer
    queryset = Techs.objects.all()


class CertAPIView(viewsets.ModelViewSet):
    serializer_class = CertSerializer
    queryset = Certificate.objects.all()


class EmployeeFilter(rest_filters.FilterSet):
    first_name = rest_filters.CharFilter(
        field_name='first_name', lookup_expr='icontains')
    last_name = rest_filters.CharFilter(
        field_name='last_name', lookup_expr='icontains')
    tech = rest_filters.CharFilter(method='filter_by_tech_name')
    project = rest_filters.CharFilter(method='filter_by_project')
    cert_vendor = rest_filters.CharFilter(method='filter_by_vendor')
    certificate = rest_filters.CharFilter(method='filter_by_certificate')
    cert_valid_until__gte = rest_filters.DateFilter(
        field_name='certificates__valid_until', lookup_expr='gte')
    cert_valid_until__lte = rest_filters.DateFilter(field_name='certificates__valid_until', lookup_expr='lte')

    field = (
        ('first_name', 'first_name'),
        ('last_name', 'last_name'),
        ('tech_name', 'tech'),
    )

    class Meta:
        fields = ('first_name', 'last_name', 'tech', 'project', 'cert_vendor', 'certificate', 'cert_valid_until__gte', 'cert_valid_until__lte')
        model = Employees
    
    def filter_by_tech_name(self, queryset, tech_name, value):
        return queryset.filter(skills__tech__tech_name__icontains=value).distinct()
    
    def filter_by_project(self, queryset, project, value):
        return queryset.filter(projects__project__project_name__icontains=value).distinct()
    
    def filter_by_vendor(self, queryset, vendor, value):
        return queryset.filter(certificates__cert__vendor__icontains=value).distinct()
    
    def filter_by_certificate(self, queryset, certificate, value):
        return queryset.filter(certificates__cert__certificate_name__icontains=value).distinct()


class ConsultantAPIView(viewsets.ModelViewSet):
    queryset = Employees.objects.all()
    serializer_class = ConsultantSerializer
    filter_backends = [rest_filters.DjangoFilterBackend, filters.SearchFilter]
    filterset_class = EmployeeFilter


class ImportCertificatesView(generics.CreateAPIView):
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        content = pd.read_csv(file)
        data_as_dict = self.add_certificates_to_database(content)
        result = self.add_certificates_to_employees(data_as_dict)
        return Response({"status": "success", "result": result}, status.HTTP_201_CREATED)

    def add_certificates_to_database(self, content):
        data_as_dict = {}
        for index, row in content.iterrows():
            name = row['Name']
            certificate = [col for col in content.columns[1:]
                           if str(row[col]).lower() == 'x']
            if len(certificate):
                if not Certificate.objects.filter(certificate_name__exact=certificate[0]).exists():
                    Certificate.objects.create(
                        certificate_name=certificate[0])
                certificate.append(row["Expiration Date (DD/MM/YYYY)"])
                if not name in data_as_dict:
                    data_as_dict[name] = []
                data_as_dict[name].append(certificate)
        return data_as_dict

    def add_certificates_to_employees(self, data_as_dict: dict):
        result = {
            "accepted": [],
            "rejected": []
        }
        for employee in data_as_dict.keys():
            first_name, last_name = employee.split(" ")
            if Employees.objects.filter(first_name=first_name, last_name=last_name).exists():
                instance = Employees.objects.get(
                    first_name=first_name, last_name=last_name)
                certs = data_as_dict[employee]
                for list_item in certs:
                    if len(list_item) < 2:
                        result['rejected'].append([employee, "rejected due to unknown error"])
                        continue
                    certificate_str, valid_until = list_item
                    certificate_obj = Certificate.objects.get(certificate_name=certificate_str)
                    date_is_valid, formatted_valid_until = self.validate_valid_until_date(valid_until)
                    if date_is_valid:
                        Employee_certificates.objects.create(
                            employee=instance, certificate=certificate_obj, valid_until=formatted_valid_until)
                        result["accepted"].append([employee, certificate_str, valid_until])
                    else:
                        result["rejected"].append([employee, certificate_str, valid_until])
            else:
                result["rejected"].append([employee, "Employee not in database"])
        return result
    def validate_valid_until_date(self, date):
        try:
            date = datetime.datetime.strptime(date, '%d/%m/%Y').date()
            return True, date
        except ValueError as error:
            return False, None

