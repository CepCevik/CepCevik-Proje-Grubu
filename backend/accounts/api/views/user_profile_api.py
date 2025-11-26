# backend/accounts/api/views/user_profile_api.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..serializers.user_profile_serializer import UserProfileSerializer

class UserProfileAPI(APIView):
    # Bu endpoint'e sadece oturum açmış kullanıcılar erişebilir
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # request.user, JWT ile doğrulanmış kullanıcı nesnesidir
        user = request.user
        serializer = UserProfileSerializer(user)
        # Serializer'dan dönen veriyi JSON olarak döndürür
        return Response(serializer.data)