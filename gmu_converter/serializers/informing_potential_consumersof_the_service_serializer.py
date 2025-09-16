from rest_framework import serializers
from gmu_converter.models import InformingPotentialConsumersOfTheService

class InformingPotentialConsumersOfTheServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformingPotentialConsumersOfTheService
        fields = '__all__'