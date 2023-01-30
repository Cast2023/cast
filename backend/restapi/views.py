from django.shortcuts import render
from django.http import HttpResponseRedirect
from restapi.models import Employee_tech_skills, Users


from rest_framework import viewsets
from .serializers import TechSkillSerializer, ConsultSerializer


def index(request):
    return render(request, 'backend/index.html')

class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSkillSerializer
    queryset = Employee_tech_skills.objects.all()

class ConsultAPIView(viewsets.ModelViewSet):
    serializer_class = ConsultSerializer
    queryset = Users.objects.all()