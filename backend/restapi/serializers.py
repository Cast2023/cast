from rest_framework import serializers

from .models import Employees
from .models import Employee_tech_skills
from .models import Techs


class TechSerializer(serializers.ModelSerializer):
    class Meta:
        model = Techs
        fields = ('tech_name')

class TechSkillSerializer(serializers.ModelSerializer):
    tech_name = serializers.StringRelatedField(source='tech.tech_name')
    class Meta:
        model = Employee_tech_skills
        fields = ('skill_level', 'tech', 'tech_name')

class ConsultantSerializer(serializers.ModelSerializer):
    skills = TechSkillSerializer(many=True)
    class Meta:
        model = Employees
        fields = ('first_name', 'last_name', 'email', 'skills')
        depth = 2
    
    def update(self, instance, validated_data):
        updated_skill_list = validated_data.pop('skills')
        consultant_skills = list((instance.skills).all())
    
        
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        print(updated_skill_list)
        print(instance.id)

        for updated_skill in updated_skill_list:
            updated = False
            for skill in consultant_skills:
                print(skill.tech, updated_skill['tech'].id)
                if updated_skill['tech']== skill.tech:
                    skill.skill_level = updated_skill['skill_level']
                    skill.save()
            if not updated:
                # pass
                Employee_tech_skills.objects.create(employee=instance, tech=updated_skill['tech'], skill_level=updated_skill['skill_level'])
        return instance
    
