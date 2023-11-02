from django.urls import include, path
from . import views

urlpatterns = [
    path('files/', views.UserFileListCreateView.as_view(), name='files'),
    path('files/upload/', views.UserFileUploadView.as_view(), name='upload',)
]