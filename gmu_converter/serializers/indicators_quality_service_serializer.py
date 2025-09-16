from rest_framework import serializers
from gmu_converter.models import IndicatorsQualityService
class IndicatorsQualityServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicatorsQualityService
        fields = '__all__'