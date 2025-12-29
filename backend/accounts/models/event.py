from django.db import models
from .club import Club

class Event(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="events")
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=255, blank=True)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.club.name}"