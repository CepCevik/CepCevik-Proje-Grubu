from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ("student", "Student"),
        ("club", "Club"),
    )

    username = None
    email = models.EmailField(unique=True)
    type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    
    USERNAME_FIELD = 'email'       # login artık email ile
    REQUIRED_FIELDS = [] 


