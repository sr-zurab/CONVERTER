from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Organization
from gmu_converter.serializers import OrganizationSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Organization.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

