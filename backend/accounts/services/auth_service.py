from ..repositories.user_repository import UserRepository
from ..repositories.student_repository import StudentRepository
from ..repositories.club_repository import ClubRepository
from django.contrib.auth import authenticate

class AuthService:

    @staticmethod
    def signup_student(user_data, student_data):
        user_data["type"] = "student"
        user = UserRepository.create_user(user_data)
        StudentRepository.create_student(user, student_data)
        return user

    @staticmethod
    def signup_club(user_data, club_data):
        user_data["type"] = "club"
        user = UserRepository.create_user(user_data)
        ClubRepository.create_club(user, club_data)
        return user

    @staticmethod
    def login(email, password):
        return authenticate(email=email, password=password)
