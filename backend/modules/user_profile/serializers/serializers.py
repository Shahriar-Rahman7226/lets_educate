from rest_framework.serializers import *
from modules.user_profile.models.models import *


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class StudentProfileSerializer(ModelSerializer):
     
    class Meta:
        model = StudentProfile 
        fields = ['user', 'institute', 'institute_id', 'curriculum', 'curriculum_level', 
                    'overview', 'guardian_name', 'relation_with_guardian', 'guardian_number', 
                  'guardian_email', 'is_approved', 'reason_for_update']
        

class StudentProfileListSerializer(ModelSerializer):

    class Meta:
        model = StudentProfile
        exclude = exclude_list


class TutorProfileSerializer(ModelSerializer):
     
    class Meta:
        model = TutorProfile 
        fields = ['user', 'govt_id', 'overview', 'tutoring_experience', 'facebook', 
                  'linkedin', 'resume', 'class_count', 'rating', 'is_approved', 'reason_for_update']


class TutorProfileListSerializer(ModelSerializer):

    class Meta:
        model = TutorProfile
        exclude = exclude_list


class TutorEducationSerializer(ModelSerializer):

     class Meta:
        model = TutorEducation 
        fields = ['tutor_profile', 'secondary_institute_name', 'secondary_degree', 'secondary_id', 'secondary_result', 'secondary_certificate', 
                  'secondary_passing_year', 'secondary_curriculum', 'currently_at_secondary', 'higher_secondary_institute_name', 'higher_secondary_degree',
                  'higher_secondary_id', 'higher_secondary_result', 'higher_secondary_certificate', 'higher_secondary_passing_year', 'higher_secondary_curriculum',
                  'currently_at_higher_secondary', 'bachelors_institute_name', 'bachelors_id', 'bachelors_result', 'bachelors_certificate', 'bachelors_passing_year', 
                  'currently_at_bachelors', 'is_approved', 'reason_for_update']
        

class TutorEducationListSerializer(ModelSerializer):

    class Meta:
        model = TutorEducation
        exclude = exclude_list