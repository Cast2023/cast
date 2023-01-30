from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'consult', views.ConsultAPIView, 'consult')


urlpatterns = [
    path('backend/', views.index),
    path('api/', include(router.urls)),
]
