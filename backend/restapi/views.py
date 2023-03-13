from rest_framework import viewsets, filters
from django_filters import rest_framework as rest_filters 


from restapi.models import Employees, Techs
from .serializers import TechSerializer, ConsultantSerializer

class TechsFilter(rest_filters.FilterSet):
    tech_name = rest_filters.CharFilter(field_name='tech_name')

    class Meta:
        fields = ("tech_name",)
        model = Techs

class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSerializer
    queryset = Techs.objects.all()
    filter_backends = [rest_filters.DjangoFilterBackend, filters.SearchFilter]
    filterset_class = TechsFilter
    search_fields = [
        'tech_name'
        ]

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

