import datetime

from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from django_filters import rest_framework as rest_filters
from django.db import connection

from restapi.models import Employees, Techs, Certificate, Project, Token
from .serializers import TechSerializer, CertSerializer, ConsultantSerializer, ProjectSerializer, IntegrationTokenSerializer


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
    def get_or_create(self, request, *args):
        instance, created = Techs.objects.get_or_create(tech_name=request.data['tech_name'])
        result = {"id": instance.id, "tech_name": instance.tech_name}
        return Response({"status": "success", "result": result}, status.HTTP_201_CREATED)

    def initialize_request(self, request, *args, **kwargs):
        setattr(request, 'csrf_processing_done', True) 
        return super().initialize_request(request, *args, **kwargs)


class CertAPIView(viewsets.ModelViewSet):
    serializer_class = CertSerializer
    queryset = Certificate.objects.all()
    def initialize_request(self, request, *args, **kwargs):
        setattr(request, 'csrf_processing_done', True) 
        return super().initialize_request(request, *args, **kwargs)

class IntegrationTokenView(viewsets.ModelViewSet):
    queryset = Token.objects.all().filter(is_integration_token=True)
    serializer_class = IntegrationTokenSerializer
    def initialize_request(self, request, *args, **kwargs):
        setattr(request, 'csrf_processing_done', True) 
        return super().initialize_request(request, *args, **kwargs)


class ProjectAPIView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    def initialize_request(self, request, *args, **kwargs):
        setattr(request, 'csrf_processing_done', True) 
        return super().initialize_request(request, *args, **kwargs)

class EmployeeFilter(rest_filters.FilterSet):
    first_name = rest_filters.CharFilter(
        field_name='first_name', lookup_expr='icontains')
    last_name = rest_filters.CharFilter(
        field_name='last_name', lookup_expr='icontains')
    tech = rest_filters.CharFilter(method='filter_by_tech_name', label='Tech name contains (comma separated)')
    tech_and_pref = rest_filters.CharFilter(label='Tech and prefecence (<tech name>,<YYYY-MM-DD>)', method='filter_by_tech_and_pref')
    tech_and_level = rest_filters.CharFilter(label='Tech and level (<tech name>,<YYYY-MM-DD>)' ,method='filter_by_tech_and_level')
    project = rest_filters.CharFilter(label='Project (string search)', method='filter_by_project')
    cert_vendor = rest_filters.CharFilter(label='Certificate vendor (string search)', method='filter_by_vendor')
    certificate = rest_filters.CharFilter(label='Certificate name', method='filter_by_certificate')
    cert_valid_until__gte = rest_filters.DateFilter(
        field_name='certificates__valid_until', lookup_expr='gte')
    cert_valid_until__lte = rest_filters.DateFilter(field_name='certificates__valid_until', lookup_expr='lte')
    available_allocation = rest_filters.CharFilter(method='filter_by_available_allocation', label='Available allocation (<allocation>,<YYYY-MM-DD>)')

    field = (
        ('first_name', 'first_name'),
        ('last_name', 'last_name'),
        ('tech_name', 'tech'),
    )
    

    class Meta:
        fields = (
            'first_name', 
            'last_name', 
            'tech', 
            'project', 
            'cert_vendor', 
            'certificate', 
            'cert_valid_until__gte', 
            'cert_valid_until__lte', 
            'tech_and_pref',
            'tech_and_level',
            'available_allocation'
            )
        model = Employees
    
    def filter_by_available_allocation(self, queryset, available_allocation, value):
        if ',' in value:
            available_allocation, selected_date = value.split(",")
        else:
            available_allocation = value
            selected_date = datetime.date.today().strftime('%Y-%m-%d') 
        with connection.cursor() as cursor:
            cursor.execute(
                '''
                    SELECT id, (worktime_allocation - COALESCE(reserved_allocation, 0)) as available_allocation
                    FROM restapi_employees FULL OUTER JOIN 
                        (SELECT employee_id, SUM(allocation_busy) as reserved_allocation  
                        FROM restapi_employee_projects 
                        WHERE %s BETWEEN employee_participation_start_date AND employee_participation_end_date 
                        GROUP BY employee_id) AS allocation_table
                    ON restapi_employees.id = allocation_table.employee_id
                    WHERE (worktime_allocation - COALESCE(reserved_allocation, 0)) >= %s;

                ''', [selected_date, available_allocation]
            )
            employee_ids = cursor.fetchall()
            formatted_ids = []
            for item in employee_ids:
                formatted_ids.append(item[0])
        return queryset.filter(id__in=formatted_ids)
    
    def filter_by_tech_name(self, queryset, tech, value):
        if ',' in value:
            tech_list = value.split(",")
            for tech in tech_list:
                queryset = queryset.filter(skills__tech__tech_name__icontains=tech).distinct()
            return queryset
        return queryset.filter(skills__tech__tech_name__icontains=value).distinct()
    
    def filter_by_project(self, queryset, project, value):
        return queryset.filter(projects__project__project_name__icontains=value).distinct()
    
    def filter_by_vendor(self, queryset, vendor, value):
        return queryset.filter(certificates__cert__vendor__icontains=value).distinct()
    
    def filter_by_certificate(self, queryset, certificate, value):
        return queryset.filter(certificates__cert__certificate_name__icontains=value).distinct()

    def filter_by_tech_and_pref(self, queryset, tech_and_pref, value):
        if ',' in value:
            tech, pref = value.split(",")
        else:
            tech = value
            pref = None
        if not pref:
            pref = 'true'
        pref = bool(pref.lower() == "true")
        return queryset.filter(skills__tech__tech_name__icontains=tech, skills__tech_preference=pref).distinct()

    def filter_by_tech_and_level(self, queryset, tech_and_level, value):
        if ',' in value:
            tech, level = value.split(",")
        else:
            tech = value
            level = "1"
        if not level.isdigit():
            level = "1"
        level = max(0, min(int(level), 3))
        return queryset.filter(skills__tech__tech_name__icontains=tech, skills__skill_level__gte=level).distinct()


class ConsultantAPIView(viewsets.ModelViewSet):
    queryset = Employees.objects.all()
    serializer_class = ConsultantSerializer
    filter_backends = [rest_filters.DjangoFilterBackend, filters.SearchFilter]
    filterset_class = EmployeeFilter

    def initialize_request(self, request, *args, **kwargs):
        setattr(request, 'csrf_processing_done', True) 
        return super().initialize_request(request, *args, **kwargs)

    
