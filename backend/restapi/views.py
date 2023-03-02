from rest_framework import viewsets, filters, generics
from django_filters import rest_framework as rest_filters 
import io, csv, pandas as pd
from rest_framework.response import Response


from restapi.models import Employees, Techs, Certificates
from .serializers import TechSerializer, ConsultantSerializer, FileUploadSerializer

class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSerializer
    queryset = Techs.objects.all()

class EmployeeFilter(rest_filters.FilterSet):
    first_name = rest_filters.CharFilter(field_name='first_name', lookup_expr='icontains')
    last_name = rest_filters.CharFilter(field_name='last_name', lookup_expr='icontains')

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
        reader = pd.read_csv(file)
        print(reader)
        # for _, row in reader.iterrows():
        #     if Employees.objects.get(email=row['email']):
        #         new_certificate = Employees(
        #                 Certificates(
        #                     valid_until = ["Expiration Date (DD/MM/YYYY)"]
        #                 )
        #                 )
        #         new_certificate.save()
        # return Response({"status": "success"},
        #                 status.HTTP_201_CREATED)