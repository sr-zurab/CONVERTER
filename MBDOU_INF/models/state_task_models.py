from django.db import models
from django.db.models import PositiveIntegerField

from .organization_models import Organization

class IndicatorsQualityService(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="indicators_quality_service",
        verbose_name="Организация"
    )
    year = models.PositiveIntegerField(verbose_name="Год формирования отчета")
    uniqueNumber = models.CharField("Уникальный номер реестровой записи", max_length=255, blank=True, null=True, default="")
    contendIndicator1 = models.CharField("Показатель, характеризующий содержание муниципальной услуги 1", max_length=255, blank=True,
                                         null=True, default="")
    contendIndicator2 = models.CharField("Показатель, характеризующий содержание муниципальной услуги 2",max_length=255, blank=True,
                                         null=True, default="")
    contendIndicator3 = models.CharField("Показатель, характеризующий содержание муниципальной услуги 3",max_length=255, blank=True,
                                         null=True, default="")
    conditionIndicator1 = models.CharField("Показатель, характеризующий условия (формы) оказания муниципальной услуги 1",max_length=255, blank=True,
                                           null=True, default="")
    conditionIndicator2 = models.CharField("Показатель, характеризующий условия (формы) оказания муниципальной услуги 2",max_length=255, blank=True,
                                           null=True, default="")
    qualityIndicator =  models.CharField("Показатель качества муниципальной услуги: наименование показателя",max_length=255, blank=True,
                                           null=True, default="")
    unionOfMeasurement = models.CharField("Показатель качества муниципальной услуги: единица измерения: наименование",max_length=255, blank=True,
                                           null=True, default="")
    OKEI = models.PositiveIntegerField(verbose_name="Показатель качества муниципальной услуги: единица измерения: код по ОКЕИ")
    valuesQualityIndicatorNextYear= models.PositiveIntegerField(verbose_name="Значение показателя качества муниципальной услуги: (очередной финансовый год)")
    valuesQualityIndicatorFirstYear = models.PositiveIntegerField(verbose_name="Значение показателя качества муниципальной услуги: (1-й год планового периода)")
    valuesQualityIndicatorSecondYear = models.PositiveIntegerField(verbose_name="Значение показателя качества муниципальной услуги: (2-й год планового периода)")
    percentageDeviations = models.PositiveIntegerField(verbose_name="Допустимые (возможные) отклонения от установленных показателей качества муниципальной услуги: в процентах")
    absoluteValuesDeviations = models.PositiveIntegerField(verbose_name="Допустимые (возможные) отклонения от установленных показателей качества муниципальной услуги: в абсолютных величинах")
    section = PositiveIntegerField(verbose_name="Номер раздела")
    serviceName = models.CharField("Наименование муниципальной услуги",max_length=255, blank=True,
                                           null=True, default="")
    consumerCategory = models.CharField("Категории потребителей муниципальной услуги",max_length=255, blank=True,
                                           null=True, default="")
    codeBasicList = models.CharField("Код по общероссийскому базовому перечню или федеральному перечню",max_length=255, blank=True,
                                           null=True, default="")
    regulatingAct= models.CharField("Нормативные правовые акты, регулирующие порядок оказания государственной услуги",max_length=255, blank=True,
                                           null=True, default="")
    class Meta:
        verbose_name = "Показатель характеризующий качество услуги"
        verbose_name_plural = "Показатели, характеризующие качество муниципальной услуги"
    def __str__(self):
        return f"{self.organization}-{self.year}-{self.section}-{self.serviceName}-{self.codeBasicList}"

