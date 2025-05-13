from rest_framework import viewsets
from .models import Organization, PlanPaymentIndex, PlanPaymentTRU
from .serializers import (
    OrganizationSerializer,
    PlanPaymentIndexSerializer,
    PlanPaymentTRUSerializer
)

# Представление для Организации
class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all().order_by('name')
    serializer_class = OrganizationSerializer

# Представление для 1-го листа ФХД
class PlanPaymentIndexViewSet(viewsets.ModelViewSet):
    queryset = PlanPaymentIndex.objects.all()
    serializer_class = PlanPaymentIndexSerializer

    # Связка с Организацией и годом
    def get_queryset(self):
        org_id = self.request.query_params.get('organization_id')
        year = self.request.query_params.get('year')
        queryset = PlanPaymentIndex.objects.all()
        if org_id:
            queryset = queryset.filter(organization_id=org_id)
        if year:
            queryset = queryset.filter(year=year)
        return queryset

# Представление для 2-го листа ФХД
class PlanPaymentTRUViewSet(viewsets.ModelViewSet):
    queryset = PlanPaymentTRU.objects.all()
    serializer_class = PlanPaymentTRUSerializer

    # Связка с Организацией и годом
    def get_queryset(self):
        org_id = self.request.query_params.get('organization_id')
        year = self.request.query_params.get('year')
        queryset = PlanPaymentTRU.objects.all()
        if org_id:
            queryset = queryset.filter(organization_id=org_id)
        if year:
            queryset = queryset.filter(year=year)
        return queryset
