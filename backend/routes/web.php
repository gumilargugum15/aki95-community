<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => config('app.name'),
        'message' => 'Backend REST API Komunitas AKI Motor 95. Frontend website berjalan terpisah (React SPA).',
        'api' => url('/api/v1'),
    ]);
});

// This backend only serves a REST API (frontend is a separate React SPA).
// Named so Laravel's auth middleware can resolve a redirect target instead of
// throwing a RouteNotFoundException for guests who hit the API without an
// "Accept: application/json" header.
Route::get('/login', function () {
    abort(401, 'Unauthenticated.');
})->name('login');
