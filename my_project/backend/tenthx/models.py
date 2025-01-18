from django.db import models

# Create your models here.

class Communication(models.Model):
    communication = models.CharField(max_length=1000)

class Job(models.Model):
    job_ID = models.IntegerField(primary_key=True)
    company_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    description = models.CharField(max_length=2000)
    date_applied = models.DateField()
    status = models.CharField()
    communications = models.ForeignKey(Communication, on_delete=models.CASCADE)
    location = models.CharField(max_length=30)

    status_choices = [
        ('applied', 'Applied'),
        ('interviewing', 'Interviewing'),
        ('offered', 'Offered'),
        ('rejected', 'Rejected')
    ]

    job_status = models.CharField(
        max_length = 15,
        choices=status_choices,
        default='applied'
    )
    
class Resume(models.Model):
    is_master = models.BooleanField()
    tailored_description = models.CharField(max_length=100) # describe what the resume is tailored for
    resume_storage_id = models.IntegerField() # id for the .docx file in firebase storage
