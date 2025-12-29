from rest_framework import serializers
from ...models.event import Event

class EventSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'club_name', 'title', 'description', 'location', 'date', 'created_at']
        read_only_fields = ['id', 'created_at']