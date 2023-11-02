from django.db import models
from django.contrib.auth import get_user_model
import os

Users = get_user_model()

def user_directory_path(instance, filename):
    # Формируем путь для сохранения файла в папку конкретного пользователя
    return f'user_storage/user_{instance.user.id}/{filename}'

class UserFile(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    file = models.FileField(upload_to=user_directory_path)
    name = models.CharField(max_length=255)
    comment = models.TextField(blank=True, null=True)
    upload_date = models.DateTimeField(auto_now_add=True)
    last_download_date = models.DateTimeField(auto_now=True)


    def __str__(self):
        return (self.user, self.name, self.comment, self.upload_date, self.last_download_date)