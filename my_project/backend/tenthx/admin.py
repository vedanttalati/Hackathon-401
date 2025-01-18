from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Job, Communication, Resume

admin.site.register(Job)
admin.site.register(Communication)
admin.site.register(Resume)