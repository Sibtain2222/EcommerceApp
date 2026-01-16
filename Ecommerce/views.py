from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import CustomerdataSerializer
from rest_framework import status
from .models import CustomerModel , Order, OrderItem , Product
from rest_framework import generics
from .serializer import UserSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny , IsAdminUser
from rest_framework import request
from rest_framework.generics import ListCreateAPIView



# Create your views here.


class RegisterUser(generics.CreateAPIView ):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]



class ListUsers(generics.ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CustomerAPIView(generics.ListCreateAPIView):
    queryset = CustomerModel.objects.all()
    serializer_class = CustomerdataSerializer

    # def perform_create(self, serializer):
    #     serializer.save(created_by=self.request.user)

    
        
    


# url='https://fakestoreapi.com/products'
url='https://api.escuelajs.co/api/v1/products'

class Data(APIView):
    
    def get(self, request):
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            return Response(data)
        except requests.exceptions.RequestException as e:
            return Response({'error': 'Failed to fetch data from external API', 'details': (e)})
      
    def post(self, request):
        response = requests.get(url)
        data = response.json()
        return Response(data)




from .models import Product

@api_view(['POST'])
def import_products(request):
    import requests

    url = 'https://api.escuelajs.co/api/v1/products'
    response = requests.get(url)
    if response.status_code != 200:
        return Response({"error": "Failed to fetch products"}, status=400)

    data = response.json()
    created = 0
    for item in data:
        # Avoid duplicates
        if not Product.objects.filter(id=item['id']).exists():
            Product.objects.create(
                id=item['id'],  # optional, to match API ID
                name=item['title'],
                price=item['price'],
                stock=10  # default stock
            )
            created += 1

    return Response({"message": f"{created} products imported"}, status=201)

@api_view(['POST'])
def create_order(request):
    try:
        customer_id = request.data.get('customer_id')
        items = request.data.get('items')
        address = request.data.get('address')

        if not customer_id or not items:
            return Response(
                {"error": "customer_id and items are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        customer = CustomerModel.objects.get(id=customer_id)

        order = Order.objects.create(
            customer=customer,
            address=address or customer.address,
            total_price=0
        )

        total = 0
        for item in items:
            product_id = int(item['product_id']) 
            qty = int(item['quantity'])
            product = Product.objects.get(id=product_id)


            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=qty,
                price=product.price
            )

            total += product.price * qty

        order.total_price = total
        order.save()
        print("ITEM RECEIVED:", item)
        print("PRODUCT ID TYPE:", type(item['product_id']))


        return Response(
            {
                "message": "Order created successfully",
                "order_id": order.id,
                "total_price": total
            },
            status=status.HTTP_201_CREATED
        )

    except CustomerModel.DoesNotExist:
        return Response(
            {"error": "Customer not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    except Exception as e:
        return Response(
            {"error": "Something went wrong", "details": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )







