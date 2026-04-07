from django.urls import path
from . import views

urlpatterns = [
    path('', views.my_bookings, name='my-bookings'),
    path('create/', views.create_booking, name='create-booking'),
    path('<int:pk>/status/', views.update_booking_status, name='update-booking-status'),
]