
from django.urls import path
from . import views

urlpatterns = [
    path('tareas/', views.listar_tareas, name='listar_tareas'),
    path('tareas/crear/', views.crear_tarea, name='crear_tarea'),
    path('tareas/editar/<int:id>/', views.editar_tarea, name='editar_tarea'),
    path('tareas/eliminar/<int:id>/', views.eliminar_tarea, name='eliminar_tarea'),
]

