from rest_framework import serializers
from ...models.club import Club
from ...models.student import Student

# Öğrencinin göreceği Kulüp listesi için
class ClubListSerializer(serializers.ModelSerializer):
    is_joined = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'is_joined']

    def get_is_joined(self, obj):
        user = self.context['request'].user
        if hasattr(user, 'student'):
            return obj.members.filter(id=user.student.id).exists()
        return False

# Kulübün göreceği Üye (Öğrenci) listesi için
class ClubMemberSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Student
        fields = ['name', 'nick_name', 'number', 'department', 'term', 'email']
