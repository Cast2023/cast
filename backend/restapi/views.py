from rest_framework import viewsets, filters, generics, status
from django_filters import rest_framework as rest_filters
import io
import csv
import pandas as pd
from rest_framework.response import Response


from restapi.models import Employees, Techs, Certificates
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
        data_as_dict = {}
        for index, row in content.iterrows():
            name = row['Name']
            certificate = [col for col in content.columns[1:]
                           if str(row[col]).lower() == 'x']
            certificate.append(row["Expiration Date (DD/MM/YYYY)"])
            if not name in data_as_dict:
                data_as_dict[name] = []
            data_as_dict[name].append(certificate)
        print(data_as_dict)
        return Response({"status": "success"}, status.HTTP_201_CREATED)
