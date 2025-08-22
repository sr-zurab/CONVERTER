from rest_framework import serializers
from MBDOU_INF.models import IndicatorsQualityService
class IndicatorsQualityServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicatorsQualityService
        fields = '__all__'