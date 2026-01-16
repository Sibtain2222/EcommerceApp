from django.contrib import admin
from django.urls import path , include
from Ecommerce import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView




urlpatterns = [
    path('data/', views.Data.as_view(), name='data'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('Customer_data/' , views.CustomerAPIView.as_view() , name='customer_data'),
    path('create-order/', views.create_order),
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('0000/' ,views.ListUsers.as_view()  ,name='listofuser' ),
    path('import_products/' ,views.import_products)
]

