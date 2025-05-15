from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Organization, PlanPaymentIndex, PlanPaymentTRU
from .serializers import (
    OrganizationSerializer,
    PlanPaymentIndexSerializer,
    PlanPaymentTRUSerializer
)


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all().order_by('name')
    serializer_class = OrganizationSerializer


class PlanPaymentIndexViewSet(viewsets.ModelViewSet):
    queryset = PlanPaymentIndex.objects.all()
    serializer_class = PlanPaymentIndexSerializer

    def get_queryset(self):
        org_id = self.request.query_params.get('organization')
        year = self.request.query_params.get('year')
        queryset = PlanPaymentIndex.objects.all()
        if org_id:
            queryset = queryset.filter(organization_id=org_id)
        if year:
            queryset = queryset.filter(year=year)
        return queryset

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return super().update(request, *args, **kwargs)


class PlanPaymentTRUViewSet(viewsets.ModelViewSet):
    queryset = PlanPaymentTRU.objects.all()
    serializer_class = PlanPaymentTRUSerializer

    def get_queryset(self):
        org_id = self.request.query_params.get('organization')
        year = self.request.query_params.get('year')
        queryset = PlanPaymentTRU.objects.all()
        if org_id:
            queryset = queryset.filter(organization_id=org_id)
        if year:
            queryset = queryset.filter(year=year)
        return queryset

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
