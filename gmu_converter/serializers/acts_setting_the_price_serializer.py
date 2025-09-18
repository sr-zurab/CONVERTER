from rest_framework import serializers
from gmu_converter.models import ActsSettingThePrice

class ActsSettingThePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActsSettingThePrice
        fields = '__all__'