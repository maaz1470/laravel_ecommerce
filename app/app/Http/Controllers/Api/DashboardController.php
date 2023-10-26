<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function totalCategories(){
        $categories = Category::select('id','status')->where('status',1)->get();
        return Response()->json([
            'status'    => 200,
            'categories'    => $categories->count()
        ]);
    }
}
