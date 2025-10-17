from django.db import models
from django.contrib.auth.models import User

class Tarea(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tareas')
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fecha_vence = models.DateField()
    estado = models.BooleanField(default=False)  # False = pendiente, True = completada

    def __str__(self):
        return self.titulo
