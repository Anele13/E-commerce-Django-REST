from rest_framework import viewsets
from rest_framework import permissions
from .models import Producto
from .serializers import ProductoSerializer
from rest_framework import generics
   

class ProductoList(generics.ListAPIView):
    #queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Producto.objects.all()
        id_producto = self.kwargs.get('pk', None)
        precio_minimo = self.request.query_params.get('minimum_price', None)
        precio_maximo = self.request.query_params.get('maximum_price', None)
        rating = self.request.query_params.get('rating', None)
        tipo = self.request.query_params.getlist('tipo[]', None)
        if id_producto or precio_minimo or precio_maximo or rating or tipo:
            if id_producto: #para producto.html
                queryset = queryset.filter(id=id_producto)
            else: #para filtros
                queryset = queryset.filter(precio__gte=precio_minimo, precio__lte=precio_maximo)
                if rating != '0':
                    queryset = queryset.filter(ranking=round(float(rating)))
                if tipo:
                    queryset = queryset.filter(tipo__in=tipo)
        return queryset