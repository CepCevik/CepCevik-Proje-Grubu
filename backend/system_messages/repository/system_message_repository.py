from system_messages.models import SystemMessage

def get_active_message():
    return SystemMessage.objects.filter(is_active=True).first()
