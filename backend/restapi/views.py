from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from restapi.models import Employee_tech_skills, Employees
from .serializers import TechSkillSerializer, ConsultantSerializer

class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSkillSerializer
    queryset = Employee_tech_skills.objects.all()
    

class ConsultantAPIView(viewsets.ModelViewSet):
    queryset = Employees.objects.all()
    serializer_class = ConsultantSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = [
        'id',
        'first_name',
        'last_name', 
        'location_city', 
        'location_country', 
        'email', 
        'phone_number', 
        'worktime_allocation', 
        'wants_to_do', 
        'wants_not_to_do'
        ]
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


