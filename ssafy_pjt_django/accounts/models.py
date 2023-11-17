from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    my_products = models.JSONField(null=True)
    liked_products = models.JSONField(null=True)