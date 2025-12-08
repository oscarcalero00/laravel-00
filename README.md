# Star Wars Search Application

Full-stack application to search for Star Wars characters and movies using the SWAPI API.

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

## Prerequisites

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Make** (optional, for simplified commands)

> **Note**: You don't need PHP, Node.js, Composer, or npm installed locally. Everything runs inside Docker containers.

## Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd laravel-00
```

### 2. Build Docker images

```bash
make build
```

Or without Make:

```bash
docker compose build
```

### 3. Start services

```bash
make up
```

Or without Make:

```bash
docker compose up -d
```

### 4. Access the application

- **Frontend (Next.js)**: http://localhost:3000
- **Backend (Laravel API)**: http://localhost:8080
- **Base de datos (MySQL)**: localhost:3306

## Available Commands

### With Makefile

```bash
make build          # Build Docker images
make up             # Start services
make down           # Stop services
make restart        # Restart services
make logs           # View logs from all services
make clear-cache    # Clear Laravel cache
make composer-install   # Install Composer dependencies
```

### Without Makefile (Direct Docker Compose)

```bash
docker compose build                    # Build images
docker compose up -d                    # Start services
docker compose down                     # Stop services
docker compose logs -f                  # View logs
docker compose exec backend php artisan cache:clear  # Clear cache
```

## Project Structure

```
laravel-00/
├── backend/                 # Laravel application
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Services/       # SwapiService (SWAPI integration)
│   │   └── ...
│   ├── routes/api.php      # API routes
│   └── ...
├── frontend/               # Next.js application
│   ├── app/
│   │   ├── components/     # React components
│   │   ├── people/[id]/    # Person details page
│   │   ├── films/[id]/     # Film details page
│   │   └── search/         # Search page
│   ├── context/            # SearchContext (global state)
│   ├── styles/             # Vanilla Extract CSS
│   └── types/              # TypeScript types
├── docker/                 # Dockerfiles
│   ├── php/
│   ├── nginx/
│   └── nextjs/
├── docker-compose.yml      # Services configuration
└── Makefile               # Simplified commands
```

## Features

### 1. Character and Movie Search
- Real-time search using SWAPI API
- Filter by type (People/Movies)
- Loading and empty states
- Results cache by search type

### 2. Detail Pages
- **Characters**: Detailed information + list of movies
- **Movies**: Opening crawl + list of characters
- Navigation between characters and movies

### 3. Backend Optimizations
- **Static caching**: Reduces repeated SWAPI calls
- **Relationship resolution**: Pre-resolved characters and movies
- **Data normalization**: Consistent response structure

### 4. UI States
- Loading: Animated indicator during searches
- Empty: Message when no results found
- Disabled: Button disabled when input is empty
- Dynamic placeholders based on selected type

## API Endpoints

### Backend (Laravel)

```bash
GET /api/search?type={people|movies}&query={text}
# Search for characters or movies

GET /api/details/{type}/{id}
# Get details of a character or movie
```

### SWAPI Integration

The backend consumes the SWAPI API (swapi.tech) and normalizes responses:

- **SWAPI Endpoint**: https://swapi.tech/api/
- **Cache**: Implemented in `SwapiService.php`
- **Structure**: Extracts `result.properties` from responses

## Environment Variables

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

## Development

### Frontend (Next.js)

The frontend automatically reloads with changes:

```bash
# Files are mounted as volumes
cd frontend
# Edit files and see changes at http://localhost:3000
```

### Backend (Laravel)

```bash
# Run commands inside the container
docker compose exec backend php artisan {command}

# Examples:
docker compose exec backend php artisan cache:clear
docker compose exec backend php artisan route:list
docker compose exec backend composer install
```

## Design System

The project uses a centralized design system with Vanilla Extract:

### Colors
- `greenTeal`: rgb(10, 180, 99) - Primary actions
- `pinkishGrey`: rgb(196, 196, 196) - Placeholders, disabled states
- `greyBorder`: rgb(218, 218, 218) - Borders
- `emerald`: rgb(0, 148, 255) - Links, radio buttons

### Typography
- **Font**: Montserrat
- **Sizes**: 14px (body), 18px (titles)

## Troubleshooting

### Containers won't start

```bash
# View logs
make logs

# Rebuild from scratch
make down
docker system prune -a
make build
make up
```

### Database connection error

```bash
# Check if MySQL is running
docker compose ps

# Wait for MySQL to fully initialize
docker compose logs db
```

### Port already in use

If ports 3000, 8080, or 3306 are occupied:

```yaml
# Edit docker-compose.yml
services:
  nextjs:
    ports:
      - "3001:3000"  # Change local port
```

### Frontend doesn't show data

Verify that `NEXT_PUBLIC_API_URL` points to the correct backend:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Laravel Documentation](https://laravel.com/docs)
- [SWAPI Documentation](https://swapi.tech/documentation)
- [Vanilla Extract](https://vanilla-extract.style/)
- [Docker Documentation](https://docs.docker.com/)

## License

MIT
