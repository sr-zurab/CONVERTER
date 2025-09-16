from rest_framework import serializers
from gmu_converter.models import IndicatorsVolumeService

class IndicatorsVolumeServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicatorsVolumeService
        fields = '__all__'