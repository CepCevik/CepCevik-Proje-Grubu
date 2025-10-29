from django.urls import path
from .views import get_system_message

urlpatterns = [
    path('system-message/', get_system_message),
]
