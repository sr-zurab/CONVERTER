# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from MBDOU_INF.views import OrganizationViewSet, PlanPaymentIndexViewSet, PlanPaymentTRUViewSet

router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet)
router.register(r'plan-payment-index', PlanPaymentIndexViewSet, basename='planpaymentindex')
router.register(r'plan-payment-tru', PlanPaymentTRUViewSet, basename='planpaymenttru')

urlpatterns = [
    path('api/', include(router.urls)),
]