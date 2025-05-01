from rest_framework import serializers
from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

    def validate_INN(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("ИНН должен содержать ровно 10 цифр.")
        return value

    def validate_KPP(self, value):
        if not value.isdigit() or len(value) != 9:
            raise serializers.ValidationError("КПП должен содержать ровно 9 цифр.")
        return value

    def validate_UBP(self, value):
        if len(value.strip()) != 8:
            raise serializers.ValidationError("Поле УБП должно содержать ровно 8 символов.")
        return value
