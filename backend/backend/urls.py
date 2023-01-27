from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'backend', views.SkeletonAPIView, 'skeleton')
router.register(r'techname', views.TechAPIView, 'tech')


urlpatterns = [
    path('backend/', views.index),
    path('backend/skeleton',views.skeleton),
    path('backend/skeleton-post',views.skeleton_post),
    path('api/', include(router.urls)),
]
