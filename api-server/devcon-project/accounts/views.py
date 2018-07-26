from rest_framework import viewsets, permissions, generics
from .serializers import UserSerializer, UserRegisterSerializer

from .models import User
from .permissions import AnonPermissionOnly

# Create your views here.


class UserView(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = (permissions.AllowAny,)


class RegisterUserView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserRegisterSerializer
	permission_classes = [AnonPermissionOnly]

	def get_serializer_context(self, *args, **kwargs):
		return {'request': self.request}


