from django.db import models

class Complaint(models.Model):
    passenger_id        = models.CharField(max_length=20)
    complaint_type      = models.CharField(max_length=100)
    complaint_description = models.TextField()
    complaint_id        = models.IntegerField()
    train_type          = models.CharField(max_length=100)
    severity_level      = models.CharField(max_length=50)

    def __str__(self):
        return f"Complaint {self.complaint_id} from passenger {self.passenger_id}"
    

class QueryResponse(models.Model):
    external_id     =  models.IntegerField(unique=True)
    user_query      = models.TextField()
    category        = models.CharField(max_length=100)
    subcategory    = models.CharField(max_length=100)
    suggested_response = models.TextField()

    def __str__(self):
        return f"{self.external_id}: {self.category} / {self.sub_category}"



# Create your models here.
