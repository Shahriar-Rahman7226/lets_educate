from rest_framework.serializers import *
from rest_framework import serializers
from ..models.models import *
from external.choice_tuple import CURRICULUM, CURRENT_EDUCATION_LEVEL


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class StudentProfileSerializer(ModelSerializer):
    curriculum = serializers.ChoiceField(choices=CURRICULUM)
     
    class Meta:
        model = StudentProfile 
        fields = ['user', 'institute_name', 'institute_id', 'curriculum', 'overview', 'is_approved', 'reason_for_update']
        

class StudentProfileListSerializer(ModelSerializer):

    class Meta:
        model = StudentProfile
        exclude = exclude_list


class TutorProfileSerializer(ModelSerializer):
     
    class Meta:
        model = TutorProfile 
        fields = ['user', 'govt_id', 'overview', 'tutoring_experience', 'facebook', 
                  'linkedin', 'class_count', 'rating', 'is_approved', 'reason_for_update']


class TutorProfileListSerializer(ModelSerializer):

    class Meta:
        model = TutorProfile
        exclude = exclude_list


class TutorEducationSerializer(ModelSerializer):
     secondary_curriculum = serializers.ChoiceField(choices=CURRICULUM)
     higher_secondary_curriculum = serializers.ChoiceField(choices=CURRICULUM)
     current_education_level = serializers.ChoiceField(choices=CURRENT_EDUCATION_LEVEL)

     class Meta:
        model = TutorEducation 
        fields = ['tutor_profile', 'secondary_curriculum', 'secondary_institute_name', 'secondary_result', 'secondary_certificate', 
                  'secondary_passing_year', 'higher_secondary_curriculum', 'higher_secondary_institute_name', 'higher_secondary_result', 'higher_secondary_certificate', 
                  'higher_secondary_passing_year', 'bachelors_institute_name', 'bachelors_field_of_study', 'bachelors_id', 'bachelors_result', 'bachelors_certificate', 
                  'bachelors_passing_year', 'masters_institute_name', 'masters_field_of_study', 'masters_id', 'masters_result', 'masters_certificate', 'masters_passing_year', 
                  'current_education_level', 'is_approved', 'reason_for_update']
        

class TutorEducationListSerializer(ModelSerializer):

    class Meta:
        model = TutorEducation
        exclude = exclude_list