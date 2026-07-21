from django.urls import path, include
from rest_framework.routers import DefaultRouter
from modules.users.views.views import *

router = DefaultRouter()
router.register('user-registration', UserResgistrationViewSet, basename='user_registration')
router.register('user-update', UserUpdateAndListViewSet, basename='user_update')

urlpatterns = [
    path(r'', include(router.urls)),
    path('create-admin/', UserResgistrationViewSet.as_view({'post': 'create_admin'})),
    path('create-tutor/', UserResgistrationViewSet.as_view({'post': 'create_tutor'})),
    path('create-student/', UserResgistrationViewSet.as_view({'post': 'create_student'}))
]
