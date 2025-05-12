from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=255)
    FIO = models.TextField()
    INN = models.CharField(max_length=10)
    KPP = models.CharField(max_length=9)
    address = models.TextField()
    phone = models.CharField(max_length=50)
    BANK = models.TextField()
    UBP = models.CharField(max_length=8)

    def __str__(self):
        return self.name

#ФХД первый лист

class PlanPaymentIndex(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="plan_payment_indices",
        verbose_name="Организация"
    )
    year = models.PositiveIntegerField(verbose_name="Год формирования отчета")
    name = models.CharField("Наименование показателя", max_length=255)
    lineCode = models.CharField("Код строки", max_length=50)
    kbk = models.CharField("Код по бюджетной классификации", max_length=100)
    analyticCode = models.CharField("Аналитический код", max_length=100)

    manually = models.BooleanField("Признак добавленной строки", default=False)

    financialYearSum = models.DecimalField("Сумма на текущий финансовый год", max_digits=20, decimal_places=2, blank=True, null=True)
    planFirstYearSum = models.DecimalField("Сумма на первый год планового периода", max_digits=20, decimal_places=2, blank=True, null=True)
    planLastYearSum = models.DecimalField("Сумма на второй год планового периода", max_digits=20, decimal_places=2, blank=True, null=True)
    AutPlanYearSumm = models.DecimalField("Сумма за пределами планового периода", max_digits=20, decimal_places=2, blank=True, null=True)

    class Meta:
        verbose_name = "Показатель плана платежей"
        verbose_name_plural = "Показатели плана платежей"

    def __str__(self):
        return f"{self.lineCode} - {self.name}"

#ФХД второй лист

class PlanPaymentTRU(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='plan_payment_tru')
    year = models.PositiveIntegerField(verbose_name="Год формирования отчета")
    line_num = models.PositiveIntegerField(verbose_name="Номер строки", null=True, blank=True)
    kbk = models.CharField(max_length=100, verbose_name="Код бюджетной классификации")
    name = models.TextField(verbose_name="Наименование показателя")
    line_code = models.CharField(max_length=50, verbose_name="Код строки")
    year_start = models.PositiveIntegerField(verbose_name="Год начала закупки", null=True, blank=True)
    unique_code = models.CharField(max_length=255, verbose_name="Уникальный код объекта", null=True, blank=True)

    manually = models.BooleanField(default=False, verbose_name="Признак добавленной строки")

    financial_year_sum = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True, verbose_name="Сумма на текущий финансовый год")
    plan_first_year_sum = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True, verbose_name="Сумма на первый год планового периода")
    plan_last_year_sum = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True, verbose_name="Сумма на второй год планового периода")
    aut_plan_year_summ = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True, verbose_name="Сумма за пределами планового периода")

    class Meta:
        verbose_name = "Планируемый платёж"
        verbose_name_plural = "Планируемые платежи"

    def __str__(self):
        return f"{self.name} ({self.kbk})"
