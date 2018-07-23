from rest_framework import viewsets, permissions, generics

from .serializers import PostSerializer, CommentSerializer, LikeSerializer
from .models import Post, Comment, Like

# Create your views here.


class PostView(viewsets.ModelViewSet):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = (permissions.AllowAny,)


class CommentView(viewsets.ModelViewSet):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	permission_classes = (permissions.AllowAny,)


class LikeView(viewsets.ModelViewSet):
	queryset = Like.objects.all()
	serializer_class = LikeSerializer
	permission_classes = (permissions.AllowAny,)
