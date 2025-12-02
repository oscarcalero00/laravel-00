<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ExampleController extends Controller
{
    public function index()
    {
        return [
            'message' => 'API funcionando correctamente',
            'items' => [1, 2, 3]
        ];
    }

    public function store(Request $request)
    {
        return [
            'received' => $request->all()
        ];
    }
}
