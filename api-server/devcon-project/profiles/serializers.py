from rest_framework import serializers
from django.conf import settings
from rest_framework.reverse import reverse

from accounts.serializers import User
from .models import Education, Experience, Profile


class ExperienceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Experience
        fields = (
            'id',
            'url',
            'profile',
            'title',
            'company',
            'location',
            'from_date',
            'to_date',
            'current',
            'description'
        )

class EducationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Education
        fields = (
            'id',
            'url',
            'profile',
            'school',
            'degree',
            'fieldofstudy',
            'from_date',
            'to_date',
            'current',
            'description'
        )



class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    experiences = serializers.SerializerMethodField(read_only=True)
    education = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Profile
        fields = (
            'id',
         	'url',
            'user',
            'handle',
            'company',
            'website',
            'location',
            'skills',
            'bio',
            'githubusername',
            'created',
            'experiences',
            'education',
            'youtube',
            'twitter',
            'facebook',
            'linkedin',
            'instagram'
        )

    def get_experiences(self, obj):
        qs = obj.experience_set.all()
        return ExperienceSerializer(qs, many=True, context={'request': self.context['request']}).data

    def get_education(self, obj):
        qs = obj.education_set.all()
        return EducationSerializer(qs, many=True, context={'request': self.context['request']}).data

    def validate_user(self, value):
        user = User.objects.get(id=value.id)
        if user is not None and not user.is_active:
            raise serializers.ValidationError('User is not active')
        return value

    def validate(self, value):
	    handle = Profile.objects.filter(
	        handle=value['handle']).exclude(user=value['user'])
	    if handle:
		    raise serializers.ValidationError('Handle already exists')
	    return value

