<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SwapiService
{
    private const BASE_URL = 'https://swapi.tech/api';

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

        return [
            'success' => true,
            'data' => $data
        ];
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
