Instalacion y configuracion

1.Descarga o clona el repositorio https://github.com/BenjaG13/challenge.git

2.Navega hasta la carpeta de laravel

3.Copia el archivo .env.example y renombralo a .env

4.Configura las credenciales de tu base de datos por ejemplo:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=
    DB_USERNAME=root
    DB_PASSWORD=
    
5.Ejecuta: composser install

6.Ejecuta las migraciones y seeders: php artisan migrate --seed

7.Inicia el servidor local de Laravel ejecutando: php artisan serve

8.Navega hasta la carpeta de React 

9.Ejecuta: npm install

10.Inicia el servidor de desarrollo de React ejecutando: npm start
