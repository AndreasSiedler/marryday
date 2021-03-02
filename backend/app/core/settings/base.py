"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 3.0.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
from dotenv import load_dotenv, find_dotenv

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(PROJECT_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# Load env file and set env variables
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

# Application definition

INSTALLED_APPS = [
    # Local Apps (Your project's apps)
    'accounts',
    'profiles',
    'search',
    'cowork',
    'payments',
    'cms.home',
    'cms.flex',
    'cms.theme',
    'cms.rest',
    'cms.blog',

    # Django Apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    # Wagtail Apps
    # 'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    # 'wagtail.embeds',
    'wagtail.sites',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail.core',
    'wagtail.api.v2',

    # Third-Party Apps
    'modelcluster',
    'taggit',
    'wagtailmenus',
    'wagtail.contrib.modeladmin',
    'wagtail.contrib.settings',
    'wagtailmetadata',
    'django.contrib.sitemaps',
    'corsheaders',
    'tinymce',

    # Auth
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'allauth',
    'allauth.account',
    'rest_auth.registration',

]

MIDDLEWARE = [
    # Cors
    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',

    'wagtail.contrib.redirects.middleware.RedirectMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(PROJECT_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'wagtailmenus.context_processors.wagtailmenus',
                'wagtail.contrib.settings.context_processors.settings'
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, 'static'),
]

# ManifestStaticFilesStorage is recommended in production, to prevent outdated
# Javascript / CSS assets being served from cache (e.g. after a Wagtail upgrade).
# See https://docs.djangoproject.com/en/3.0/ref/contrib/staticfiles/#manifeststaticfilesstorage
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'


# Wagtail settings

WAGTAIL_SITE_NAME = "core"

# Base URL to use when referring to full URLs within the Wagtail admin backend -
# e.g. in notification emails. Don't include '/admin' or a trailing slash
BASE_URL = 'http://example.com'

# Crispy Settings
CRISPY_TEMPLATE_PACK = 'bootstrap4'


# Cors Configuration
CORS_ORIGIN_ALLOW_ALL = True

# CORS_ORIGIN_WHITELIST = (
#     'http://172.22.0.2:3000/',
# )
# CORS_ALLOWED_ORIGINS = [
#     '*'
# ]


# Mailchimp
# https://mailchimp.com/developer/guides/marketing-api-quick-start/

# Set env variables
MAILCHIMP_API_KEY = os.environ.get('MAILCHIMP_API_KEY')
MAILCHIMP_DATA_CENTER = os.environ.get('MAILCHIMP_DATA_CENTER')
MAILCHIMP_EMAIL_LIST_ID = os.environ.get('MAILCHIMP_EMAIL_LIST_ID')


# Auth user
AUTH_USER_MODEL = 'accounts.User'

# Configure django-rest-framework
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    )
}


# Configure django-allauth
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = '/?verification=1'
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = '/?verification=1'

SITE_ID = 1


# EMAIL SETTINGS
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.world4you.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 25
EMAIL_HOST_USER = 'andreas@mowo.space'
# EMAIL_HOST_PASSWORD = '!Andi_89'
EMAIL_HOST_PASSWORD = 'z7La=Vz7=N'

# instruct rest_auth to use custom UserSerializer
REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'accounts.api.serializers.common.UserSerializer',
    'TOKEN_SERIALIZER': 'accounts.api.serializers.common.TokenSerializer',
    # 'LOGIN_SERIALIZER': 'accounts.api.serializers.common.LoginSerializer',
}

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'accounts.api.serializers.common.RegisterSerializer',
}

# REST_USE_JWT = True

# S3 Bucket Connection
# app user with programmatic access
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = 'eu-central-1'
AWS_S3_FILE_OVERWRITE = False
# Setting AWS_QUERYSTRING_AUTH to False to remove query parameter authentication from generated URLs. This can be useful if your S3 buckets are public.
# BUT WITH AUTH QUERYSTRING AND ERROR OCCURES - NOT DEBUGGED YET
AWS_QUERYSTRING_AUTH = False


# Stripe payment
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')

# Pipedrive
PIPEDRIVE_API_TOKEN = os.environ.get('PIPEDRIVE_API_TOKEN')
PIPEDRIVE_URL = os.environ.get('PIPEDRIVE_URL')

# Client Domain
CLIENT_DOMAIN = os.environ.get('CLIENT_DOMAIN')

# TinyMCE Config
TINYMCE_DEFAULT_CONFIG = {
    # 'theme': "advanced",
    # 'relative_urls': False, # default value
    # 'width': '100%',
    'height': 300
}
