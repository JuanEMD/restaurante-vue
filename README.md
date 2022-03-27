# restaurante-vue


Acerca del sistema

Este sistema nace de la necesidad de un restaurante de dar almuerzos gratis y llevar un registro de las entregas realizadas.
El sistema permitirá al usuario agregar, editar, eliminar y visualizar los registros de una manera sencilla, fácil y amigable, del mismo modo poder especificar a las personas a las que se le ha entregado el almuerzo y a las que no.

librerías usadas:

-Bootstrap vue: Es un framework de CSS que ha sido utilizado en el sistema para el diseño del mismo.
   
-Sweetalert2: Es una librería para el manejo de mensajes de notificación. En el sistema hemos creado un plugin llamado alertas donde procedemos a definir alertas de manera global, para su posterior uso de manera informativa y de confirmación en la creación, edición y eliminación de registros, así también en la visualización de errores.
   
-Vuelidate: Es una librería para la validación manual de los datos al momento de crear formularios. Ha sido utilizada en este sistema para las validaciones en el formulario creación/edición.

Pasos requeridos para montar la app:

-npm install

-npm run serve

Vistas del sistema:
-	/Registros: En esta vista puede crear, editar, eliminar y ver el listado de registros. A demás de esto, desde esta vista podrá cambiar el estado del almuerzo entregado.

Nota: la url default “/” hace referencia a “/Registros”.



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
