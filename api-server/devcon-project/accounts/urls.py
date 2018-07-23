from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import UserView, RegisterUserView

router = routers.DefaultRouter()
router.register('accounts', UserView)


urlpatterns = [
    path('accounts/register/', RegisterUserView.as_view()),
    path('accounts/login/', obtain_jwt_token),
    path('accounts/login/refresh/', obtain_jwt_token),
    path('', include(router.urls))
]


