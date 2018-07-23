from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import PostView, CommentView, LikeView

router = routers.DefaultRouter()
router.register('posts', PostView)
router.register('comments', CommentView)
router.register('likes', LikeView)


urlpatterns = [
    path('', include(router.urls))
]
