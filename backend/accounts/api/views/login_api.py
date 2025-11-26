from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
"""
class LoginAPI(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        return Response({"message": "Login successful"})
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class LoginAPI(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        # Token oluştur
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Role gönder
        role = "student" if hasattr(user, "student") else "club"

        return Response({
            "message": "Login successful",
            "token": access_token,
            "role": role
        })
