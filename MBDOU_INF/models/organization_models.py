from django.db import models
from MBDOU_INF.models.custom_user import CustomUser

# Модель организации
# Хранит основную информацию об организации
class Organization(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='organizations')  # Владелец организации
    name = models.CharField(max_length=255)  # Название организации
    FIO = models.TextField()  # ФИО руководителя
    INN = models.CharField(max_length=10)  # ИНН
    KPP = models.CharField(max_length=9)  # КПП
    address = models.TextField()  # Адрес
    phone = models.CharField(max_length=50)  # Телефон
    BANK = models.TextField()  # Банковские реквизиты
    UBP = models.CharField(max_length=8)  # Номер по сводному реестру

    def __str__(self):
        return self.name  # Отображение организации по названию
