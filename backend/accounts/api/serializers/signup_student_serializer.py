from rest_framework import serializers

class SignupStudentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    #username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    name = serializers.CharField()
    nick_name = serializers.CharField()
    number = serializers.CharField()
    department = serializers.CharField()
    term = serializers.IntegerField()