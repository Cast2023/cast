from django.shortcuts import render
from django.http import HttpResponseRedirect
from rest_framework import viewsets

from restapi.models import Employee_tech_skills, Employees
from .serializers import TechSkillSerializer, ConsultantSerializer


class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSkillSerializer
    queryset = Employee_tech_skills.objects.all()

class ConsultantAPIView(viewsets.ModelViewSet):
    serializer_class = ConsultantSerializer
    queryset = Employees.objects.all()