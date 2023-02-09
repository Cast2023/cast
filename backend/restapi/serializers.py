from rest_framework import serializers

from .models import Employees
from .models import Employee_tech_skills


class TechSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee_tech_skills
        fields = ['skill_level']

class ConsultantSerializer(serializers.ModelSerializer):
    skills = serializers.StringRelatedField(many=True)
    class Meta:
        model = Employees
        fields = '__all__'
        depth = 2
    
