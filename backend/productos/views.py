import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Producto


@csrf_exempt
def producto_lista(request):
    """GET: lista los productos. POST: registra un nuevo producto."""
    if request.method == "POST":
        try:
            datos = json.loads(request.body)
            producto = Producto.objects.create(
                descripcion=datos["descripcion"],
                precio=datos["precio"],
            )
        except (ValueError, KeyError):
            return JsonResponse({"error": "Datos invalidos"}, status=400)
        return JsonResponse(producto.to_dict(), status=201)

    productos = [p.to_dict() for p in Producto.objects.order_by("codigo")]
    return JsonResponse(productos, safe=False)
