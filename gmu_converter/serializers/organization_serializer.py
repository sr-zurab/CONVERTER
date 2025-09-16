# gmu_converter/serializers/organization_serializer.py
# Сериализатор для модели Organization
from rest_framework import serializers
from gmu_converter.models import Organization


class OrganizationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())  # Пользователь подставляется автоматически

    class Meta:
        model = Organization
        fields = '__all__'  # Все поля модели

    # Валидация ИНН (должен быть из 10 цифр)
    def validate_INN(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("ИНН должен содержать ровно 10 цифр.")
        return value

    # Валидация КПП (должен быть из 9 цифр)
    def validate_KPP(self, value):
        if not value.isdigit() or len(value) != 9:
            raise serializers.ValidationError("КПП должен содержать ровно 9 цифр.")
        return value

    # Валидация УБП (должно быть 8 символов)
    def validate_UBP(self, value):
        if len(value.strip()) != 8:
            raise serializers.ValidationError("Поле УБП должно содержать ровно 8 символов.")
        return value
