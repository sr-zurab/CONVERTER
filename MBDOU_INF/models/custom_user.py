# Модель пользователя (кастомная)
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=True, max_length=254, verbose_name='email address')  # Email пользователя (уникальный)
    role = models.CharField(max_length=50, blank=True, default='user')  # Роль пользователя
    def __str__(self):
        return self.username  # Отображение пользователя по имени
