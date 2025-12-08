<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SwapiService
{
    private const BASE_URL = 'https://swapi.tech/api';
    private static $peopleCache = null;
    private static $filmsCache = null;

    public function search(string $type, string $query): array
    {
        $endpoint = $this->getEndpoint($type);
        
        $response = Http::get(self::BASE_URL . "/{$endpoint}", [
            'name' => $query
        ]);

        if ($response->failed()) {
            return [
                'success' => false,
                'message' => 'Error fetching data from SWAPI'
            ];
        }

        return [
            'success' => true,
            'data' => $response->json()
        ];
    }

    public function getDetails(string $type, int $id): array
    {
        $endpoint = $this->getEndpoint($type);
        
        $response = Http::get(self::BASE_URL . "/{$endpoint}/{$id}");

        if ($response->failed()) {
            return [
                'success' => false,
                'message' => 'Resource not found'
            ];
        }

        $data = $response->json();
        
        // Normalize swapi.tech response: extract result.properties
        if (isset($data['result']['properties'])) {
            $data = $data['result']['properties'];
        }

        // Resolve related data based on type
        if ($type === 'movies' && isset($data['characters'])) {
            $data['characters'] = $this->resolveCharacters($data['characters']);
        }
        
        if ($type === 'people' && isset($data['films'])) {
            $data['films'] = $this->resolveFilms($data['films']);
        }

        return [
            'success' => true,
            'data' => $data
        ];
    }

    private function resolveCharacters(array $characterUrls): array
    {
        // Lazy load all people if not cached
        if (self::$peopleCache === null) {
            self::$peopleCache = $this->fetchAllPeople();
        }

        $characters = [];
        
        foreach ($characterUrls as $url) {
            // Extract ID from URL
            if (preg_match('/\/people\/(\d+)/', $url, $matches)) {
                $id = $matches[1];
                
                // Find in cache
                if (isset(self::$peopleCache[$id])) {
                    $characters[] = [
                        'id' => $id,
                        'name' => self::$peopleCache[$id]
                    ];
                }
            }
        }
        
        return $characters;
    }

    private function resolveFilms(array $filmUrls): array
    {
        // Lazy load all films if not cached
        if (self::$filmsCache === null) {
            self::$filmsCache = $this->fetchAllFilms();
        }

        $films = [];
        
        foreach ($filmUrls as $url) {
            // Extract ID from URL
            if (preg_match('/\/films\/(\d+)/', $url, $matches)) {
                $id = $matches[1];
                
                // Find in cache
                if (isset(self::$filmsCache[$id])) {
                    $films[] = [
                        'id' => $id,
                        'title' => self::$filmsCache[$id]
                    ];
                }
            }
        }
        
        return $films;
    }

    private function fetchAllPeople(): array
    {
        $cache = [];
        $page = 1;
        $totalPages = 1;

        do {
            $response = Http::get(self::BASE_URL . '/people', ['page' => $page, 'limit' => 100]);
            
            if ($response->successful()) {
                $data = $response->json();
                $results = $data['results'] ?? [];
                
                foreach ($results as $person) {
                    $id = $person['uid'] ?? null;
                    $name = $person['name'] ?? null;
                    
                    if ($id && $name) {
                        $cache[$id] = $name;
                    }
                }
                
                $totalPages = $data['total_pages'] ?? 1;
                $page++;
            } else {
                break;
            }
        } while ($page <= $totalPages);

        return $cache;
    }

    private function fetchAllFilms(): array
    {
        $cache = [];
        
        $response = Http::get(self::BASE_URL . '/films');
        
        if ($response->successful()) {
            $data = $response->json();
            $results = $data['result'] ?? [];
            
            foreach ($results as $film) {
                $id = $film['uid'] ?? null;
                $properties = $film['properties'] ?? [];
                $title = $properties['title'] ?? null;
                
                if ($id && $title) {
                    $cache[$id] = $title;
                }
            }
        }

        return $cache;
    }

    private function getEndpoint(string $type): string
    {
        return match ($type) {
            'people' => 'people',
            'movies' => 'films',
            default => throw new \InvalidArgumentException("Invalid type: {$type}")
        };
    }
}
