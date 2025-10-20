from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
     # Se hace obligatorio el campo 'email'
    email = serializers.EmailField(required=True)  

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},   # 🔒 Oculta la contraseña en la salida JSON (solo se permite enviarla)

        }
        
        #Valida que el correo electrónico no esté registrado previamente
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value
        