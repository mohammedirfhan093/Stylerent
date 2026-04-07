from django.urls import path
from . import views

urlpatterns = [
    path('recommend/', views.ai_recommend, name='ai-recommend'),
    path('search/', views.ai_search, name='ai-search'),
]