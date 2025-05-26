from django.db import models


# Модель организации
# Хранит основную информацию об организации
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
