from rest_framework import viewsets, filters, generics, status
from django_filters import rest_framework as rest_filters
import io
import csv
import pandas as pd
from rest_framework.response import Response


from restapi.models import Employees, Techs, Certificates, Employee_certificates
from .serializers import TechSerializer, CertSerializer, ConsultantSerializer, FileUploadSerializer


class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSerializer
    queryset = Techs.objects.all()


class CertAPIView(viewsets.ModelViewSet):
    serializer_class = CertSerializer
    queryset = Certificates.objects.all()


class EmployeeFilter(rest_filters.FilterSet):
    first_name = rest_filters.CharFilter(
        field_name='first_name', lookup_expr='icontains')
    last_name = rest_filters.CharFilter(
        field_name='last_name', lookup_expr='icontains')

    class Meta:
        fields = ("first_name",)
        model = Employees


class ConsultantAPIView(viewsets.ModelViewSet):
    queryset = Employees.objects.all()
    serializer_class = ConsultantSerializer
    filter_backends = [rest_filters.DjangoFilterBackend, filters.SearchFilter]
    filterset_class = EmployeeFilter
    search_fields = [
        'first_name',
        'last_name',
        'location_city',
        'location_country',
        'email',
        'phone_number',
        'worktime_allocation',
        'wants_to_do',
        'wants_not_to_do',
        'techs__tech_name'
    ]


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
                if not Certificates.objects.filter(certificate_name__exact=certificate[0]).exists():
                    Certificates.objects.create(
                        certificate_name=certificate[0])
                certificate.append(row["Expiration Date (DD/MM/YYYY)"])
                if not name in data_as_dict:
                    data_as_dict[name] = []
                data_as_dict[name].append(certificate)
        return data_as_dict

    def add_certificates_to_employees(self, data_as_dict: dict):
        result = {
            "found_employees": [],
            "not_found_employees": []
        }
        for employee in data_as_dict.keys():
            first_name, last_name = employee.split(" ")
            if Employees.objects.filter(first_name=first_name, last_name=last_name).exists():
                instance = Employees.objects.get(
                    first_name=first_name, last_name=last_name)
                certs = data_as_dict[employee]
                for list_item in certs:
                    certificate, valid_until = list_item
                    Employee_certificates.objects.create(
                        employee=instance, certificate=certificate, valid_until=valid_until)
                result["found_employees"].append(employee)
            else:
                result["not_found_employees"].append(employee)
        return result
