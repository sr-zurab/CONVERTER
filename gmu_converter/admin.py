from django.contrib import admin
from gmu_converter.models import (PlanPaymentIndex,Organization,PlanPaymentTRU,CustomUser, ActsSettingThePrice, IndicatorsQualityService,
                              IndicatorsVolumeService, InformingPotentialConsumersOfTheService, RegulatingAct)

admin.site.register(PlanPaymentIndex)
admin.site.register(Organization)
admin.site.register(PlanPaymentTRU)
admin.site.register(CustomUser)
admin.site.register(ActsSettingThePrice)
admin.site.register(IndicatorsQualityService)
admin.site.register(IndicatorsVolumeService)
admin.site.register(InformingPotentialConsumersOfTheService)
admin.site.register(RegulatingAct)