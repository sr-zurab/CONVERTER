from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('MBDOU_INF.urls')),  # Подключаем маршруты приложения
]
