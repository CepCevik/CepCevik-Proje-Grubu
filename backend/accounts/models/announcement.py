from django.db import models
from .club import Club

class Announcement(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="announcements")
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.club.name}"