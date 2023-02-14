from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from restapi.models import Employee_tech_skills, Employees
from .serializers import TechSkillSerializer, ConsultantSerializer

class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSkillSerializer
    queryset = Employee_tech_skills.objects.all()
   
# class ConsultantAPIView(viewsets.ModelViewSet):
#     """
#     This viewset automatically provides `list`, `create`, `retrieve`,
#     `update` and `destroy` actions.

#     Additionally we also provide an extra `highlight` action.
#     """
#     queryset = Employees.objects.all()
#     serializer_class = ConsultantSerializer
    

class ConsultantAPIView(viewsets.ModelViewSet):
    queryset = Employees.objects.all()
    serializer_class = ConsultantSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'first_name', 'last_name', 'skills']
    search_fields = ['first_name', 'last_name']






