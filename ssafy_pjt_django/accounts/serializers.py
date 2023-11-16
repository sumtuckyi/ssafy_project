from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter

class CustomRegisterSerializer(RegisterSerializer):
	first_name = serializers.CharField(max_length=150, allow_blank=True)
	last_name = serializers.CharField(max_length=150, allow_blank=True)

	def get_cleaned_data(self):
		return {
			'username': self.validated_data.get('username', ''),
			'password1': self.validated_data.get('password1', ''),
			'email': self.validated_data.get('email', ''),
			'first_name': self.validated_data.get('first_name', ''),
			'last_name': self.validated_data.get('last_name', ''),
		}
	
	def save(self, request):
		adapter = get_adapter()
		user = adapter.new_user(request)
		self.cleaned_data = self.get_cleaned_data()
		user = adapter.save_user(request, user, self, commit=False)
		user.save()
		self.custom_signup(request, user)
		# setup_user_email(request, user, [])
		return user