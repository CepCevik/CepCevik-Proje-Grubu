from rest_framework import serializers
from ...models.announcement import Announcement

class AnnouncementSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)

    class Meta:
        model = Announcement
        fields = ['id', 'club_name', 'title', 'content', 'created_at']