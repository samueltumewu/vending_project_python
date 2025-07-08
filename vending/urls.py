from django.urls import path
from . import views

urlpatterns = [
    path('insert/', views.insert_money, name='insert_money'),
    path('buy/', views.buy_drink, name='buy_drink'),
]
