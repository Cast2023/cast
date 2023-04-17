from datetime import timedelta
from rest_framework import serializers

from .models import Employees
from .models import Employee_tech_skills, Employee_certificates, Employee_projects
from .models import Techs, Certificate, Project, Token


class TechSerializer(serializers.ModelSerializer):
    class Meta:
        model = Techs
        fields = ('id', 'tech_name')
    

class CertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ('__all__')


class TechSkillSerializer(serializers.ModelSerializer):
    tech_name = serializers.StringRelatedField(source='tech.tech_name')

    class Meta:
        model = Employee_tech_skills
        fields = ('skill_level', 'tech', 'tech_name', 'tech_preference')

class ProjectSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Project
        fields = ('id', 'project_name', 'project_start_date', 'project_end_date', 'confidential')

class IntegrationTokenSerializer(serializers.ModelSerializer):
    
    email = serializers.StringRelatedField(source='user.email')
    valid_until = serializers.SerializerMethodField()
    
    class Meta:
        model = Token
        fields = ('__all__')

    def get_valid_until(self, obj):
        return (obj.created_at + timedelta(0, obj.ttl))




class EmployeeProjectSerializer(serializers.ModelSerializer):
    project_name = serializers.StringRelatedField(source='project.project_name')
    project_start_date = serializers.StringRelatedField(source='project.project_start_date')
    project_end_date = serializers.StringRelatedField(source='project.project_end_date')
    confidential = serializers.StringRelatedField(source="project.confidential")

    class Meta:
        model = Employee_projects
        fields = ('project', 'project_name', 'project_start_date', 'employee_participation_start_date', 'employee_participation_end_date', 'project_end_date', 'allocation_busy', 'confidential')

class EmployeeCertSerializer(serializers.ModelSerializer):
    vendor = serializers.StringRelatedField(source='cert.vendor')
    certificate = serializers.StringRelatedField(source='cert.certificate_name')
    class Meta:
        model = Employee_certificates
        fields = ('cert', 'vendor', 'certificate', 'valid_until')

class ConsultantSerializer(serializers.ModelSerializer):
    skills = TechSkillSerializer(many=True)
    certificates = EmployeeCertSerializer(many=True)
    projects = EmployeeProjectSerializer(many=True)

    class Meta:
        model = Employees
        fields = ('__all__')
        depth = 2

    def update(self, instance, validated_data):
        '''
            Update and return an existing `Consultant` instance, given the validated data.
            This action should be refactored if time permits. 
        '''

        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get(
            'phone_number', instance.phone_number)
        instance.location_country = validated_data.get(
            'location_country', instance.location_country)
        instance.location_city = validated_data.get(
            'location_city', instance.location_city)
        instance.worktime_allocation = validated_data.get(
            'worktime_allocation', instance.worktime_allocation)
        instance.allocation_until = validated_data.get(
            'allocation_until', instance.allocation_until)
        instance.wants_to_do = validated_data.get(
            'wants_to_do', instance.wants_to_do)
        instance.wants_not_to_do = validated_data.get(
            'wants_not_to_do', instance.wants_not_to_do)
        instance.save()

        if 'skills' in validated_data:
            updated_skill_list = validated_data.pop('skills')
            consultant_skills = list((instance.skills).all())
            for updated_skill in updated_skill_list:
                updated = False
                for skill in consultant_skills:
                    if updated_skill['tech'] == skill.tech:
                        skill.skill_level = (updated_skill.get('skill_level', skill.skill_level))
                        skill.tech_preference = (updated_skill.get('tech_preference', skill.tech_preference))
                        skill.save()
                        updated = True
                if not updated:
                    Employee_tech_skills.objects.create(**updated_skill, employee=instance)

        if 'certificates' in validated_data:
            updated_cert_list = validated_data.pop('certificates')
            consultant_certs = list((instance.certificates).all())

            for updated_cert in updated_cert_list:
                updated = False
                for certificate in consultant_certs:
                    if updated_cert['cert'] == certificate.cert:
                        certificate.valid_until = updated_cert['valid_until']
                        updated = True
                        certificate.save()
                if not updated:
                    Employee_certificates.objects.create(
                        employee=instance, cert=updated_cert['cert'], valid_until=updated_cert['valid_until'])
                    updated = True
                                
        if 'projects' in validated_data:
            updated_project_list = validated_data.pop('projects')
            consultant_projects = list((instance.projects).all())

            for updated_project in updated_project_list:
                updated = False
                for project in consultant_projects:
                    if updated_project['project'] == project.project:
                        project.employee_participation_start_date = (updated_project.get('employee_participation_start_date', project.employee_participation_start_date))
                        project.employee_participation_end_date = (updated_project.get('employee_participation_end_date', project.employee_participation_end_date))
                        project.allocation_busy = (updated_project.get('allocation_busy', project.allocation_busy))
                        project.save()
                        updated = True
                if not updated:
                    Employee_projects.objects.create(**updated_project, employee=instance)
                    updated = True

        return instance


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
