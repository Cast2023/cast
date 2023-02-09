from django.urls import path, include

from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'consultant', views.ConsultantAPIView, basename='consultant')

urlpatterns = [
    path('', include(router.urls)),
]


consultant_list = views.ConsultantAPIView.as_view({
    'get': 'list',
    'post': 'create'
})
consultant_detail = views.ConsultantAPIView.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('api/consultant/', consultant_list, name='consultant-list'),
    path('api/consultant/<int:pk>/', consultant_detail, name='consultant-detail'),
])

