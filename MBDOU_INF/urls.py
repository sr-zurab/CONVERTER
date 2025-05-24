# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from MBDOU_INF.views import OrganizationViewSet, PlanPaymentIndexViewSet, PlanPaymentTRUViewSet, export_fhd_xml

router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet)
router.register(r'plan-payment-index', PlanPaymentIndexViewSet, basename='planpaymentindex')
router.register(r'plan-payment-tru', PlanPaymentTRUViewSet, basename='planpaymenttru')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/export-fhd-xml/', export_fhd_xml, name='export_fhd_xml'),
]