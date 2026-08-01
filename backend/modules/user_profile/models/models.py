from django.db import models
from abstract.base_model import CustomModel
from modules.users.models.models import *
from external.choice_tuple import CURRICULUM, CURRENT_EDUCATION_LEVEL

# Create your models here.
class StudentProfile(CustomModel):
    user = models.ForeignKey(User, related_name='student_user', on_delete=models.CASCADE, blank=True, null=True)
    institute_name = models.CharField(max_length=128, blank=True, null=True)
    institute_id = models.FileField(upload_to='student_institute_id/', blank=True, null=True)
    curriculum = models.CharField(max_length=50, blank=True, null=True, choices=CURRICULUM)
    overview = models.TextField(blank=True, null=True) 
    is_approved = models.BooleanField(blank=True, null=True, default=False)
    reason_for_update = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'student_profile'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.full_name if self.user else ''} -- {self.user.user_id if self.user else ''}" 
    

class TutorProfile(CustomModel):
    user = models.ForeignKey(User, related_name='tutor_user', on_delete=models.CASCADE, blank=True, null=True)
    govt_id = models.FileField(upload_to='tutor_govt_id/', blank=True, null=True)
    overview = models.TextField(blank=True, null=True) 
    tutoring_experience = models.CharField(max_length=128, blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    class_count = models.IntegerField(default=0)
    rating = models.IntegerField(blank=True, null=True)
    is_approved = models.BooleanField(blank=True, null=True, default=False)
    reason_for_update = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'tutor_profile'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.full_name if self.user else ''} -- {self.user.user_id if self.user else ''}"


class TutorEducation(CustomModel):
    tutor_profile = models.ForeignKey(TutorProfile, related_name='tutor_education_profile', on_delete=models.CASCADE, blank=True, null=True)

    secondary_curriculum = models.CharField(max_length=50, blank=True, null=True, choices=CURRICULUM)
    secondary_institute_name = models.CharField(max_length=128, blank=True, null=True)
    secondary_result = models.CharField(max_length=128, blank=True, null=True)
    secondary_certificate = models.FileField(upload_to='tutor_secondary_certificate/', blank=True, null=True)
    secondary_passing_year = models.PositiveIntegerField(blank=True, null=True)
    
    higher_secondary_curriculum = models.CharField(max_length=50, blank=True, null=True, choices=CURRICULUM)
    higher_secondary_institute_name = models.CharField(max_length=128, blank=True, null=True)
    higher_secondary_result = models.CharField(max_length=128, blank=True, null=True)
    higher_secondary_certificate = models.FileField(upload_to='tutor_higher_secondary_certificate/', blank=True, null=True)
    higher_secondary_passing_year = models.PositiveIntegerField(blank=True, null=True)

    bachelors_institute_name = models.CharField(max_length=128, blank=True, null=True)
    bachelors_field_of_study = models.CharField(max_length=255, blank=True, null=True)
    bachelors_id = models.FileField(upload_to='tutor_bachelors_id/', blank=True, null=True)
    bachelors_result = models.CharField(max_length=128, blank=True, null=True)
    bachelors_certificate = models.FileField(upload_to='tutor_bachelors_certificate/', blank=True, null=True)
    bachelors_passing_year = models.PositiveIntegerField(blank=True, null=True)

    masters_institute_name = models.CharField(max_length=128, blank=True, null=True)
    masters_field_of_study = models.CharField(max_length=255, blank=True, null=True)
    masters_id = models.FileField(upload_to='tutor_masters_id/', blank=True, null=True)
    masters_result = models.CharField(max_length=128, blank=True, null=True)
    masters_certificate = models.FileField(upload_to='tutor_masters_certificate/', blank=True, null=True)
    masters_passing_year = models.PositiveIntegerField(blank=True, null=True)

    current_education_level = models.CharField(max_length=128, blank=True, null=True, choices=CURRENT_EDUCATION_LEVEL)
    is_approved = models.BooleanField(blank=True, null=True, default=False)
    reason_for_update = models.TextField(blank=True, null=True)


    class Meta:
        db_table = 'tutor_education'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.tutor_profile.user.full_name() if self.tutor_profile else ''} -- {self.tutor_profile.user.user_id if self.tutor_profile else ''}" 


