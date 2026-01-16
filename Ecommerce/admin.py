from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # optional: don't show empty rows
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'total_price', 'is_paid', 'created_at')
    inlines = [OrderItemInline]


admin.site.register(Order, OrderAdmin)
