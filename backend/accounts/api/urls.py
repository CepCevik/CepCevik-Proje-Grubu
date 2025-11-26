# backend/accounts/api/urls.py

from django.urls import path
from .views.signup_student_api import SignupStudentAPI
from .views.signup_club_api import SignupClubAPI
from .views.login_api import LoginAPI
from .views.user_profile_api import UserProfileAPI # <--- YENİ IMPORT

urlpatterns = [
    path("signup/student/", SignupStudentAPI.as_view()),
    path("signup/club/", SignupClubAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("profile/", UserProfileAPI.as_view()), # <--- YENİ ROUTE
]