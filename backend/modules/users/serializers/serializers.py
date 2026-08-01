from rest_framework import serializers
from rest_framework.serializers import *
from ..models.models import *
from external.choice_tuple import USER_ROLES, GENDER, COUNTRY, DISTRICT

exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]

class UserSerializer(ModelSerializer):
    country = serializers.ChoiceField(choices=COUNTRY)
    district =  serializers.ChoiceField(choices=DISTRICT)
    user_role = serializers.ChoiceField(choices=USER_ROLES)
    gender = serializers.ChoiceField(choices=GENDER)
     
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'country', 'district', 'email', 'phone_number', 'additional_phone_number', 'address', 'profile_image', 'gender', 'password', 
                  'user_role', 'user_id', 'is_profile_completed', 'is_education_completed']

class UserListSerializer(ModelSerializer):

    class Meta:
        model = User
        exclude = [
            'is_active',
            'is_superuser',
            'last_login',
            'created_at',
            'updated_at',
            'login_attempt',
            'user_permissions',
            'groups',
            'two_factor',
            'first_name',
            'last_name',
            'password',
            'is_profile_completed',
            'is_education_completed'
        ]
