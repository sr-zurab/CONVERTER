# Представления для аутентификации и регистрации пользователей
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from gmu_converter.serializers.user_serializer import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

# Регистрация нового пользователя
class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({'user':{'id' : user.id,
                                     'username' : user.username,
                                     'email' : user.email,
                                     },
                             'refresh' : str(refresh),
                             'access' : str(refresh.access_token),
                             }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Получение информации о текущем пользователе
class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username' : user.username,
            'email' : user.email,
        })

# Кастомный сериализатор для JWT с русским сообщением об ошибке
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': 'Неверное имя пользователя или пароль.'
    }

# Кастомный view для получения JWT-токена
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer