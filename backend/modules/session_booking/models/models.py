from django.db import models
from abstract.base_model import CustomModel
from modules.users.models.models import *
from external.choice_tuple import BOOKING_TYPE

# Create your models here.
class StudentProfile(CustomModel):
    user = models.ForeignKey()
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


class SessionBooking(CustomModel):

    student = models.ForeignKey(User, related_name='student_session_booking', on_delete=models.CASCADE, blank=True, null=True)
    booking_type = models.CharField(max_length=50, choices=BOOKING_TYPE)
    class_name = models.CharField(max_length=50)
    number_of_sessions = models.PositiveIntegerField(default=1)
    subject = models.CharField(max_length=100)
    preferred_completion_date = models.DateField(blank=True, null=True)
    preferred_timing = models.CharField(max_length=100, blank=True, null=True)
    preferred_days = models.CharField(max_length=100, blank=True, null=True)
    additional_requirement = models.TextField(blank=True, null=True)
    sessions_per_month = models.PositiveIntegerField(default=1, blank=True, null=True) # Only applicable for package tutoring. 
    tutor = models.CharField(max_length=100, blank=True, null=True)

   
    class Meta:
            db_table = 'session_booking'
            ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.booking_type if self.booking_type else ''} -- {self.student.user_id if self.student else ''}" 