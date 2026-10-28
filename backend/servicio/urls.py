from django.contrib import admin
from django.urls import path
from productos import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/producto/', views.producto_lista, name='producto_lista'),
]
