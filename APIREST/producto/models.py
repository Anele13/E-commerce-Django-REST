from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=200, blank=True, null=True)
    descripcion = models.CharField(max_length=200, blank=True, null=True)
    ranking = models.IntegerField(blank=True, null=True)
    thumbnail = models.CharField(max_length=500, blank=True, null=True)
    precio = models.DecimalField(null=True, max_digits=10, decimal_places=2)
    fabricante = models.CharField(max_length=200, blank=True, null=True)
    tipo = models.CharField(max_length=200, blank=True, null=True)
    imagen1 = models.CharField(max_length=500, blank=True, null=True)
    imagen2 = models.CharField(max_length=500, blank=True, null=True)
    imagen3 = models.CharField(max_length=500, blank=True, null=True)
    forma_envio = models.CharField(max_length=100, blank=True, null=True)
    categoria = models.CharField(max_length=500, blank=True, null=True)
    cantidad_disponible = models.IntegerField(blank=True, null=True)