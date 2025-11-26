from django.db import models
from .user import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student")
    name = models.CharField(max_length=100)  
    nick_name = models.CharField(max_length=100)
    number = models.CharField(max_length=20)
    department = models.CharField(max_length=100)
    term = models.IntegerField()


