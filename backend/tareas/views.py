from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Tarea
from .serializers import TareaSerializer
from django.shortcuts import get_object_or_404

# ✅ Listar todas las tareas del usuario autenticado
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_tareas(request):
    tareas = Tarea.objects.filter(user=request.user).order_by('-id')
    serializer = TareaSerializer(tareas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# ✅ Crear una nueva tarea
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_tarea(request):
    serializer = TareaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Editar una tarea existente
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def editar_tarea(request, id):
    tarea = get_object_or_404(Tarea, id=id, user=request.user)
    serializer = TareaSerializer(instance=tarea, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Eliminar una tarea
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_tarea(request, id):
    tarea = get_object_or_404(Tarea, id=id, user=request.user)
    tarea.delete()
    return Response({'message': 'Tarea eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)

