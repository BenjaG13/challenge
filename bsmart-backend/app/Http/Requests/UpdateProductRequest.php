<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method = $this->method();
        if ($method == "PUT") {
            return [
                'name' => ['required'],
                'description' => ['required'],
                'price' => ['required', 'numeric'], 
                'code' => ['required'],
                'category_id' => ['required', 'exists:categories,id'], 
            ];
        } else {
            return [
                'name' => ['sometimes', 'required'],
                'description' => ['sometimes', 'required'],
                'price' => ['sometimes', 'required', 'numeric'],
                'code' => ['sometimes', 'required'],
                'category_id' => ['sometimes', 'required', 'exists:categories,id']
            ];
        }
    }
}
