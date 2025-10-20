from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


@api_view(['POST'])
def login(request): 
    # Buscar usuario por correo electrónico
    user = get_object_or_404(User, email=request.data.get('email'))
    
    # Validar contraseña
    if not user.check_password(request.data.get('password')):
        return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Obtener o crear token de autenticación para el usuario
    token, created = Token.objects.get_or_create(user=user)
    # Serializar datos del usuario para enviarlos como respuesta
    serializer = UserSerializer(instance=user)
    
    # Retornar token + información del usuario
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def registrer(request):
    # Serializar datos enviados por el cliente
    serializer = UserSerializer(data=request.data)
    
    # Validar datos del formulario
    if serializer.is_valid():
        serializer.save()
        
        # Buscar el usuario recién creado para establecer la contraseña correctamente
        user = User.objects.get(username=serializer.validated_data['username'])
        user.set_password(serializer.validated_data['password'])
        user.save()
        
        # Crear token de autenticación para el nuevo usuario    
        token = Token.objects.create(user=user)
        
          # usuario actualizado (ya con contraseña encriptada)
        user_serializer = UserSerializer(user)
        
        return Response({'token': token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
     # Usuario autenticado mediante token
    user = request.user
    serializer = UserSerializer(instance=user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Cierra la sesión del usuario eliminando su token actual.
    """
    try:
        # Eliminar el token actual del usuario autenticado
        request.user.auth_token.delete()
        return Response({'message': 'Sesión cerrada correctamente'}, status=status.HTTP_200_OK)
    except Exception as e:
        # Error al intentar cerrar sesión (por ejemplo, token no encontrado)
        return Response({'error': 'No se pudo cerrar la sesión'}, status=status.HTTP_400_BAD_REQUEST)



