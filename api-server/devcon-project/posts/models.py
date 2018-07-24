from django.db import models
from django.conf import settings
# Create your models here.


class Post(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	text = models.TextField()
	date = models.DateTimeField(auto_now=True) 

	def __str__(self):
		return '{} - {}'.format(self.id, self.text[:10])

class Like(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	post = models.ForeignKey(Post, on_delete=models.CASCADE)

	def __str__(self):
		return 'User: {} Post: {}'.format(self.user.id, self.post.id)



class Comment(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	text = models.TextField()
	date = models.DateTimeField(auto_now_add=True)



	def __str__(self):
		return 'User: {} Post: {}'.format(self.user.id, self.post.id)





