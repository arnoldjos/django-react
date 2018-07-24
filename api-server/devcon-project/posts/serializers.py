from rest_framework import serializers

from accounts.serializers import User
from .models import Post, Comment, Like


class PostSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Post
		fields = ('id', 'user', 'text', 'url')

	def validate_user(self, value):
		user = User.objects.get(id=value.id)
		if user is not None and not user.is_active:
			raise serializers.ValidationError('User is not active')
		return value



class CommentSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Comment
		fields = ('id', 'user', 'post', 'text', 'url')

	def validate_user(self, value):
		user = User.objects.get(id=value.id)
		if user is not None and not user.is_active:
			raise serializers.ValidationError('User is not active')
		return value

class LikeSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Like
		fields = ('id', 'user', 'post', 'url')

	def validate_user(self, value):
		user = User.objects.get(id=value.id)
		if user is not None and not user.is_active:
			raise serializers.ValidationError('User is not active')
		return value

	def validate(self, data):
		print(data)
		liked = Like.objects.filter(user=data['user'].id).filter(post=data['post'].id)
		if liked:
			raise serializers.ValidationError('User has already liked the post')
		return data

