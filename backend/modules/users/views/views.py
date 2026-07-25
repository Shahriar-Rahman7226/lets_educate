from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import transaction
from drf_spectacular.utils import extend_schema, OpenApiExample
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from external.pagination import CustomPagination
from external.swagger_query_params import set_query_params
from ..serializers.serializers import *
from ..models.models import *
from external.send_message import send_email
from rest_framework import status
from external.decorators import allowed_users
from external.query_helper import get_query_data
from django.db.models import Q
from external.choice_tuple import USER_ROLES


@extend_schema(tags=['User Registration'])
class UserResgistrationViewSet(ModelViewSet):
    model_class = User
    serializer_class = UserSerializer
    queryset = model_class.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    pagination_classes = CustomPagination
    lookup_field = 'id'

    @extend_schema(
    examples=[
        OpenApiExample(
            "Create Admin",
            value={
                "first_name": "string",
                "last_name": "string",
                "email": "string",
                "phone_number": "string",
                "additional_phone_number": "string",
                "nationality": "string",
                 "dob": "2005-08-15",
                "address": "string",
                "gender": "string",
                "profile_image": "file",
                "password": "string",
            },
            request_only=True,
            )
        ]
    )
    @transaction.atomic()
    def create_admin(self, request, *args, **kwargs):
        data = request.data.copy()

        # Email Check
        if self.model_class.objects.filter(email=data['email']).first():
            return Response({'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Phone number check
        if self.model_class.objects.filter(Q(phone_number=data['phone_number']) | Q(additional_phone_number=data['phone_number'])).first():
            return Response({'message': 'Phone number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Additional phone number check
        if 'additional_phone_number' in data and data['additional_phone_number']:
            if self.model_class.objects.filter(Q(phone_number=data['additional_phone_number']) | Q(additional_phone_number=data['additional_phone_number'])).first():
                return Response({'message': 'Additional phone number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Password check
        if 'password' in data.keys():
            try:
                validate_password(data['password'])
                data['password'] = make_password(data['password'])
            except ValidationError:
                return Response({'message': 'Given password is too weak.'}, status=status.HTTP_400_BAD_REQUEST)
            
        data['user_role'] = USER_ROLES[1][0]
       
        # Generate Admin User ID
        last_admin = self.model_class.objects.filter(
            user_role=USER_ROLES[1][0]
        ).order_by('-user_id').first()
        
        if last_admin and last_admin.user_id:
            last_number = int(last_admin.user_id[1:])
            last_number += 1
            formatted_id = format(last_number, "03d") # format: trailing zeros | 3 digits | decimal/integer
            data["user_id"] = f"A{formatted_id}"
        else:
            data['user_id'] = "A000"

      

        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            user_obj = serializer.save()
            subject = 'Lets Educate'
            message = 'Thankyou for registering with us!'
            send_email(user_obj.id, subject, message, None)
            return Response({'message': 'Admin created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
         

    @extend_schema(
        examples=[
            OpenApiExample(
                "Create Tutor",
                value={
                    "first_name": "string",
                    "last_name": "string",
                    "email": "string",
                    "phone_number": "string",
                    "additional_phone_number": "string",
                    "nationality": "string",
                    "dob": "2005-08-15",
                    "address": "string",
                    "gender": "string",
                    "profile_image": "file",
                    "password": "string",
                },
                request_only=True,
            )
        ]
    )
    @transaction.atomic()
    def create_tutor(self, request, *args, **kwargs):
        data = request.data.copy()

        # Email Check
        if self.model_class.objects.filter(email=data['email']).first():
            return Response({'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Phone number check
        if self.model_class.objects.filter(Q(phone_number=data['phone_number']) | Q(additional_phone_number=data['phone_number'])).first():
            return Response({'message': 'Phone number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Additional phone number check
        if 'additional_phone_number' in data and data['additional_phone_number']:
            if self.model_class.objects.filter(Q(phone_number=data['additional_phone_number']) | Q(additional_phone_number=data['additional_phone_number'])).first():
                return Response({'message': 'Additional phone number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Password check
        if 'password' in data.keys():
            try:
                validate_password(data['password'])
                data['password'] = make_password(data['password'])
            except ValidationError:
                return Response({'message': 'Given password is too weak.'}, status=status.HTTP_400_BAD_REQUEST)
            
        data['user_role'] = USER_ROLES[2][0]
        
         # Generate Tutor User ID
        last_tutor = self.model_class.objects.filter(
            user_role=USER_ROLES[2][0]
        ).order_by('-user_id').first()
        
        if last_tutor and last_tutor.user_id:
            last_number = int(last_tutor.user_id[1:])
            last_number += 1
            formatted_id = format(last_number, "03d") # format: trailing zeros | 3 digits | decimal/integer
            print(formatted_id)
            data["user_id"] = f"T{formatted_id}"
        else:
            data['user_id'] = "T000"

       
        print(data['user_id'])
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            user_obj = serializer.save()
            subject = 'Lets Educate'
            message = 'Thankyou for registering with us!'
            send_email(user_obj.id, subject, message, None)
            return Response({'message': 'Tutor created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    @extend_schema(
    examples=[
        OpenApiExample(
            "Create Student",
            value={
                "first_name": "string",
                "last_name": "string",
                "email": "string",
                "phone_number": "string",
                "additional_phone_number": "string",
                "nationality": "string",
                 "dob": "2005-08-15",
                "address": "string",
                "gender": "string",
                "profile_image": "file",
                "password": "string",
            },
            request_only=True,
            )
        ]
    )
    @transaction.atomic()
    def create_student(self, request, *args, **kwargs):
        data = request.data.copy()

        # Email Check
        if self.model_class.objects.filter(email=data['email']).first():
            return Response({'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Phone number check
        if self.model_class.objects.filter(Q(phone_number=data['phone_number']) | Q(additional_phone_number=data['phone_number'])).first():
            return Response({'message': 'Phone number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Additional phone number check
        if 'additional_phone_number' in data and data['additional_phone_number']:
            if self.model_class.objects.filter(Q(phone_number=data['additional_phone_number']) | Q(additional_phone_number=data['additional_phone_number'])).first():
                return Response({'message': 'Additional phone number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Password check
        if 'password' in data.keys():
            try:
                validate_password(data['password'])
                data['password'] = make_password(data['password'])
            except ValidationError:
                return Response({'message': 'Given password is too weak.'}, status=status.HTTP_400_BAD_REQUEST)
            
        data['user_role'] = USER_ROLES[3][0]

        # Generate Student User ID
        last_student = self.model_class.objects.filter(
            user_role=USER_ROLES[3][0]
        ).order_by('-user_id').first()
        
        if last_student and last_student.user_id:
            last_number = int(last_student.user_id[1:])
            last_number += 1
            formatted_id = format(last_number, "03d") # format: trailing zeros | 3 digits | decimal/integer
            data["user_id"] = f"S{formatted_id}"
        else:
            data['user_id'] = "S000"

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            user_obj = serializer.save()
            subject = 'Lets Educate'
            message = 'Thankyou for registering with us!'
            send_email(user_obj.id, subject, message, None)
            return Response({'message': 'Student'
            ' created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

@extend_schema(tags=['User Update And List'])
class UserUpdateAndListViewSet(ModelViewSet):
    model_class = User
    serializer_class = UserListSerializer
    queryset = model_class.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    pagination_classes = CustomPagination
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.action in ['update']:
            return UserSerializer
        return self.serializer_class
    
    @extend_schema(
        examples=[
            OpenApiExample(
                "Update User",
                value={
                    "first_name": "string",
                    "last_name": "string",
                    "email": "string",
                    "phone_number": "string",
                    "additional_phone_number": "string",
                    "nationality": "string",
                     "dob": "2005-08-15",
                     "gender": "string",
                    "address": "string",
                    "profile_image": "file",
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        instance = self.queryset.filter(id=request.user.id).first()

        if not instance:
            return Response({'message': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Email check
        if 'email' in data.keys():
            if self.model_class.objects.filter(email=data['email']).first():
                return Response({'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Phone number check
        if 'phone_number' in data.keys():
            if self.model_class.objects.filter(Q(phone_number=data['phone_number']) | Q(additional_phone_number=data['phone_number'])).first():
                return Response({'message': 'Phone number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)


        # Additional phone number check
        if 'additional_phone_number' in data.keys():
            if self.model_class.objects.filter(Q(phone_number=data['additional_phone_number']) | Q(additional_phone_number=data['additional_phone_number'])).first():
                return Response({'message': 'Additional phone number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(instance=instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subject = 'Lets Educate'
            message = 'Your profile information was updated successfully.'
            send_email(None, subject, message, request.user.id)
            return Response({'message': 'User updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(parameters=set_query_params('list', [
        {"name": 'user_role', "description": 'Filter by user role'},
    ]))
    @allowed_users(allowed_roles=['SUPER_USER', 'ADMIN'])
    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        params = request.query_params
        if params:
            queryset=get_query_data(params, queryset)
        page = self.paginate_queryset(queryset)
        serializer_class = self.get_serializer_class()
        if page is not None:
            serializer = serializer_class(
                page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    def retrieve(self, request, *args, **kwargs):
        queryset = self.queryset
        obj = queryset.filter(id=request.user.id).first()
        if not obj:
            return Response({'message': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)