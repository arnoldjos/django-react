from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import ProfileView, ExperienceView, EducationView

router = routers.DefaultRouter()
router.register('profiles', ProfileView)
router.register('experiences', ExperienceView)
router.register('education', EducationView)


urlpatterns = [
    path('', include(router.urls))
]
