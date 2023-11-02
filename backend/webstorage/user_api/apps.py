# apps.py
from django.apps import AppConfig


class UserApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_api'
    
    def ready(self):
        import user_api.signals
