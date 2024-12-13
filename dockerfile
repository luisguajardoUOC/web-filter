# Usa la imagen oficial de Apache
FROM httpd:2.4

# Habilita mod_rewrite descomentando la línea en el archivo httpd.conf
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copia los archivos compilados de Angular al directorio de Apache
COPY ./dist/web-filter/browser/* /usr/local/apache2/htdocs/

# Expone el puerto 4200 para el servidor Apache
EXPOSE 80
