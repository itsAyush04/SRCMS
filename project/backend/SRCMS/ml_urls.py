from django.urls import path
from .ml_views import classify_complaint

urlpatterns = [
    path('classify/', classify_complaint, name='classify_complaint'),
]
