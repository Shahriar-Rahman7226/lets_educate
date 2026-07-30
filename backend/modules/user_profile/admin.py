from django.contrib import admin
from .models.models import *

# Register your models here.
admin.site.register(StudentProfile)
admin.site.register(TutorProfile)
admin.site.register(TutorEducation)
