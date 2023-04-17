from django.urls import path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from django.views.decorators.csrf import csrf_exempt

from .views import ConsultantAPIView, TechAPIView, ImportCertificatesView, CertAPIView, ProjectAPIView, IntegrationTokenView
from core.decorators import token_required


router = routers.DefaultRouter()
router.register(r'consultant', ConsultantAPIView, basename='consultant')

consultant_list = ConsultantAPIView.as_view({
    'get': 'list',
    'post': 'create'
})
consultant_detail = ConsultantAPIView.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

tech_list = TechAPIView.as_view({
    'get': 'list',
    'post': 'get_or_create'
})

tech_detail = TechAPIView.as_view({
    'get': 'retrieve',
    'post': 'create'
})

cert_list = CertAPIView.as_view({
    'get': 'list',
    'post': 'create'
})

project_list = ProjectAPIView.as_view({
    'get': 'list',
    'post': 'create'
})

integration_token_list = IntegrationTokenView.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = format_suffix_patterns([
    path('consultant/', csrf_exempt(token_required(consultant_list)), name='consultant-list'),
    path('consultant/<int:pk>/', csrf_exempt(token_required(consultant_detail)), name='consultant-detail'),
    path('tech/', csrf_exempt(token_required(tech_list)), name='tech-list'),
    path('tech/<int:pk>', csrf_exempt(token_required(tech_detail)), name='tech-detail'),
    path('certificates/', csrf_exempt(token_required(cert_list)), name='cert-list'),
    path('import-certificates/', csrf_exempt(token_required(ImportCertificatesView.as_view())), name='upload-file'),
    path('projects/', csrf_exempt(token_required(project_list)), name='project-list'),
    path('integration-tokens/', csrf_exempt(token_required(integration_token_list)), name='integration-token-list'),
])
