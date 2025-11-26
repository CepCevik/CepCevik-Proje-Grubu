# backend/accounts/api/serializers/user_profile_serializer.py

from rest_framework import serializers
from ...models.user import User
from ...models.student import Student
from ...models.club import Club

class StudentProfileSerializer(serializers.ModelSerializer):
    """Öğrenciye özel detay alanlarını serileştirir."""
    class Meta:
        model = Student
        fields = ('name', 'nick_name', 'number', 'department', 'term')

class ClubProfileSerializer(serializers.ModelSerializer):
    """Kulübe özel detay alanlarını serileştirir."""
    class Meta:
        model = Club
        fields = ('name', 'description')

class UserProfileSerializer(serializers.ModelSerializer):
    """Genel kullanıcı bilgilerini ve role özel detayları serileştirir."""
    # 'student' ve 'club' related_name'leri üzerinden ilgili profil bilgilerini çeker
    student_profile = StudentProfileSerializer(source='student', read_only=True)
    club_profile = ClubProfileSerializer(source='club', read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 
            'email', 
            'first_name', 
            'last_name', 
            'type', 
            'is_staff', 
            'is_active', 
            'date_joined', 
            'student_profile', 
            'club_profile'
        )