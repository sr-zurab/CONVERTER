from django.db import models
from django.utils.translation import trim_whitespace

from .organization_models import Organization


# Модель индекса платежей плана ФХД
# Хранит данные о платежах и их классификации
class PlanPaymentIndex(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="plan_payment_index",
        verbose_name="Организация"
    )
    year = models.PositiveIntegerField(verbose_name="Год формирования отчета")
    name = models.CharField("Наименование показателя", max_length=255, blank=True, null=True, default="")
    lineCode = models.CharField("Код строки", max_length=50, blank=True, null=True, default="")
    kbk = models.CharField("Код по бюджетной классификации", max_length=100, blank=True, null=True, default="")
    analyticCode = models.CharField("Аналитический код", max_length=5, blank=True, null=True)
    manually = models.BooleanField("Признак добавленной строки", default=False)
    afterLineCode = models.CharField("Код строки, после которой добавлена", max_length=50, blank=True, null=True)

    financialYearSum = models.DecimalField("Сумма на текущий финансовый год", max_digits=20, decimal_places=2,
                                           blank=True, null=True)
    planFirstYearSum = models.DecimalField("Сумма на первый год планового периода", max_digits=20, decimal_places=2,
                                           blank=True, null=True)
    planLastYearSum = models.DecimalField("Сумма на второй год планового периода", max_digits=20, decimal_places=2,
                                          blank=True, null=True)
    AutPlanYearSumm = models.DecimalField("Сумма за пределами планового периода", max_digits=20, decimal_places=2,
                                          blank=True, null=True)

    class Meta:
        ordering = ['lineCode']
        verbose_name = "Показатель плана платежей"
        verbose_name_plural = "Показатели плана платежей"

    def __str__(self):
        return f"{self.lineCode} - {self.name}" if self.lineCode and self.name else "Показатель без данных"


# Модель платежей ТРУ (товары, работы, услуги)
# Хранит информацию о планируемых закупках
class PlanPaymentTRU(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="plan_payment_tru"
    )
    year = models.PositiveIntegerField(verbose_name="Год формирования отчета")
    lineNum = models.CharField(max_length=20, verbose_name="Номер строки", blank=True, null=True)
    kbk = models.CharField(max_length=100, verbose_name="Код бюджетной классификации", blank=True, null=True,
                           default="")
    name = models.TextField(verbose_name="Наименование показателя", blank=True, null=True)
    lineCode = models.CharField(max_length=50, verbose_name="Код строки", blank=True, null=True, default="")
    yearStart = models.CharField(max_length=10, verbose_name="Год начала закупки", blank=True, null=True, default="")
    uniqueCode = models.CharField(max_length=255, verbose_name="Уникальный код объекта", null=True, blank=True,
                                  default="")
    manually = models.BooleanField(default=False, verbose_name="Признак добавленной строки")
    afterLineCode = models.CharField(max_length=50, verbose_name="Код строки, после которой добавлена", blank=True,
                                     null=True)

    financialYearSum = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True,
                                           verbose_name="Сумма на текущий финансовый год")
    planFirstYearSum = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True,
                                           verbose_name="Сумма на первый год планового периода")
    planLastYearSum = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True,
                                          verbose_name="Сумма на второй год планового периода")
    AutPlanYearSumm = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True,
                                          verbose_name="Сумма за пределами планового периода")

    class Meta:
        ordering = ['lineCode']
        verbose_name = "Планируемый платёж"
        verbose_name_plural = "Планируемые платежи"

    def __str__(self):
        return f"{self.lineCode} - {self.name}" if self.lineCode and self.name else "Показатель без данных"
