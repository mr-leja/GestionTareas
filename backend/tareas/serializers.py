from rest_framework import serializers
from .models import Tarea

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        # Modelo asociado al serializador
        model = Tarea
        fields = ['id', 'user', 'titulo', 'descripcion', 'fecha_vence', 'estado']
        extra_kwargs = {'user': {'read_only': True}}  # El campo 'user' no se puede modificar desde la API, se asigna automáticamente desde la vista
