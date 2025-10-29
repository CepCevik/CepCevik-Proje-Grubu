from system_messages.repository.system_message_repository import get_active_message

def fetch_active_system_message():
    message = get_active_message()
    if message:
        return {"message": message.message_text}
    else:
        return {"message": None}
