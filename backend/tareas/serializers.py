from rest_framework import serializers
from .models import Tarea

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ['id', 'user', 'titulo', 'descripcion', 'fecha_vence', 'estado']
        extra_kwargs = {'user': {'read_only': True}}  # se asigna automáticamente
