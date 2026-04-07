from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Booking
from .serializers import BookingSerializer
from products.models import Product
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    product_id = request.data.get('product')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')
    try:
        product = Product.objects.get(pk=product_id, is_available=True)
    except Product.DoesNotExist:
        return Response({'error': 'Product not available'}, status=status.HTTP_404_NOT_FOUND)
    from datetime import datetime
    start = datetime.strptime(start_date, '%Y-%m-%d')
    end = datetime.strptime(end_date, '%Y-%m-%d')
    days = (end - start).days
    if days <= 0:
        return Response({'error': 'Invalid dates'}, status=status.HTTP_400_BAD_REQUEST)
    total_price = Decimal(str(product.price_per_day)) * days
    booking = Booking.objects.create(
        customer=request.user,
        product=product,
        start_date=start_date,
        end_date=end_date,
        total_price=total_price
    )
    serializer = BookingSerializer(booking)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    bookings = Booking.objects.filter(customer=request.user)
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_booking_status(request, pk):
    try:
        booking = Booking.objects.get(pk=pk)
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
    booking.status = request.data.get('status', booking.status)
    booking.save()
    serializer = BookingSerializer(booking)
    return Response(serializer.data)