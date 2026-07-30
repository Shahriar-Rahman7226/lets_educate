from django.db import models
from abstract.base_model import CustomModel
from modules.users.models.models import *

# Create your models here.
class StudentProfile(CustomModel):
    user = models.ForeignKey(User, related_name='student_user', on_delete=models.CASCADE, blank=True, null=True)
    institute = models.CharField(max_length=128, blank=True, null=True)
    institute_id = models.ImageField(upload_to='student_institute_id/', blank=True, null=True)
    curriculum = models.CharField(max_length=128, blank=True, null=True)
    curriculum_level = models.CharField(max_length=128, blank=True, null=True)
    overview = models.TextField(blank=True, null=True) 
    guardian_name = models.CharField(max_length=100, blank=True, null=True)
    relation_with_guardian = models.CharField(max_length=50, blank=True, null=True)
    guardian_number = models.CharField(max_length=20, blank=True, null=True)
    guardian_email = models.EmailField(blank=True, null=True)
    is_approved = models.BooleanField(blank=True, null=True, default=False)
    reason_for_update = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'student_profile'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.full_name if self.user else ''} -- {self.user.user_id if self.user else ''}" 
    

class TutorProfile(CustomModel):
    user = models.ForeignKey(User, related_name='tutor_user', on_delete=models.CASCADE, blank=True, null=True)
    govt_id = models.ImageField(upload_to='tutor_govt_id/', blank=True, null=True)
    overview = models.TextField(blank=True, null=True) 
    tutoring_experience = models.CharField(max_length=128, blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    additional_phone_number = models.CharField(max_length=20, blank=True, null=True, unique=True)
    resume = models.FileField(upload_to='tutor_resume/', blank=True, null=True)
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

    secondary_institute_name = models.CharField(max_length=128, blank=True, null=True)
    secondary_degree = models.CharField(max_length=50, blank=True, null=True)
    secondary_id = models.ImageField(upload_to='tutor_secondary_id/', blank=True, null=True)
    secondary_result = models.CharField(max_length=128, blank=True, null=True)
    secondary_certificate = models.FileField(upload_to='tutor_secondary_certificate/', blank=True, null=True)
    secondary_passing_year = models.DateField(blank=True, null=True)
    secondary_curriculum = models.CharField(max_length=50, blank=True, null=True)
    currently_at_secondary = models.BooleanField(blank=True, null=True, default=False)

    higher_secondary_institute_name = models.CharField(max_length=128, blank=True, null=True)
    higher_secondary_degree = models.CharField(max_length=50, blank=True, null=True)
    higher_secondary_id = models.ImageField(upload_to='tutor_higher_secondary_id/', blank=True, null=True)
    higher_secondary_result = models.CharField(max_length=128, blank=True, null=True)
    higher_secondary_certificate = models.FileField(upload_to='tutor_higher_secondary_certificate/', blank=True, null=True)
    higher_secondary_passing_year = models.DateField(blank=True, null=True)
    higher_secondary_curriculum = models.CharField(max_length=50, blank=True, null=True)
    currently_at_higher_secondary = models.BooleanField(blank=True, null=True, default=False)

    bachelors_institute_name = models.CharField(max_length=128, blank=True, null=True)
    bachelors_id = models.ImageField(upload_to='tutor_bachelors_id/', blank=True, null=True)
    bachelors_result = models.CharField(max_length=128, blank=True, null=True)
    bachelors_certificate = models.FileField(upload_to='tutor_bachelors_certificate/', blank=True, null=True)
    bachelors_passing_year = models.DateField(blank=True, null=True)
    currently_at_bachelors = models.BooleanField(blank=True, null=True, default=False)
    is_approved = models.BooleanField(blank=True, null=True, default=False)
    reason_for_update = models.TextField(blank=True, null=True)


    class Meta:
        db_table = 'tutor_education'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.full_name() if self.user else ''} -- {self.tutor_profile.user.user_id if self.tutor_profile else ''}" 


