import json, os
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import PlanPaymentTRU, Organization
from MBDOU_INF.serializers import PlanPaymentTRUSerializer

class PlanPaymentTRUViewSet(viewsets.ModelViewSet):
    queryset = PlanPaymentTRU.objects.all()
    serializer_class = PlanPaymentTRUSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        org_id = self.request.query_params.get('organization')
        year = self.request.query_params.get('year')

        if not org_id or not year:
            return PlanPaymentTRU.objects.none()

        try:
            Organization.objects.get(id=org_id, user=self.request.user)
        except Organization.DoesNotExist:
            return PlanPaymentTRU.objects.none()

        queryset = PlanPaymentTRU.objects.filter(organization_id=org_id, year=year)
        if not queryset.exists():
            self._init_defaults_for(org_id, year)
            queryset = PlanPaymentTRU.objects.filter(organization_id=org_id, year=year)

        return queryset.order_by("lineCode")

    def get_object(self):
        return get_object_or_404(PlanPaymentTRU, pk=self.kwargs['pk'])

    def _init_defaults_for(self, org_id, year):
        def _clean_bool(value):
            if isinstance(value, bool):
                return value
            if isinstance(value, str):
                return value.lower() in ["true", "1"]
            return False
        filepath = os.path.join(settings.BASE_DIR, "data", "default_payment_tru.json")
        try:
            with open(filepath, encoding="utf-8") as f:
                defaults = json.load(f)
        except Exception as e:
            print(f"[ERROR] Не удалось загрузить default_payment_tru.json: {e}")
            return

        for row in defaults:
            PlanPaymentTRU.objects.create(
                organization_id=org_id,
                year=year,
                name=row.get("name", ""),
                lineCode=row.get("lineCode", ""),
                kbk=row.get("kbk", ""),
                lineNum=row.get("lineNum", ""),
                yearStart=row.get("yearStart", ""),
                uniqueCode=row.get("uniqueCode", ""),
                manually=_clean_bool(row.get("manually", False)),
                afterLineCode=row.get("afterLineCode", ""),
                financialYearSum=row.get("financialYearSum") or None,
                planFirstYearSum=row.get("planFirstYearSum") or None,
                planLastYearSum=row.get("planLastYearSum") or None,
                AutPlanYearSumm=row.get("AutPlanYearSumm") or None,
            )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return super().update(request, *args, **kwargs)