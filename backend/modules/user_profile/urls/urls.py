from django.urls import path, include
from rest_framework.routers import DefaultRouter
from modules.user_profile.views.views import *

router = DefaultRouter()
router.register('student-profile', StudentProfileViewSet, basename='student_profile')
router.register('tutor-profile', TutorProfileViewSet, basename='tutor_profile')
router.register('tutor-education', TutorEducationViewSet, basename='tutor_education')

urlpatterns = [
                  path(r'', include(router.urls)),
              ] 