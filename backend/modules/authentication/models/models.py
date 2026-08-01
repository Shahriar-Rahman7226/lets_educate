from django.db import models
from django.utils import timezone
from modules.users.models.models import User
from abstract.base_model import CustomModel
from external.choice_tuple import OTP_PURPOSE



# class OTP(CustomModel):
#     user = models.ForeignKey(User, related_name='otp_user', on_delete=models.CASCADE, blank=True, null=True)
#     otp_code = models.CharField(max_length=6, blank=True, null=True)
#     purpose = models.CharField(max_length=20, blank=True, null=True, choices=OTP_PURPOSE)
#     is_used = models.BooleanField(blank=True, null=True, default=False)
#     expires_at = models.DateTimeField(blank=True, null=True)

#     class Meta:
#         db_table = "otp"
#         ordering = ['-created_at']

#     def __str__(self):
#         return f"{self.user.email if self.user else ''} - {self.otp_code if self.otp_code else ''} - {self.purpose if self.purpose else ''}"

#     def is_expired(self):
#         if not self.expires_at:
#             return True
#         return timezone.now() > self.expires_at
