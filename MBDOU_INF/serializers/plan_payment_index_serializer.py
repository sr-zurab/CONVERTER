from rest_framework import serializers
from MBDOU_INF.models import PlanPaymentIndex


class PlanPaymentIndexSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(allow_blank=True, allow_null=True, required=False, trim_whitespace=False)
    kbk = serializers.CharField(allow_blank=True, allow_null=True, required=False, trim_whitespace=False)
    analyticCode = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    financialYearSum = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    planFirstYearSum = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    planLastYearSum = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)
    AutPlanYearSumm = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True, required=False)

    class Meta:
        model = PlanPaymentIndex
        fields = '__all__'
