from django.db import models
from .user import User

class Club(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="club")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    # YENİ EKLENEN ALAN:
    members = models.ManyToManyField('accounts.Student', related_name='joined_clubs', blank=True)

    def __str__(self):
        return self.name
