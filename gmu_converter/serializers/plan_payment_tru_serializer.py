from rest_framework import serializers
from gmu_converter.models import PlanPaymentTRU
from gmu_converter.fields import NullableDecimalField


class PlanPaymentTRUSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(allow_blank=True, allow_null=True, required=False, trim_whitespace=False)
    kbk = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    analyticCode = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    financialYearSum = NullableDecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    planFirstYearSum = NullableDecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    planLastYearSum = NullableDecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    AutPlanYearSumm = NullableDecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)

    class Meta:
        model = PlanPaymentTRU
        fields = '__all__'
