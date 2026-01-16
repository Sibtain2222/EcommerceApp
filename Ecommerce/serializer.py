from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomerModel


# class CustomerdataSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(max_length=100)
#     email = serializers.EmailField()
#     phone = serializers.IntegerField(required=False , allow_null=True)
#     address = serializers.CharField(required=False, allow_blank=True)



class CustomerdataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerModel
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    # password= serializers.CharField(write_only=True , min_length=8 ,style={'input_type':'password'})
    class Meta :
        model= User
        fields=['username','email','password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user
    