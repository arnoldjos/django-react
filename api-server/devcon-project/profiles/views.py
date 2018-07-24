from rest_framework import viewsets, permissions, generics

from .serializers import ProfileSerializer, EducationSerializer, ExperienceSerializer
from .models import Profile, Education, Experience

# Create your views here.

class ProfileView(viewsets.ModelViewSet):
	queryset = Profile.objects.all()
	serializer_class = ProfileSerializer


class EducationView(viewsets.ModelViewSet):
	queryset = Education.objects.all()
	serializer_class = EducationSerializer

	def get_serializer_context(self):
		return {'request': self.request}

class ExperienceView(viewsets.ModelViewSet):
	queryset = Experience.objects.all()
	serializer_class = ExperienceSerializer

	def get_serializer_context(self):
		return {'request': self.request}

	

