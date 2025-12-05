.PHONY: build up down restart logs clear-cache composer-install

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose down
	docker compose up -d

logs:
	docker compose logs -f

clear-cache:
	docker compose exec backend php artisan cache:clear
	docker compose exec backend php artisan config:clear
	docker compose exec backend php artisan route:clear
	docker compose exec backend php artisan view:clear

composer-install:
	docker compose exec backend composer install

composer-dump:
	docker compose exec backend composer dump-autoload
