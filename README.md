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

> **Note**: Composer and npm dependencies are installed automatically during the Docker build process. No additional steps needed!

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
│   │   ├── Console/Commands/   # ComputeSwapiStatsCommand
│   │   ├── Events/            # RecomputeSwapiStats event
│   │   ├── Jobs/              # ComputeSwapiStats job (queued)
│   │   ├── Listeners/         # ComputeSwapiStatsListener
│   │   ├── Http/Controllers/  # SwapiController, StatsController
│   │   ├── Services/          # SwapiService (SWAPI integration)
│   │   └── ...
│   ├── routes/api.php      # API routes
│   └── storage/app/        # swapi_queries.log, swapi_stats.json
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
- **Query logging**: All requests logged for analytics
- **Statistics system**: Event-driven stats computation every 5 minutes

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

GET /api/stats
# Get query statistics (updated every 5 minutes)
```

### Statistics Endpoint

The `/api/stats` endpoint returns statistics about previous queries, computed every 5 minutes via an event and queue system:

**Example Response:**
```json
{
  "total_requests": 150,
  "top_queries": [
    {
      "query": "luke",
      "count": 45,
      "percentage": 30.0
    },
    {
      "query": "vader",
      "count": 30,
      "percentage": 20.0
    }
  ],
  "average_duration_ms": 245.67,
  "most_popular_hour": 14,
  "generated_at": "2025-12-09T10:00:00.000000Z"
}
```

**How it works:**
1. Every request to `/search` and `/details` is logged to `storage/app/swapi_queries.log`
2. A scheduled command runs every 5 minutes: `swapi:compute-stats`
3. The command dispatches a `RecomputeSwapiStats` event
4. A listener queues the `ComputeSwapiStats` job
5. The job processes the logs and generates statistics in `storage/app/swapi_stats.json`
6. The `/api/stats` endpoint reads and returns this data

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

## Testing Statistics API

The statistics endpoint can be tested at any time to see aggregated query data:

### Test the Stats Endpoint

```bash
# Get current statistics
curl http://localhost:8080/api/stats | jq

# Or visit in browser
open http://localhost:8080/api/stats
```

### Example Test Workflow

1. **Make some searches** to generate data:
```bash
curl "http://localhost:8080/api/search?type=people&query=luke"
curl "http://localhost:8080/api/search?type=people&query=vader"
curl "http://localhost:8080/api/search?type=movies&query=jedi"
```

2. **Trigger stats computation manually** (optional):
```bash
docker compose exec backend php artisan swapi:compute-stats
```

3. **Check the statistics**:
```bash
curl http://localhost:8080/api/stats | jq
```

Expected output:
```json
{
  "total_requests": 3,
  "top_queries": [
    {"query": "luke", "count": 1, "percentage": 33.33},
    {"query": "vader", "count": 1, "percentage": 33.33},
    {"query": "jedi", "count": 1, "percentage": 33.33}
  ],
  "average_duration_ms": 1523.45,
  "most_popular_hour": 16,
  "generated_at": "2025-12-09T16:45:23.456789Z"
}
```

### Background Services for Stats

The statistics are automatically computed every 5 minutes by two Docker services:

- **`laravel_scheduler`**: Runs the Laravel scheduler (`php artisan schedule:work`)
- **`laravel_queue`**: Processes queued jobs (`php artisan queue:work`)

You can monitor these services:

```bash
# Check scheduler logs
docker compose logs scheduler -f

# Check queue worker logs
docker compose logs queue -f

# Check all services status
docker compose ps
```

### Stats Data Location

- **Query logs**: `backend/storage/app/swapi_queries.log`
- **Computed stats**: `backend/storage/app/swapi_stats.json`

You can inspect these files directly:

```bash
# View recent queries
docker compose exec backend tail -20 storage/app/swapi_queries.log

# View computed statistics
docker compose exec backend cat storage/app/swapi_stats.json | jq
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
