from rest_framework import serializers
from MBDOU_INF.models import actsSettingThePrice

class ActsSettingThePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = actsSettingThePrice
        fields = '__all__'