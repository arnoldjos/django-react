from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.utils import timezone
import datetime

from .settings.helpers import letters_and_num_only, letters_only
from .models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER
expires_delta = api_settings.JWT_REFRESH_EXPIRATION_DELTA

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'url', 'username', 'email', 'avatar',
		          'first_name', 'last_name', 'is_active')
 

class UserRegisterSerializer(serializers.ModelSerializer):
	password = serializers.CharField(
		style={'input_type': 'password'}, write_only=True)
	password2 = serializers.CharField(
		style={'input_type': 'password'}, write_only=True)
	token = serializers.SerializerMethodField(read_only=True)
	expires = serializers.SerializerMethodField(read_only=True)
	message = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = User
		fields = [
			'username',
			'email',
			'first_name',
			'last_name',
			'password',
			'password2',
			'token',
			'expires',
			'message'
		]

	def get_token(self, obj):
		user = obj
		payload = jwt_payload_handler(user)
		token = jwt_encode_handler(payload)
		return token

	def get_expires(self, obj):
		return timezone.now() + expires_delta - datetime.timedelta(seconds=300)

	def get_message(self, obj):
		return "Thank you for registering. Please verify your email before continuing."

	def validate_email(self, value):
		if value == '':
			raise serializers.ValidationError('This field may not be empty')
		qs = User.objects.filter(email__iexact=value)
		if qs.exists():
			raise serializers.ValidationError('User with this email already exists')
			
		return value

	def validate_first_name(self, value):
		if not letters_only(value):
			raise serializers.ValidationError('Only letters are allowed')
		if len(value) == 0 or value is None or value == '':
			raise serializers.ValidationError('First Name is required')
		return value

	def validate_last_name(self, value):
		if not letters_only(value):
			raise serializers.ValidationError('Only letters are allowed')
		if len(value) == 0 or value is None or value == '':
			raise serializers.ValidationError('Last Name is required')
		return value

	def validate_username(self, value):
		qs = User.objects.filter(username__iexact=value)
		if qs.exists():
			raise serializers.ValidationError('User with this username already exists')
		return value

	def validate(self, data):
		pw = data.get('password')
		pw2 = data.pop('password2')
		if pw != pw2:
			raise serializers.ValidationError('Passwords must match.')
		return data

	# def create(self, validated_data):
	# 	user_obj = User(username=validated_data.get(
	# 		'username'), email=validated_data.get('email'), firstname=validated_data.get('first_name'), last_name=validated_data)
	# 	user_obj.set_password(validated_data.get('password'))
	# 	user_obj.is_active = True
	# 	user_obj.save()
	# 	return user_obj
