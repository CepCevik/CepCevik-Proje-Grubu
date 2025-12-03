from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ...models.club import Club
from ..serializers.club_serializers import ClubListSerializer, ClubMemberSerializer

# 1. Kullanıcı için Kulüpleri Gösterme & 2. KULLANICI için KULÜBE KAYIT OLMA
class ClubListAndJoinAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Tüm kulüpleri listeler."""
        clubs = Club.objects.all()
        serializer = ClubListSerializer(clubs, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, club_id):
        """Öğrencinin bir kulübe katılması (Registering to a club)."""
        if request.user.type != 'student':
            return Response({"error": "Sadece öğrenciler kulüplere katılabilir."}, status=403)
        
        try:
            club = Club.objects.get(id=club_id)
            student = request.user.student
            
            # Eğer zaten üyeyse çıkar (Opsiyonel: Toggle mantığı)
            if club.members.filter(id=student.id).exists():
                club.members.remove(student)
                return Response({"message": "Kulüp üyeliğinden ayrıldınız."})
            else:
                club.members.add(student)
                return Response({"message": "Kulübe başarıyla katıldınız!"})
                
        except Club.DoesNotExist:
            return Response({"error": "Kulüp bulunamadı."}, status=404)

# 3. Kulüp için kayıt olanları gösterme
class ClubMembersAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Giriş yapmış kulübün kendi üyelerini listeler."""
        if request.user.type != 'club':
            return Response({"error": "Bu bilgiyi sadece kulüp hesapları görebilir."}, status=403)
        
        # Giriş yapan kullanıcının kulüp profilini al
        club = request.user.club
        members = club.members.all()
        
        serializer = ClubMemberSerializer(members, many=True)
        return Response(serializer.data)
