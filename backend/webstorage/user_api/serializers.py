# serializers.py
from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

Users = get_user_model()

class UserResiterSerializer(serializers.ModelSerializer):
    storage_path = serializers.CharField(required=False)
    class Meta:
        model = Users
        fields = '__all__'

    def create(self, clean_data):
        user_obj = Users.objects.create_user(
            email=clean_data['email'],
            password=clean_data['password'],
        )
        user_obj.username = clean_data['username']
        user_obj.save()    
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('User not found.')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'email', 'username')