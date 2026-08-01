from django.contrib.auth.models import PermissionsMixin, BaseUserManager, AbstractBaseUser
from django.db import models
from abstract.base_model import CustomModel
from external.choice_tuple import USER_ROLES, GENDER, COUNTRY, DISTRICT


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, first_name=None, last_name=None, email=None, password=None):
        if not email:
            raise ValueError('Email is required')
        if password is None:
            raise ValueError('Password is required')
        email = self.normalize_email(email) if email else None
        user = self.model(email=email)
        user = self.model(
            first_name=first_name if first_name else None,
            last_name=last_name if last_name else None,
            email=email,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, first_name=None, last_name=None):
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.user_role = USER_ROLES[0][0]
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, CustomModel, PermissionsMixin):
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    user_id = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True, choices=COUNTRY)
    district = models.CharField(max_length=100, blank=True, null=True, choices=DISTRICT)
    email = models.EmailField(blank=True, null=True, unique=True)
    password = models.CharField(max_length=128, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True, unique=True) 
    additional_phone_number = models.CharField(max_length=20, blank=True, null=True, unique=True) 
    address = models.TextField(blank=True, null=True) 
    profile_image = models.ImageField(upload_to='users/', blank=True, null=True)
    gender = models.CharField (max_length=50, blank=True, null=True, choices=GENDER)
    user_role = models.CharField(max_length=50, blank=True, null=True, choices=USER_ROLES)
    is_profile_completed = models.BooleanField(default=False)
    is_education_completed = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    two_factor = models.BooleanField(default=False)
    login_attempt = models.PositiveIntegerField(default=0, blank=True, null=True)

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    class Meta:
        db_table = 'user'
        ordering = ['-created_at']

    def full_name(self):
        return f"{self.first_name or ''} {self.last_name or ''}".strip()

    def __str__(self):
        name = self.full_name()
        return f"{name if name else ''} -- {self.email if self.email else ''} -- {self.user_role if self.user_role else ''}" 

