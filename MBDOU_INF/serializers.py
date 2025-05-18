# Сериализаторы для преобразования данных в JSON формат
from rest_framework import serializers
from .models import Organization, PlanPaymentIndex, PlanPaymentTRU
from .fields import NullableDecimalField

# Сериализатор для модели организации
# Преобразует данные организации в JSON и обратно
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

# Сериализатор для модели индекса платежей
# Обрабатывает данные показателей плана ФХД
class PlanPaymentIndexSerializer(serializers.ModelSerializer):
    kbk = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    analyticCode = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    financialYearSum = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    planFirstYearSum = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    planLastYearSum = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    AutPlanYearSumm = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)

    class Meta:
        model = PlanPaymentIndex
        fields = '__all__'

# Сериализатор для модели платежей ТРУ
# Обрабатывает данные о планируемых закупках
class PlanPaymentTRUSerializer(serializers.ModelSerializer):
    kbk = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    analyticCode = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    financialYearSum = NullableDecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    planFirstYearSum = NullableDecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    planLastYearSum = NullableDecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    AutPlanYearSumm = NullableDecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)

    class Meta:
        model = PlanPaymentTRU
        fields = '__all__'
