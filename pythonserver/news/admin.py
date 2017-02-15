from django.contrib import admin
from .models import User,News,Config,Comments,Category
# Register your models here.
admin.site.register([User,News,Config,Comments,Category])

