from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Tarea
from .serializers import TareaSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_tareas(request):
    # Solo tareas del usuario actual
    tareas = Tarea.objects.filter(user=request.user).order_by('-id')
    serializer = TareaSerializer(tareas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_tarea(request):
    serializer = TareaSerializer(data=request.data)
    if serializer.is_valid():
        # Asocia la tarea al usuario actual
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def editar_tarea(request, id):
    # Busca la tarea y se asegura de que pertenezca al usuario actual
    tarea = get_object_or_404(Tarea, id=id, user=request.user)
     # Se permite edición parcial con 'partial=True'
    serializer = TareaSerializer(instance=tarea, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_tarea(request, id):
    tarea = get_object_or_404(Tarea, id=id, user=request.user)
    # Elimina la tarea
    tarea.delete()
    return Response({'message': 'Tarea eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)

