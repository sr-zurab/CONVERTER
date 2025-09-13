# urls.py
from os.path import basename
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from MBDOU_INF.views import OrganizationViewSet, PlanPaymentIndexViewSet, PlanPaymentTRUViewSet, export_fhd_xml, \
    export_fhd_xlsx, ImportPlanFhdXLSXView, RegisterView, MeView, ActsSettingThePriceViewSet, \
    IndicatorsVolumeServiceViewSet, InformingPotentialConsumersOfTheServiceViewSet, IndicatorsQualityServiceViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from MBDOU_INF.views.auth_view import MyTokenObtainPairView
router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet, basename='organizations')
router.register(r'plan-payment-index', PlanPaymentIndexViewSet, basename='planPaymentIndex')
router.register(r'plan-payment-tru', PlanPaymentTRUViewSet, basename='paymentTRU')
router.register(r'acts-setting-price', ActsSettingThePriceViewSet, basename='actsPrice')
router.register(r'indicators-quality-service', IndicatorsQualityServiceViewSet, basename='indicatorsQuality')
router.register(r'indicators-volume-service', IndicatorsVolumeServiceViewSet, basename='indicatorsVolume')
router.register(r'informing-potential-consumers', InformingPotentialConsumersOfTheServiceViewSet, basename='informingConsumers')

urlpatterns = [
    path('', include(router.urls)),
    path('export-fhd-xml/', export_fhd_xml, name='export_fhd_xml'),
    path('export-fhd-xlsx/', export_fhd_xlsx.as_view(), name='export_fhd_xlsx'),
    path('import-fhd-xlsx/', ImportPlanFhdXLSXView.as_view(), name='import_fhd_xlsx'),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', MeView.as_view(), name='auth_me'),
]