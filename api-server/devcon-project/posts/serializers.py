from rest_framework import serializers

from accounts.models import User
from .models import Post, Comment, Like


class PostSerializer(serializers.HyperlinkedModelSerializer):
	user = User.objects.filter(id=1)
	class Meta:
		model = Post
		fields = ('id', 'user', 'text')


class CommentSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Comment
		fields = ('id', 'user', 'post', 'text')
 

class LikeSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Like
		fields = ('id', 'user', 'post')


