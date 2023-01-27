from rest_framework import serializers
from .models import Skeleton
from .models import Techs


class SkeletonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skeleton
        fields = ['content']


class TechSerializer(serializers.ModelSerializer):
    class Meta:
        model = Techs
        fields = ['tech_name']