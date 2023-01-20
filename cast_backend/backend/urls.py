from django.urls import path
from . import views
urlpatterns = [
    path('backend/', views.index),
    path('backend/skeleton',views.skeleton),
    path('backend/skeleton-post',views.skeleton_post)
]
