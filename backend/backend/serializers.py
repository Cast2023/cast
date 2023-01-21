from rest_framework import serializers
from .models import Skeleton

class SkeletonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skeleton
        fields = ['content']