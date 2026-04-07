from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name='product-list'),
    path('create/', views.product_create, name='product-create'),
    path('<int:pk>/', views.product_detail, name='product-detail'),
    path('<int:pk>/update/', views.product_update_delete, name='product-update-delete'),
]