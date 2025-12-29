from asyncio import events
from httpx import request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..serializers.event_serializers import EventSerializer
from ...models.event import Event

class EventCreateListAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Sadece öğrencinin üye olduğu kulüplerin etkinliklerini listeler."""
        if request.user.type == 'student':
            joined_clubs = request.user.student.joined_clubs.all()
            events = Event.objects.filter(club__in=joined_clubs).order_by('-date')
        else:
            events = Event.objects.all().order_by('-date')

        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Kulübün yeni bir etkinlik oluşturmasını sağlar."""
        if request.user.type != 'club':
            return Response({"error": "Sadece kulüp hesapları etkinlik oluşturabilir."}, status=403)
        
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            # Etkinliği giriş yapmış olan kulübe bağlayarak kaydet
            serializer.save(club=request.user.club)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)