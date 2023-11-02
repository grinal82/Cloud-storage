import logging
from django.contrib.auth import authenticate, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status

from .serializers import UserResiterSerializer, UserSerializer, UserLoginSerializer

from .validations import custom_validation, validate_email, validate_password


# Define loggers
logger_login = logging.getLogger('webstorage.views.UserLogin')
logger_logout = logging.getLogger('webstorage.views.UserLogout')
logger_user = logging.getLogger('wabstorage.views.User')


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/register/',
        '/api/login/',
        '/api/logout/',
        '/api/user/',
        '/api/user/upload/',
    ]

    return Response(routes)


class UserRegister(APIView):
    logger = logging.getLogger('user_api.views.UserRegister')
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        self.logger.debug('User registration received: %s', request.data)
        clean_data = custom_validation(request.data)
        serializer = UserResiterSerializer(data=clean_data)

        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            self.logger.info('User created: %s', serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        self.logger.error('User not created: %s', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        user = serializer.save()


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        try:
            data = request.data
            assert validate_email(data)
            assert validate_password(data)
            serializer = UserLoginSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.check_user(data)
                login(request, user)
                user_serializer = UserSerializer(user)
                logger_login.info('User login successful.')
                return Response(user_serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger_login.error('User login failed: %s', str(e))
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    authentication_classes = (SessionAuthentication,)
    def post(self, request):
        try:
            logout(request)
            logger_logout.info('User logout successful.')
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            logger_logout.error('User logout failed: %s', str(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)


class User(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            logger_user.info('User data retrieved successfully.')
            return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            logger_user.error('Failed to retrieve user data: %s', str(e))
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
