from django.db import models
from users.models import User

class Product(models.Model):
    CATEGORY_CHOICES = (
        ('saree', 'Saree'),
        ('lehenga', 'Lehenga'),
        ('suit', 'Suit'),
        ('gown', 'Gown'),
        ('jewellery', 'Jewellery'),
        ('other', 'Other'),
    )
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    size = models.CharField(max_length=10)
    price_per_day = models.DecimalField(max_digits=8, decimal_places=2)
    deposit = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title