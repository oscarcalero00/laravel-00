FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl zip unzip libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY ../backend/composer.json ../backend/composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-interaction

COPY ../backend .

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage
