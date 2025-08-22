from rest_framework import serializers
from MBDOU_INF.models import IndicatorsVolumeService

class IndicatorsVolumeServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicatorsVolumeService
        fields = '__all__'