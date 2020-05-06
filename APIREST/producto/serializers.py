from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Producto
        fields = ['id','nombre','descripcion','ranking','thumbnail','precio','fabricante',
                    'tipo','imagen1','imagen2','imagen3','forma_envio','categoria']