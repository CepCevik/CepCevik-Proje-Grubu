from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers.signup_club_serializer import SignupClubSerializer
from ...services.auth_service import AuthService

class SignupClubAPI(APIView):
    def post(self, request):
        serializer = SignupClubSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_data = {
            "email": serializer.validated_data["email"],
            #"username": serializer.validated_data["username"],
            "password": serializer.validated_data["password"],
            "type": "club",
        }

        club_data = {
            "name": serializer.validated_data["name"],
            "description": serializer.validated_data.get("description", "")
        }

        AuthService.signup_club(user_data, club_data)
        return Response({"message": "Kulüp başarıyla oluşturuldu"})
