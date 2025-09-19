from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import Organization, ActsSettingThePrice
from gmu_converter.serializers import ActsSettingThePriceSerializer

class ActsSettingThePriceViewSet(viewsets.ModelViewSet):
    queryset = ActsSettingThePrice.objects.all()
    serializer_class = ActsSettingThePriceSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        org_id = self.request.query_params.get('organization')
        year = self.request.query_params.get('year')
        section = self.request.query_params.get('section')
        if not org_id or not year or not section:
            return ActsSettingThePrice.objects.none()
        if not Organization.objects.filter(id=org_id).exists():
            return ActsSettingThePrice.objects.none()

        queryset = ActsSettingThePrice.objects.filter(
            organization_id=org_id,
            year=year,
            section=section)
        return queryset.order_by('section')

    def get_object(self):
        return get_object_or_404(ActsSettingThePrice, pk=self.kwargs['pk'])

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return super().update(request, *args, **kwargs)