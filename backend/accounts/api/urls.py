from django.urls import path
from .views.signup_student_api import SignupStudentAPI
from .views.signup_club_api import SignupClubAPI
from .views.login_api import LoginAPI
from .views.user_profile_api import UserProfileAPI
# Yeni importlar
from .views.club_actions_api import ClubListAndJoinAPI, ClubMembersAPI
from .views.event_api import EventCreateListAPI
from .views.announcement_api import AnnouncementAPI

urlpatterns = [
    path("signup/student/", SignupStudentAPI.as_view()),
    path("signup/club/", SignupClubAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("profile/", UserProfileAPI.as_view()),
    
    # YENİ ENDPOINTLER
    path("clubs/", ClubListAndJoinAPI.as_view()),  # GET: Listele
    path("clubs/<int:club_id>/join/", ClubListAndJoinAPI.as_view()), # POST: Katıl
    path("my-club/members/", ClubMembersAPI.as_view()), # GET: Üyeleri gör
    path("events/", EventCreateListAPI.as_view()),
    path("announcements/", AnnouncementAPI.as_view())
]
