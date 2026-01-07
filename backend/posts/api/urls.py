from django.urls import path
from .views.post_views import ClubFeedAPI, GiveawayActionAPI, PostCreateAPI, PostActionAPI, PublicClubFeedAPI



urlpatterns = [
    path('my-feed/', ClubFeedAPI.as_view(), name='my-feed'), 
    path('club/<int:club_id>/', PublicClubFeedAPI.as_view(), name='club-public-feed'), # 🟢 YENİ HAT
    path('giveaway/<int:giveaway_id>/<str:action>/', GiveawayActionAPI.as_view(), name='giveaway-action'),
    path('create/', PostCreateAPI.as_view(), name='post-create'),
    path('<int:post_id>/<str:action>/', PostActionAPI.as_view(), name='post-action'),
]