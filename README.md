# E-commerce-Django-REST
Simple e-commerce with Bootstrap, Django &amp; DjangoREST

### Para correr el servidor HTML usando Docker:

- Descargar la imagen utilizando: ```sudo docker build -t nginx .```

- Correr el contenedor: ```sudo docker run --name nginx1.0 -v $(pwd)/html:/usr/share/nginx/html:ro -d -p 8000:80 nginx```

- Ir a: ```http://localhost:8000/producto.html``` 

***Cuando hayan mas html seran otras urls.**


### Para correr la API: 

- Entrar a la carpeta de ```APIREST``` para correr la api de catalogo y productos
  - Una vez dentro ```python manage.py makemigrations```, ```migrate```, ```runserver localhost:8000```
  - finalmente para obtener datos de la API las URLS son: 
    - ```http://localhost:8000/producto``` ***para obtener TODOS los productos***
    - ```http://localhost:8000/producto/1``` ***para obtener el producto con ID=1***
  