class IndicatorsVolumeService(models.Model):
        organization = models.ForeignKey(
            Organization,
            on_delete=models.CASCADE,
            related_name="indicators_volume_service",
            verbose_name="Организация"
        )
        year = models.PositiveIntegerField(verbose_name="Год формирования отчета")
        uniqueNumber = models.CharField("Уникальный номер реестровой записи", max_length=255, blank=True, null=True,
                                        default="")
        contendIndicator1 = models.CharField("Показатель, характеризующий содержание муниципальной услуги 1",
                                             max_length=255, blank=True, null=True, default="")
        contendIndicator2 = models.CharField("Показатель, характеризующий содержание муниципальной услуги 2",
                                             max_length=255, blank=True, null=True, default="")
        contendIndicator3 = models.CharField("Показатель, характеризующий содержание муниципальной услуги 3",
                                             max_length=255, blank=True, null=True, default="")
        conditionIndicator1 = models.CharField(
            "Показатель, характеризующий условия (формы) оказания муниципальной услуги 1", max_length=255, blank=True,
            null=True, default="")
        conditionIndicator2 = models.CharField(
            "Показатель, характеризующий условия (формы) оказания муниципальной услуги 2", max_length=255, blank=True,
            null=True, default="")
        volumeIndicator = models.CharField("Показатель объема муниципальной услуги: наименование показателя",
                                           max_length=255, blank=True, null=True, default="")
        unitOfMeasurement = models.CharField("Показатель объема муниципальной услуги: единица измерения: наименование", max_length=255, blank=True,
                                             null=True, default="")
        OKEI= models.PositiveIntegerField(verbose_name="Показатель объема муниципальной услуги:	единица измерения: единица измерения по ОКЕИ")
        valuesVolumeIndicatorNextYear = models.PositiveIntegerField(verbose_name="Значение показателя объема государственной услуги: (очередной финансовый год)")
        valuesVolumeIndicatorFirstYear = models.PositiveIntegerField(verbose_name="Значение показателя объема государственной услуги: (1-й год планового периода)")
        valuesVolumeIndicatorSecondYear = models.PositiveIntegerField(verbose_name="Значение показателя объема государственной услуги: (2-й год планового периода)")
        amountFeeNextYear = models.PositiveIntegerField(verbose_name="Размер платы (цена, тариф): (очередной финансовый год)")
        amountFeeFirstYear = models.PositiveIntegerField(verbose_name="Размер платы (цена, тариф): (1-й год планового периода)")
        amountFeeSecondYear = models.PositiveIntegerField(verbose_name="Размер платы (цена, тариф): (2-й год планового периода)")
        percentageDeviations = models.PositiveIntegerField(
            verbose_name="Допустимые (возможные) отклонения от установленных показателей объема муниципальной услуги: в процентах")
        absoluteValuesDeviations = models.PositiveIntegerField(
            verbose_name="Допустимые (возможные) отклонения от установленных показателей объема муниципальной услуги: в абсолютных величинах")
        section = PositiveIntegerField(verbose_name="Номер раздела")
        serviceName = models.CharField("Наименование муниципальной услуги", max_length=255, blank=True,
                                       null=True, default="")
        consumerCategory = models.CharField("Категории потребителей муниципальной услуги", max_length=255, blank=True,
                                            null=True, default="")
        codeBasicList = models.CharField("Код по общероссийскому базовому перечню или федеральному перечню",
                                         max_length=255, blank=True,
                                         null=True, default="")
        regulatingAct = models.CharField(
            "Нормативные правовые акты, регулирующие порядок оказания государственной услуги", max_length=255,
            blank=True,
            null=True, default="")

        class Meta:
            verbose_name = "Показатель характеризующий объём услуги"
            verbose_name_plural = "Показатели, характеризующие объём муниципальной услуги"

        def __str__(self):
            return f"{self.organization}-{self.year}-{self.section}-{self.serviceName}-{self.codeBasicList}"
class actsSettingThePrice(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="acts_setting_price",
        verbose_name="Организация"
    )
    year = models.PositiveIntegerField(verbose_name="Год формирования отчета")
    typeAct = models.CharField("Нормативный правовой акт: вид", max_length=255, blank=True, null=True, default="")
    receivingBody = models.CharField("Нормативный правовой акт: принявший орган", max_length=255, blank=True, null=True, default="")
    dateAct = models.DateField(verbose_name="Нормативный правовой акт: дата", max_length=255, blank=True, null=True, default="")
    numberAct = models.PositiveIntegerField(verbose_name="Нормативный правовой акт: номер", max_length=255, blank=True, null=True, default="")
    nameAct = models.CharField("Нормативный правовой акт: наименование", max_length=255, blank=True, null=True, default="")
    section = PositiveIntegerField(verbose_name="Номер раздела")
    serviceName = models.CharField("Наименование муниципальной услуги", max_length=255, blank=True,
                                   null=True, default="")
    consumerCategory = models.CharField("Категории потребителей муниципальной услуги", max_length=255, blank=True,
                                        null=True, default="")
    codeBasicList = models.CharField("Код по общероссийскому базовому перечню или федеральному перечню",
                                     max_length=255, blank=True, null=True, default="")
    regulatingAct = models.CharField(
        "Нормативные правовые акты, регулирующие порядок оказания государственной услуги", max_length=255,
        blank=True, null=True, default="")


    class Meta:
        verbose_name = "Нормативные правовые акты, устанавливающие размер платы"
        verbose_name_plural = "Нормативные правовые акты, устанавливающие размер платы (цену, тариф) либо порядок ее установления"

    def __str__(self):
        return f"{self.organization}-{self.year}-{self.section}-{self.serviceName}-{self.codeBasicList}"

class InformingPotentialConsumersOfTheService:
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="acts_setting_price",
        verbose_name="Организация"
    )
    year = models.PositiveIntegerField(verbose_name="Год формирования отчета")
    informationMethod = models.CharField("Способ информирования", max_length=255, blank=True, null=True, default="")
    compositionInformation = models.CharField("Состав размещаемой информации", max_length=255, blank=True, null=True, default="")
    refreshRate = models.CharField("Частота обновления информации", max_length=255, blank=True, null=True, default="")
    section = PositiveIntegerField(verbose_name="Номер раздела")
    serviceName = models.CharField("Наименование муниципальной услуги", max_length=255, blank=True,
                                   null=True, default="")
    consumerCategory = models.CharField("Категории потребителей муниципальной услуги", max_length=255, blank=True,
                                        null=True, default="")
    codeBasicList = models.CharField("Код по общероссийскому базовому перечню или федеральному перечню",
                                     max_length=255, blank=True, null=True, default="")
    regulatingAct = models.CharField(
        "Нормативные правовые акты, регулирующие порядок оказания государственной услуги", max_length=255,
        blank=True, null=True, default="")

    class Meta:
        verbose_name = "Порядок информирования"
        verbose_name_plural = "Порядок информирования потенциальных потребителей государственной услуги"

    def __str__(self):
        return f"{self.organization}-{self.year}-{self.section}-{self.serviceName}-{self.codeBasicList}"