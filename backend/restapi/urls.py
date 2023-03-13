from django.urls import path, include

from .views import ConsultantAPIView, TechAPIView
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

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
    'post': 'create'
})
tech_detail = TechAPIView.as_view({
    'get': 'retrieve',
    'post': 'create'
})
urlpatterns = format_suffix_patterns([
    path('consultant/', consultant_list, name='consultant-list'),
    path('consultant/<int:pk>/', consultant_detail, name='consultant-detail'),
    path('tech/', tech_list, name='tech-list'),
    path('tech/<int:pk>', tech_detail, name='tech-detail'),

])

