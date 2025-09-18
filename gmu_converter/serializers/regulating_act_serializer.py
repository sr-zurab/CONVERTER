from rest_framework import serializers
from gmu_converter.models import RegulatingAct

class RegulatingActSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegulatingAct
        fields = '__all__'