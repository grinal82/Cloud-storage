from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework import generics
from files_api.serializers import UserFileUploadSerializer, UserFileSerializer
from . models import UserFile


class UserFileUploadView(APIView):
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
    parser_classes = [FormParser, MultiPartParser]
    
    def post(self, request):
        serializer = UserFileUploadSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            file = serializer.validated_data['file']
            comment = serializer.validated_data['comment']
            user_file = UserFile(user=user, file=file, name=file.name, comment=comment)
            user_file.save()
            return Response({'message': 'File uploaded successfully'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserFileListCreateView(generics.ListCreateAPIView):
    serializer_class = UserFileSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return UserFile.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)