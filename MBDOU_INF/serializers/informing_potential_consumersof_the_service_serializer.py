from rest_framework import serializers
from MBDOU_INF.models import InformingPotentialConsumersOfTheService

class InformingPotentialConsumersOfTheServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformingPotentialConsumersOfTheService
        fields = '__all__'