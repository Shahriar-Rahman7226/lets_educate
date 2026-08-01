from drf_spectacular.utils import extend_schema, OpenApiExample
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from external.swagger_query_params import set_query_params
from external.pagination import CustomPagination
from modules.user_profile.models.models import *
from modules.user_profile.serializers.serializers import *
from django.db import transaction
from external.query_helper import get_query_data
from external.decorators import allowed_users
from rest_framework import status
from external.choice_tuple import USER_ROLES
from django.db.models import Q

@extend_schema(tags=['Student Profile'])
class StudentProfileViewSet(ModelViewSet):
    model_class = StudentProfile
    serializer_class = StudentProfileListSerializer
    queryset = model_class.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    pagination_classes = CustomPagination
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return StudentProfileSerializer
        return self.serializer_class
    
    @extend_schema(
        examples=[
            OpenApiExample(
                "Create Student Profile",
                value={
                "institute_name": "string",
                "institute_id": "file",
                "curriculum": "string",
                "overview": "string",
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['STUDENT'])
    def create(self, request, *args, **kwargs):
        data=request.data.copy()
            
        data['user'] = request.user.id
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            instance = serializer.save()
             # Fetching the user using the foreign key relationship and updating the status
            user = instance.user
            user.is_profile_completed = True
            user.save(update_fields=['is_profile_completed'])
            
            return Response({'message': 'Student profile created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(
        examples=[
            OpenApiExample(
                "Update Student Profile",
                value={
                "institute_name": "string",
                "institute_id": "file",
                "curriculum": "string",
                "overview": "string",
                "reason_for_update": "string",
                "is_approved": False,
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['ADMIN', 'STUDENT'])
    def update(self, request, *args, **kwargs):
        data = request.data
        instance = self.model_class.objects.filter(id=kwargs['id']).first()
        if not instance:
            return Response({'message': 'Student Profile does not exists'}, status=status.HTTP_400_BAD_REQUEST)
        
         # Reason for update required for Student
        if request.user.user_role == USER_ROLES[3][0] and not data.get('reason_for_update'):
                return Response({'message': 'Please provide a reason for your update.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(instance=instance, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Student Profile updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(
                page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, *args, **kwargs):
        queryset = self.queryset
        obj = queryset.filter(id=kwargs['id']).first()
        if not obj:
            return Response({'message': 'Student Profile does not exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


@extend_schema(tags=['Tutor Profile'])
class TutorProfileViewSet(ModelViewSet):
    model_class = TutorProfile
    serializer_class = TutorProfileListSerializer
    queryset = model_class.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    pagination_classes = CustomPagination
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return TutorProfileSerializer
        return self.serializer_class
    
    @extend_schema(
    examples=[
        OpenApiExample(
            "Create Tutor Profile",
            value={
                "govt_id": "file",
                "overview": "string",
                "tutoring_experience": "string",
                "facebook": "string",
                "linkedin": "string",
            },
            request_only=True,
        )
    ],
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['TUTOR'])
    def create(self, request, *args, **kwargs):
        data = request.data.dict()

        # Preserve uploaded file(s)
        for key, file in request.FILES.items():
            data[key] = file

        data['user'] = request.user.id
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)

        if serializer.is_valid(raise_exception=True):
            instance = serializer.save()
            # Fetching the user using the foreign key relationship and updating the status
            user = instance.user
            user.is_profile_completed = True
            user.save(update_fields=['is_profile_completed'])

            return Response(
                {'message': 'Tutor profile created successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(
        examples=[
            OpenApiExample(
                "Update Tutor Profile",
                value={
                "govt_id": "file", 
                "overview": "string",
                "tutoring_experience": "string", 
                "facebook": "string", 
                "linkedin": "string",
                "reason_for_update": "string",
                 "is_approved": False,
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['ADMIN', 'TUTOR'])
    def update(self, request, *args, **kwargs):
        data = request.data
        instance = self.model_class.objects.filter(id=kwargs['id']).first()
        if not instance:
            return Response({'message': 'Tutor Profile does not exists'}, status=status.HTTP_400_BAD_REQUEST)
                    
         # Reason for update required for Tutor
        if request.user.user_role == USER_ROLES[2][0] and not data.get('reason_for_update'):
                return Response({'message': 'Please provide a reason for your update.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(instance=instance, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Tutor Profile updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(
                page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, *args, **kwargs):
        queryset = self.queryset
        obj = queryset.filter(id=kwargs['id']).first()
        if not obj:
            return Response({'message': 'Tutor Profile does not exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


@extend_schema(tags=['Tutor Education'])
class TutorEducationViewSet(ModelViewSet):
    model_class = TutorEducation
    serializer_class = TutorEducationListSerializer
    queryset = model_class.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    pagination_classes = CustomPagination
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return TutorEducationSerializer
        return self.serializer_class
    
    @extend_schema(
        examples=[
            OpenApiExample(
                "Create Tutor Education",
                value={
                    "secondary_curriculum": "string", 
                    "secondary_institute_name": "string",
                    "secondary_result": "string", 
                    "secondary_certificate": "file", 
                    "secondary_passing_year": "2026", 

                    "higher_secondary_curriculum": "string",
                    "higher_secondary_institute_name": "string", 
                    "higher_secondary_result": "string", 
                    "higher_secondary_certificate": "file", 
                    "higher_secondary_passing_year": "2026",  
                    
                    "bachelors_institute_name": "string", 
                    "bachelors_field_of_study": "string",
                    "bachelors_id": "file", 
                    "bachelors_result": "string", 
                    "bachelors_certificate": "file", 
                    "bachelors_passing_year": "2026", 

                    "masters_institute_name": "string",
                    "masters_field_of_study": "string", 
                    "masters_id": "file", 
                    "masters_result": "string", 
                    "masters_certificate": "file", 
                    "masters_passing_year": "2026",

                    "current_education_level": "string", 
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['TUTOR'])
    def create(self, request, *args, **kwargs):
        data=request.data
        
        profile_instance = TutorProfile.objects.filter(user=request.user.id).first()
        if not profile_instance:
            return Response({'message': 'Tutor Profile does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        data['tutor_profile'] = profile_instance.id
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # Accessing the user via the profile instance foreign key and updating the status
            user = profile_instance.user
            user.is_education_completed = True
            user.save(update_fields=['is_education_completed'])

            return Response({'message': 'Tutor Education created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(
        examples=[
            OpenApiExample(
                "Update Tutor Education",
                value={
                    "secondary_curriculum": "string", 
                    "secondary_institute_name": "string",
                    "secondary_result": "string", 
                    "secondary_certificate": "file", 
                    "secondary_passing_year": "2026", 

                    "higher_secondary_curriculum": "string",
                    "higher_secondary_institute_name": "string", 
                    "higher_secondary_result": "string", 
                    "higher_secondary_certificate": "file", 
                    "higher_secondary_passing_year": "2026",  
                    
                    "bachelors_institute_name": "string", 
                    "bachelors_field_of_study": "string",
                    "bachelors_id": "file", 
                    "bachelors_result": "string", 
                    "bachelors_certificate": "file", 
                    "bachelors_passing_year": "2026", 

                    "masters_institute_name": "string", 
                    "masters_field_of_study": "string",
                    "masters_id": "file", 
                    "masters_result": "string", 
                    "masters_certificate": "file", 
                    "masters_passing_year": "2026",

                    "current_education_level": "string", 
                    "reason_for_update": "string",
                    "is_approved": False,
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['ADMIN', 'TUTOR'])
    def update(self, request, *args, **kwargs):
        data = request.data
        instance = self.model_class.objects.filter(id=kwargs['id']).first()
        if not instance:
            return Response({'message': 'Tutor Education does not exists'}, status=status.HTTP_400_BAD_REQUEST)
        
         # Reason for update required for Tutor Education
        if request.user.user_role == USER_ROLES[2][0] and not data.get('reason_for_update'):
                return Response({'message': 'Please provide a reason for your update.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(instance=instance, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Tutor Education updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(
                page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, *args, **kwargs):
        queryset = self.queryset
        obj = queryset.filter(id=kwargs['id']).first()
        if not obj:
            return Response({'message': 'Tutor Education does not exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)


