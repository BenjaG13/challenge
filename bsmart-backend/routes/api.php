<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Auth\Events\Logout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas públicas para los métodos GET
Route::group(['prefix' => 'V1', 'namespace' => 'App\Http\Controllers'], function () {
    // Rutas GET accesibles sin autenticación
    Route::get('categories/product-distribution', [CategoryController::class, 'getProductDistribution']);
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{product}', [ProductController::class, 'show']); 
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/{category}', [CategoryController::class, 'show']);
    
    // Registro y login sin protección
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

// Rutas protegidas con auth:sanctum para métodos POST, PUT, PATCH, DELETE
Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => 'V1', 'namespace' => 'App\Http\Controllers'], function () {
        Route::post('logout', [AuthController::class, 'logout']);
        
        // Rutas POST, PUT, PATCH y DELETE protegidas
        Route::apiResource('products', ProductController::class)->except(['index', 'show']);
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    });
});
