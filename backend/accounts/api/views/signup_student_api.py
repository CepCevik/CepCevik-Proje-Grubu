from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers.signup_student_serializer import SignupStudentSerializer
from ...services.auth_service import AuthService

class SignupStudentAPI(APIView):
    def post(self, request):
        serializer = SignupStudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_data = {
            "email": serializer.validated_data["email"],
            #"username": serializer.validated_data["username"],
            "password": serializer.validated_data["password"],
            "type": "student",
        }

        student_data = {
            "name": serializer.validated_data["name"],
            "nick_name": serializer.validated_data["nick_name"],
            "number": serializer.validated_data["number"],
            "department": serializer.validated_data["department"],
            "term": serializer.validated_data["term"],
        }

        AuthService.signup_student(user_data, student_data)
        return Response({"message": "Öğrenci başarıyla oluşturuldu"})