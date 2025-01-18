from rest_framework import serializers
from .models import Job, Communication, Resume

class CommunicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Communication
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    communications = CommunicationSerializer(many=True, read_only=True)
    tailored_resumes = ResumeSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = '__all__'
