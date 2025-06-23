# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from MBDOU_INF.views import OrganizationViewSet, PlanPaymentIndexViewSet, PlanPaymentTRUViewSet, export_fhd_xml, export_fhd_xlsx, ImportPlanFhdXLSXView
router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet, basename='organizations')
router.register(r'plan-payment-index', PlanPaymentIndexViewSet, basename='planPaymentIndex')
router.register(r'plan-payment-tru', PlanPaymentTRUViewSet, basename='paymentTRU')

urlpatterns = [
    path('', include(router.urls)),
    path('export-fhd-xml/', export_fhd_xml, name='export_fhd_xml'),
    path('export-fhd-xlsx/', export_fhd_xlsx.as_view(), name='export_fhd_xlsx'),
    path('import-fhd-xlsx/', ImportPlanFhdXLSXView.as_view(), name='import_fhd_xlsx'),
]