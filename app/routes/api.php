<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AttributeController;
use App\Http\Controllers\Api\BrandController;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProductController;
use App\Models\Brand;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::prefix('admin')->group(function(){
//     Route::name('admin.')->group(function(){
//         Route::post('/register',[AdminController::class, 'register'])->name('register');
//     });
// });

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/checkAuthentication',function(){
        return Response()->json([
            'status'    => 200,
            'message'   => 'You are Authorized.'
        ]);
    });

    Route::prefix('dashboard')->group(function(){
        Route::name('dashboard.')->group(function(){
            Route::get('/totalCategories',[DashboardController::class, 'totalCategories'])->name('totalCategories');
        });
    });

    Route::prefix('admin')->group(function(){
        Route::name('admin.')->group(function(){
            Route::post('/logout',[AdminController::class, 'userLogout'])->name('logout');
        });
    });

    Route::prefix('categories')->group(function(){
        Route::name('category.')->group(function(){
            Route::get('/',[CategoryController::class, 'categories'])->name('categories');
            Route::post('/add-category',[CategoryController::class, 'addCategory']);
            Route::get('/edit-category/{id}',[CategoryController::class, 'editCategory'])->name('edit-category');
            Route::get('/delete/{id}',[CategoryController::class, 'delete'])->name('delete');
            Route::post('/update-category',[CategoryController::class, 'updateCategory'])->name('update');
        });
    });

    Route::prefix('sub-categories')->group(function(){
        Route::name('sub-category')->group(function(){
            Route::get('/',[CategoryController::class, 'subCategories'])->name('subCategories');
            Route::get('/get-category-list',[CategoryController::class, 'getCategoryList'])->name('categoryList');
            Route::post('/add-sub-category',[CategoryController::class, 'addSubCategory'])->name('addSubCategory');
            Route::get('/editSubCategory/{id}',[CategoryController::class, 'editSubCategory'])->name('updateSubCategory');
            Route::post('/update-sub-category',[CategoryController::class, 'updateSubCategory'])->name('updateSubCategory');
            Route::get('/delete/{id}',[CategoryController::class, 'deleteSubCategory'])->name('deleteSubCategory');
        });
    });


    Route::prefix('sub-sub-categories')->group(function(){
        Route::name('subSubCategory.')->group(function(){
            Route::get('/get-category-list',[CategoryController::class, 'getSubSubCategoryList'])->name('getSubSubCategoryList');
            Route::post('/add',[CategoryController::class, 'addSubSubCategory'])->name('add');
            Route::get('/',[CategoryController::class, 'getSubSubCategories'])->name('getAll');
            Route::get('/delete/{id}',[CategoryController::class, 'deleteSubSubCategory'])->name('delete');
            Route::get('/edit/{id}',[CategoryController::class, 'editSubSubCategories'])->name('edit');
            Route::post('/update',[CategoryController::class, 'updateSubSubCategory'])->name('update');
        });
    });

    Route::prefix('attributes')->group(function(){
        Route::name('attributes.')->group(function(){
            Route::get('/',[AttributeController::class, 'all'])->name('all');
            Route::post('/add',[AttributeController::class, 'add'])->name('add');
            Route::get('/edit/{id}',[AttributeController::class, 'edit'])->name('edit');
            Route::post('/update',[AttributeController::class, 'update'])->name('update');
            Route::post('/delete/{id}',[AttributeController::class, 'delete'])->name('delete');
        });
    });

    Route::prefix('brands')->group(function(){
        Route::name('brands.')->group(function(){
            Route::get('/',[BrandController::class, 'all'])->name('all');
            Route::post('/add',[BrandController::class, 'add'])->name('add');
            Route::get('/edit/{id}',[BrandController::class, 'edit'])->name('edit');
            Route::post('/update',[BrandController::class, 'update'])->name('update');
            Route::post('/delete/{id}',[BrandController::class, 'delete'])->name('delete');
        });
    });


    Route::prefix('products')->group(function(){
        Route::name('product.')->group(function(){
            Route::get('/get-categories',[ProductController::class, 'getCategories'])->name('getCategories');
            Route::get('/sub-category/{id}',[ProductController::class, 'subCategory'])->name('subCategory');
            Route::get('/sub-sub-category/{id}',[ProductController::class, 'subSubCategories'])->name('subSubCategories');
            Route::get('/getAttributes',[ProductController::class, 'getAttributes'])->name('getAttributes');
        });
    });

    
});

Route::prefix('auth')->group(function(){
    Route::name('auth.')->group(function(){
        Route::post('/register',[AdminController::class, 'register'])->name('register');
        Route::post('/login',[AdminController::class, 'userLogin'])->name('login');
    });
});