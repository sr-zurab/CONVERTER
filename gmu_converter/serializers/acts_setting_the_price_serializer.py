from rest_framework import serializers
from gmu_converter.models import actsSettingThePrice

class ActsSettingThePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = actsSettingThePrice
        fields = '__all__'