from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, CommunicationViewSet, ResumeViewSet

router = DefaultRouter()
router.register('jobs', JobViewSet, basename='jobs')
router.register('communications', CommunicationViewSet, basename='communications')
router.register('resumes', ResumeViewSet, basename='resumes')

urlpatterns = [
    path('', include(router.urls)),
]
