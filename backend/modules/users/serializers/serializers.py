from rest_framework import serializers
from rest_framework.serializers import *
from ..models.models import *
from external.choice_tuple import USER_ROLES, GENDER

exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]

class UserSerializer(ModelSerializer):
    user_role = serializers.ChoiceField(choices=USER_ROLES)
    gender = serializers.ChoiceField(choices=GENDER)
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'nationality', 'email', 'phone_number', 'dob', 'address', 'profile_image', 'gender', 'password', 'user_role', 'user_id']

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
        ]
