# Star Wars Search Application

Aplicación full-stack para buscar personajes y películas de Star Wars utilizando la API de SWAPI.

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Vanilla Extract** (CSS-in-JS)
- **React Context API** (State Management)

### Backend
- **Laravel 11**
- **PHP 8.2**
- **SWAPI Integration** (swapi.tech)

### Infrastructure
- **Docker & Docker Compose**
- **Nginx** (Web Server)
- **MySQL 8** (Database)

## Requisitos Previos

- **Docker** (versión 20.10 o superior)
- **Docker Compose** (versión 2.0 o superior)
- **Make** (opcional, para comandos simplificados)

> **Nota**: No necesitas tener PHP, Node.js, Composer o npm instalados localmente. Todo corre dentro de contenedores Docker.

## Instalación y Setup

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd laravel-00
```

### 2. Construir las imágenes Docker

```bash
make build
```

O sin Make:

```bash
docker compose build
```

### 3. Levantar los servicios

```bash
make up
```

O sin Make:

```bash
docker compose up -d
```

### 4. Acceder a la aplicación

- **Frontend (Next.js)**: http://localhost:3000
- **Backend (Laravel API)**: http://localhost:8080
- **Base de datos (MySQL)**: localhost:3306

## Comandos Disponibles

### Con Makefile

```bash
make build          # Construir las imágenes Docker
make up             # Levantar los servicios
make down           # Detener los servicios
make restart        # Reiniciar los servicios
make logs           # Ver logs de todos los servicios
make clear-cache    # Limpiar caché de Laravel
make composer-install   # Instalar dependencias de Composer
```

### Sin Makefile (Docker Compose directo)

```bash
docker compose build                    # Construir imágenes
docker compose up -d                    # Levantar servicios
docker compose down                     # Detener servicios
docker compose logs -f                  # Ver logs
docker compose exec backend php artisan cache:clear  # Limpiar caché
```

## Estructura del Proyecto

```
laravel-00/
├── backend/                 # Aplicación Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Services/       # SwapiService (integración con SWAPI)
│   │   └── ...
│   ├── routes/api.php      # Rutas de la API
│   └── ...
├── frontend/               # Aplicación Next.js
│   ├── app/
│   │   ├── components/     # Componentes React
│   │   ├── people/[id]/    # Página de detalles de persona
│   │   ├── films/[id]/     # Página de detalles de película
│   │   └── search/         # Página de búsqueda
│   ├── context/            # SearchContext (estado global)
│   ├── styles/             # Vanilla Extract CSS
│   └── types/              # TypeScript types
├── docker/                 # Dockerfiles
│   ├── php/
│   ├── nginx/
│   └── nextjs/
├── docker-compose.yml      # Configuración de servicios
└── Makefile               # Comandos simplificados
```

## Funcionalidades

### 1. Búsqueda de Personajes y Películas
- Búsqueda en tiempo real utilizando la API de SWAPI
- Filtrado por tipo (People/Movies)
- Estados de carga y vacío
- Caché de resultados por tipo de búsqueda

### 2. Páginas de Detalles
- **Personajes**: Información detallada + lista de películas
- **Películas**: Opening crawl + lista de personajes
- Navegación entre personajes y películas

### 3. Optimizaciones Backend
- **Caching estático**: Reduce llamadas repetidas a SWAPI
- **Resolución de relaciones**: Personajes y películas pre-resueltos
- **Normalización de datos**: Estructura consistente de respuestas

### 4. Estados de UI
- Loading: Indicador animado durante búsquedas
- Empty: Mensaje cuando no hay resultados
- Disabled: Botón deshabilitado cuando input está vacío
- Placeholders dinámicos según tipo seleccionado

## API Endpoints

### Backend (Laravel)

```bash
GET /api/search?type={people|movies}&query={text}
# Buscar personajes o películas

GET /api/details/{type}/{id}
# Obtener detalles de un personaje o película
```

### Integración SWAPI

El backend consume la API de SWAPI (swapi.tech) y normaliza las respuestas:

- **Endpoint SWAPI**: https://swapi.tech/api/
- **Caché**: Implementado en `SwapiService.php`
- **Estructura**: Extrae `result.properties` de las respuestas

## Variables de Entorno

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Backend (.env)

```env
APP_URL=http://localhost:8080
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=app
DB_USERNAME=app
DB_PASSWORD=secret
```

## Desarrollo

### Frontend (Next.js)

El frontend se recarga automáticamente con los cambios:

```bash
# Los archivos están montados como volumen
cd frontend
# Edita archivos y verás los cambios en http://localhost:3000
```

### Backend (Laravel)

```bash
# Ejecutar comandos dentro del contenedor
docker compose exec backend php artisan {command}

# Ejemplos:
docker compose exec backend php artisan cache:clear
docker compose exec backend php artisan route:list
docker compose exec backend composer install
```

## Design System

El proyecto utiliza un sistema de diseño centralizado con Vanilla Extract:

### Colores
- `greenTeal`: rgb(10, 180, 99) - Primary actions
- `pinkishGrey`: rgb(196, 196, 196) - Placeholders, disabled states
- `greyBorder`: rgb(218, 218, 218) - Borders
- `emerald`: rgb(0, 148, 255) - Links, radio buttons

### Typography
- **Font**: Montserrat
- **Sizes**: 14px (body), 18px (titles)

## Troubleshooting

### Los contenedores no levantan

```bash
# Ver logs
make logs

# Reconstruir desde cero
make down
docker system prune -a
make build
make up
```

### Error de conexión a la base de datos

```bash
# Verificar que MySQL esté corriendo
docker compose ps

# Esperar a que MySQL inicie completamente
docker compose logs db
```

### Puerto ocupado

Si los puertos 3000, 8080 o 3306 están ocupados:

```yaml
# Editar docker-compose.yml
services:
  nextjs:
    ports:
      - "3001:3000"  # Cambiar puerto local
```

### Frontend no muestra datos

Verificar que `NEXT_PUBLIC_API_URL` apunte al backend correcto:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Laravel Documentation](https://laravel.com/docs)
- [SWAPI Documentation](https://swapi.tech/documentation)
- [Vanilla Extract](https://vanilla-extract.style/)
- [Docker Documentation](https://docs.docker.com/)

## Licencia

MIT
