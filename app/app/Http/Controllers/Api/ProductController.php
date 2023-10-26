<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use Illuminate\Http\Request;
use App\Models\Attribute;

class ProductController extends Controller
{
    public function getCategories(){
        $categories = Category::where('status',1)->get();
        return Response()->json([
            'status'    => 200,
            'categories'    => $categories
        ]);
    }

    public function subCategory($id){
        $subcategories = SubCategory::where('parent',$id)->get();
        return Response()->json([
            'status'    => 200,
            'subcategories' => $subcategories
        ]);
    }

    public function subSubCategories($id){
        $subSubCategories = SubSubCategory::where('parent',$id)->get();
        return Response()->json([
            'status'    => 200,
            'subSubCategories' => $subSubCategories
        ]);
    }

    public function getAttributes(){
        $attributes = Attribute::select('id as value','name as label')->get();
        return Response()->json([
            'status'    => 200,
            'attributes'   => $attributes
        ]);
    }
}
