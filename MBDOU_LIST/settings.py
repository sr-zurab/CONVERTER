"""
Django settings for MBDOU_LIST project.
"""
import os
from pathlib import Path

# Базовая директория проекта
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# Секретный ключ Django (обязательно держать в секрете в продакшене)
SECRET_KEY = 'django-insecure-%=!p)bfmqdyl!+r%nf%rp%35#z8f(t)_$6fo#0183vah@dobvp'

# Включает режим отладки (True — для разработки, False — для продакшена)
DEBUG = True

# Список разрешённых хостов (доменов), с которых принимаются запросы
ALLOWED_HOSTS = ["192.168.1.33", "10.10.10.28","localhost", "127.0.0.1"]


# Application definition

# Список установленных приложений Django и сторонних библиотек
INSTALLED_APPS = [
    'corsheaders',  # Для поддержки CORS
    'django.contrib.admin',  # Админка Django
    'django.contrib.auth',  # Система аутентификации
    'django.contrib.contenttypes',  # Контент-тайпы
    'django.contrib.sessions',  # Сессии
    'django.contrib.messages',  # Сообщения
    'django.contrib.staticfiles',  # Статические файлы
    'MBDOU_INF',  # Ваше приложение
    'rest_framework',  # Django REST Framework
    'django_extensions',  # Утилиты для разработки
]

# Список используемых middleware (промежуточных обработчиков запросов)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',  # Безопасность
    'corsheaders.middleware.CorsMiddleware',  # CORS
    'django.contrib.sessions.middleware.SessionMiddleware',  # Сессии
    'django.middleware.common.CommonMiddleware',  # Общие middleware
    'django.middleware.csrf.CsrfViewMiddleware',  # CSRF защита
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Аутентификация
    'django.contrib.messages.middleware.MessageMiddleware',  # Сообщения
    'django.middleware.clickjacking.XFrameOptionsMiddleware',  # Защита от clickjacking
]

# Основной модуль с URL-ами
ROOT_URLCONF = 'MBDOU_LIST.urls'

# Настройки шаблонов Django (если используются)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Папка с шаблонами
        'APP_DIRS': True,  # Ищет шаблоны внутри приложений
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',  # Добавляет request в шаблоны
                'django.contrib.auth.context_processors.auth',  # Добавляет user в шаблоны
                'django.contrib.messages.context_processors.messages',  # Добавляет сообщения
            ],
        },
    },
]

# WSGI-приложение (точка входа для серверов)
WSGI_APPLICATION = 'MBDOU_LIST.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# Настройки базы данных
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Движок БД (PostgreSQL)
        'NAME': 'MBDOU',  # Имя базы данных
        'USER': 'Admin',  # Пользователь БД
        'PASSWORD': '010786',  # Пароль
        'HOST': 'localhost',  # Адрес сервера БД
        'PORT': '5432',  # Порт
    }
}




# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

# Валидаторы паролей (рекомендуется для безопасности)
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},  # Проверка на схожесть с личными данными
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},  # Минимальная длина пароля
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},  # Запрет на слишком простые пароли
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},  # Запрет на полностью цифровые пароли
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

# Язык по умолчанию
LANGUAGE_CODE = 'ru-ru'

# Часовой пояс по умолчанию
TIME_ZONE = 'UTC'

# Включить интернационализацию
USE_I18N = True

# Включить поддержку временных зон
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

# URL для статики
STATIC_URL = 'static/'
# Папки, где искать статические файлы (например, собранный фронтенд)
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend', 'dist')]

# Тип поля для авто-генерируемых ключей моделей по умолчанию
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Прочие настройки Django ...

# --- CORS настройки ---
# Список разрешённых источников для CORS (разрешённые адреса фронтенда)
CORS_ALLOWED_ORIGINS = [
    "http://10.10.10.28",
    "http://10.10.10.28:4173",
    "http://localhost:5173",  # Адрес фронтенда
    "http://192.168.1.33:5173",
    "http://127.0.0.1:4173",
]
# Разрешённые HTTP-методы для CORS
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "OPTIONS",
]
# Разрешённые заголовки для CORS
CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
]
