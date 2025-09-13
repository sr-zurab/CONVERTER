from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import Organization, IndicatorsQualityService
from MBDOU_INF.serializers import IndicatorsQualityServiceSerializer

class IndicatorsQualityServiceViewSet(viewsets.ModelViewSet):
    queryset = IndicatorsQualityService.objects.all()
    serializer_class = IndicatorsQualityServiceSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        org_id = self.request.query_params.get('organization')
        year = self.request.query_params.get('year')
        section = self.request.query_params.get('section')
        if not org_id or not year or not section:
            return IndicatorsQualityService.objects.none()
        if not Organization.objects.filter(id=org_id).exists():
            return IndicatorsQualityService.objects.none()

        queryset = IndicatorsQualityService.objects.filter(
            organization_id=org_id,
            year=year,
            section=section)
        # if not queryset.exists():
        #     raw_data = dict(self.request.query_params)
        #     data = {k: v[0] if isinstance(v,list) else v for k, v in raw_data.items()}
        #     data.pop('organization', None)
        #     data.pop('year', None)
        #     data.pop('section', None)
        #     IndicatorsQualityService.objects.create(
        #         organization_id=org_id,
        #         year=year,
        #         section=section,
        #         **data)
        #     queryset = IndicatorsQualityService.objects.filter(
        #         organization_id=org_id,
        #         year=year,
        #         section=section)
        return queryset.order_by('section')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_object(self):
        return get_object_or_404(IndicatorsQualityService, pk=self.kwargs['pk'])

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return super().update(request, *args, **kwargs)