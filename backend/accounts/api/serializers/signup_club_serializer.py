from rest_framework import serializers


class SignupClubSerializer(serializers.Serializer):
    email = serializers.EmailField()
    #username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    name = serializers.CharField()  # kulüp adı
    description = serializers.CharField(allow_blank=True, required=False)
