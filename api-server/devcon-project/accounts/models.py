from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
	avatar = models.ImageField(
		upload_to='images/', height_field=None, width_field=None, max_length=100, null=True, blank=True)

	def __str__(self):
		return '{} - {}'.format(self.id, self.username)

