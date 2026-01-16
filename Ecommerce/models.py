from django.db import models

# Create your models here.


class CustomerModel(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField()
    address=models.TextField()
    phone=models.CharField(max_length=15)
    # product_id = models.ForeignKey('Product', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    def __str__(self):
        return self.name


class Order(models.Model):
    customer= models.ForeignKey(CustomerModel,on_delete=models.CASCADE , related_name="orders")
    address=models.TextField()
    total_price=models.DecimalField(max_digits=10, decimal_places=2)
    is_paid=models.BooleanField(default=False)
    created_at=models.DateField(auto_now_add=True)
    def __str__(self):
        return f"Order #{self.id} - {self.customer.name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
      return f"{self.product.name} x {self.quantity}"





