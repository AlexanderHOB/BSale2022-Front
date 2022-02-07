# Bsale2022-Aplicación
Frontend Bsale 2022 
Bienvenido a la documentación de la aplicación de tienda virtual, la cual permite presentar los productos y categorías extraído de los endpoints del [API Rest BSALE 2022](https://github.com/AlexanderHOB/Bsale2022-API)

# Contenidos
* [Introducción](#introduccion)
* [Explicación del Ejercicio](#Explicación-del-Ejercicio)

# Introduccion
- La aplicación esta desarrollada en JavaScript Vanilla.
- Se empleó métodos estaticos.
- camelCase en los nombres de variables.
- Explicación detallada se encuentra en los comentarión de código fuente

# Seguridad
No requiere de token de acceso para realizar las consultas. Dado que la API es desarrollado como parte de una prueba técnica

## Explicación del Ejercicio
### 1. Creación de la estructura inicial
    -js
        - Product.js
        - Category.js
    - css
        - main.css
    - index.html
    - app.js 
    
### 2. Maquetación y estilos
- Para el desarrollo de la tienda virtual se utilizó boostrap para el diseño.
- Se creo tres estructuras en el body de HTML: *header*, *main* y *footer*
- Se asignaron `id` con el objetivo de manejarlo mediante javascript.
### 3. Creación de las clases
- En primer lugar, se creo la clase Product que contiene los siguientes métodos, la explicación de los argumentos de cada método se encuentra detallado en los comentarios del código fuente:
    1. #showDOM - Método estático privado con el objetivo de renderizar los productos.
    2. #clearDOM - Método estático privado con el objetivo de limpiar el contenedor de productos.
    3. #showError - Método stático privado para mostrar errores que se presenten.
    4. #loading - Método stático privado para mostrar el efecto de carga al momento de realizar una petición.
    5. getAllProducts - Método stático que realiza la petición de todos los productos.
    4. getProductByName - Método stático que realiza la petición de todos los productos filtrado por nombre.
    5. getProductByCategory -Método stático que realiza la petición de todos los productos filtrado por categoría.
    6. #pagination - Método stático privado para gestionar la paginación de las distintas consultas.
- En segundo lugar, se creo la clase Category que contiene los siguientes métodos, a explicación de los argumentos de cada método se encuentra detallado en los comentarios del código fuente:
    1. getAllCategories - Método statico para obtener todas las categorías
    2. #showDropdown -Método stático privado para renderizar en el DOM las categorías.
### 4. Empleo de las clases en App.js
- Mediante los `id` asignados en el código HTML se obtuvo los elementos que ejecutaran los eventos, desde el evento de carga, donde se ejecuta las peticiones de productos y categorías, hasta el evento click o enter cuando se busca un determinado producto mediante nombre, categoría o página.
- Finalmente se empleo un timer que reinicia los valores almacenados en el localStorage de las consultas, ya que esto permite no realizar peticiones consecutivas, debido a que la data enviada no esta en constante actualización.