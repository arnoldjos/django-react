from django.db import models
from django.conf import settings
# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    handle = models.CharField(max_length=500)
    company = models.CharField(max_length=500, null=True, default=None)
    website = models.CharField(max_length=500, null=True, default=None)
    location = models.TextField(null=True, default=None)
    skills = models.TextField()
    bio = models.TextField(null=True, default=None)
    githubusername = models.CharField(max_length=250, null=True, default=None)
    created = models.DateTimeField(auto_now_add=True)
    youtube = models.TextField(null=True, default=None)
    twitter = models.TextField(null=True, default=None)
    facebook = models.TextField(null=True, default=None)
    linkedin = models.TextField(null=True, default=None)
    instagram = models.TextField(null=True, default=None)

    def __str__(self):
        return self.handle
 
class Experience(models.Model):
	profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
	title = models.CharField(max_length=500)
	company = models.CharField(max_length=500)
	location = models.TextField(null=True, default=None)
	from_date = models.DateField()
	to_date = models.DateField(null=True, default=None)
	current = models.BooleanField(default=False)
	description = models.TextField(null=True, default=None)

	def __str__(self):
		return '{} - {}'.format(self.title, self.company)


class Education(models.Model):
	profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
	school = models.CharField(max_length=500)
	degree = models.CharField(max_length=500)
	fieldofstudy = models.CharField(max_length=500)
	from_date = models.DateField()
	to_date = models.DateField(null=True, default=None)
	current = models.BooleanField(default=False)
	description = models.TextField(null=True, default=None)

	def __str__(self):
		return '{} - {}'.format(self.school, self.degree)

