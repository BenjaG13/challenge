<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductCollection;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $sortBy = $request->get('sort_by', 'name');
    $sortOrder = $request->get('sort_order', 'asc');
    $perPage = $request->get('per_page', 20);

    // Validar que la orden sea 'asc' o 'desc'
    if (!in_array($sortOrder, ['asc', 'desc'])) {
        $sortOrder = 'asc';
    }

    // Obtener los productos con orden, paginación e incluir la categoría relacionada
    $products = Product::with('category') // Incluir la relación de categoría
                       ->orderBy($sortBy, $sortOrder)
                       ->paginate($perPage);

    // Retornar la colección paginada junto con las categorías
    return new ProductCollection($products);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
         $validated = $request->validated();

         $product = Product::create($validated);
 
         return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load('category');
        return new ProductResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        $product->update($validated);

        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }
}
