from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Job, Communication, Resume
from .serializers import (
    JobSerializer, 
    CommunicationSerializer,
    ResumeSerializer
)

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class CommunicationViewSet(viewsets.ModelViewSet):
    queryset = Communication.objects.all()
    serializer_class = CommunicationSerializer

class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
