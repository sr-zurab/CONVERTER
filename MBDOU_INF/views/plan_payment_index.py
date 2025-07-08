import json, os
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import PlanPaymentIndex, Organization
from MBDOU_INF.serializers import PlanPaymentIndexSerializer

class PlanPaymentIndexViewSet(viewsets.ModelViewSet):
    queryset = PlanPaymentIndex.objects.all()
    serializer_class = PlanPaymentIndexSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        org_id = self.request.query_params.get('organization')
        year = self.request.query_params.get('year')

        if not org_id or not year:
            return PlanPaymentIndex.objects.none()

        # Проверка, что организация принадлежит пользователю
        try:
            Organization.objects.get(id=org_id, user=self.request.user)
        except Organization.DoesNotExist:
            return PlanPaymentIndex.objects.none()

        queryset = PlanPaymentIndex.objects.filter(organization_id=org_id, year=year)
        if not queryset.exists():
            self._init_defaults_for(org_id, year)
            queryset = PlanPaymentIndex.objects.filter(organization_id=org_id, year=year)

        return queryset.order_by("lineCode")

    def get_object(self):
        return get_object_or_404(PlanPaymentIndex, pk=self.kwargs['pk'])

    def _init_defaults_for(self, org_id, year):
        filepath = os.path.join(settings.BASE_DIR, "data", "default_payment_index.json")
        try:
            with open(filepath, encoding="utf-8") as f:
                defaults = json.load(f)
        except Exception as e:
            print(f"[ERROR] Не удалось загрузить default_payment_index.json: {e}")
            return

        for row in defaults:
            PlanPaymentIndex.objects.create(
                organization_id=org_id,
                year=year,
                name=row.get("name", ""),
                lineCode=row.get("lineCode", ""),
                kbk=row.get("kbk", ""),
                analyticCode=row.get("analyticCode", ""),
                manually=row.get("manually", False),
                afterLineCode=row.get("afterLineCode", ""),
                financialYearSum=row.get("financialYearSum") or None,
                planFirstYearSum=row.get("planFirstYearSum") or None,
                planLastYearSum=row.get("planLastYearSum") or None,
                AutPlanYearSumm=row.get("AutPlanYearSumm") or None,
            )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return super().update(request, *args, **kwargs)