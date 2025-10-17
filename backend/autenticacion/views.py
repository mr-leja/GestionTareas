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
    user = get_object_or_404(User, email=request.data.get('email'))
    
    if not user.check_password(request.data.get('password')):
        return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def registrer(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
        user = User.objects.get(username=serializer.validated_data['username'])
        user.set_password(serializer.validated_data['password'])
        user.save()
        
        token = Token.objects.create(user=user)
        
          # 🔹 Volver a serializar el usuario (ya con todo actualizado)
        user_serializer = UserSerializer(user)
        
        return Response({'token': token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
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
        return Response({'error': 'No se pudo cerrar la sesión'}, status=status.HTTP_400_BAD_REQUEST)



