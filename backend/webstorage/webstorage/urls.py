from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user_api.urls')),
    path('api/user/', include('files_api.urls'))
]
