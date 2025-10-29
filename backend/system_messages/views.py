from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from system_messages.services.system_message_service import fetch_active_system_message

@api_view(['GET'])
def get_system_message(request):
    try:
        result = fetch_active_system_message()
        if result["message"]:
            return Response(result)
        else:
            return Response({"message": "Aktif sistem duyurusu yok."}, status=204)
    except Exception:
        return Response({"error": "Sistem duyurusu yüklenemedi."}, status=500)
