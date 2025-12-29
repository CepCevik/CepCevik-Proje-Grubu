from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..serializers.announcement_serializers import AnnouncementSerializer
from ...models.announcement import Announcement

class AnnouncementAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Sadece öğrencinin üye olduğu kulüplerin duyurularını listeler."""
        if request.user.type == 'student':
        # Öğrencinin katıldığı kulüpleri bul
            joined_clubs = request.user.student.joined_clubs.all()
        # Sadece bu kulüplere ait duyuruları filtrele
            announcements = Announcement.objects.filter(club__in=joined_clubs).order_by('-created_at')
        else:
            announcements = Announcement.objects.all().order_by('-created_at')
        
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Kulübün duyuru oluşturmasını sağlar."""
        if request.user.type != 'club':
            return Response({"error": "Sadece kulüpler duyuru yapabilir."}, status=403)
        
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(club=request.user.club)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)