<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubSubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use GuzzleHttp\Psr7\Response;
use App\Models\SubCategory;

class CategoryController extends Controller
{
    private $defaultErrorMessage = 'Something went wrong. Please try again or Contact your Developer.';
    protected function categoryUrl($name){
        $slug = preg_replace("/-$/","",preg_replace('/[^a-z0-9]+/i', "-", strtolower($name)));
            $category = Category::where('url',$slug)->get();
            $allCategories = Category::all();
            if($category->count() > 0){
                $slug = $slug . '-' . $allCategories->count();
            }
            return $slug;
    }

    private function defaultSuccessMessage($msg){
        return $msg . ' Saved Successfully';
    }
    public function addCategory(Request $request){
        $validator = Validator::make($request->all(),[
            'name'      => 'required|string|max:255',
            'status'    => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $url = $this->categoryUrl($request->name);

        $category = new Category;

        $category->name = $request->name;
        $category->url = $url;
        $category->status = $request->status;
        if($category->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Save successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 200,
                'error'     => $this->defaultErrorMessage
            ]);
        }

    }

    public function categories(){
        $categories = Category::all();
        return Response()->json([
            'status'    => 200,
            'categories'    => $categories
        ]);
    }

    public function editCategory($id){
        $category = Category::find($id);
        if($category){
            return Response()->json([
                'status'    => 200,
                'category'  => Category::find($id)
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
        
    }

    public function delete($id){
        $category = Category::find($id);
        if($category){
            $category->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Delete Successfully.'
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }

    public function updateCategory(Request $request){
        $validator = Validator::make($request->all(),[
            'name'  => 'required|string|max:255',
            'url'   => 'required|string|max:255',
            'status'    => 'required'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }


        $category = Category::find($request->id);



        if($category){

            
            if($request->url == $category->url){
                $url = $request->url;
            }else{
                $request->validate([
                    'url'   => 'unique:categories,url'
                ]);
                $url = $this->categoryUrl($request->url);
            }


            $category->name = $request->name;
            $category->url = $url;
            $category->status = $request->status;
            if($category->update()){
                return Response()->json([
                    'status'    => 200,
                    'message'   => 'Category update successfully'
                ]);
            }else{
                return Response()->json([
                    'status'    => 403,
                    'message'   => $this->defaultErrorMessage
                ]);
            }
            
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category Not Found'
            ]);
        }

    }

    public function getCategoryList(){
        $categories = Category::where('status',1)->get();
        return Response()->json([
            'status'    => 200,
            'categories'    => $categories
        ]);
    }

    protected function createSubCategoryUrl($name){
        $slug = preg_replace("/-$/","",preg_replace('/[^a-z0-9]+/i', "-", strtolower($name)));
            $category = SubCategory::where('url',$slug)->get();
            $allCategories = SubCategory::all();
            if($category->count() > 0){
                $slug = $slug . '-' . $allCategories->count();
            }
            return $slug;
    }

    public function addSubCategory(Request $request){
        $validator = Validator::make($request->all(),[
            'name'      => 'required|string|max:255',
            'parent'    => 'required',
            'status'    => 'required'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $url = $this->createSubCategoryUrl($request->name);
        
        $sub_category = new SubCategory;
        $sub_category->name = $request->name;
        $sub_category->parent = $request->parent;
        $sub_category->url = $url;
        $sub_category->status   = $request->status;

        if($sub_category->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => $this->defaultSuccessMessage('Sub Category')
            ]);
        }else{
            return Response()->json([
                'status'    => 403,
                'message'   => $this->defaultErrorMessage
            ]);
        }

    }

    public function subCategories(){
        $categories = SubCategory::with('parentCategory')->get();
        return Response()->json([
            'status'    => 200,
            'categories'    => $categories
        ]);
    }

    public function editSubCategory($id){
        $category = SubCategory::find($id);
        if($category){
            return Response()->json([
                'status'    => 200,
                'category'  => $category
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category Not Found'
            ]);
        }
    }

    public function updateSubCategory(Request $request){
        $validator = Validator::make($request->all(),[
            'name'  => 'required|string|max:255',
            'url'   => 'required|string|max:255',
            'parent'    => 'required',
            'status'    => 'required',
            'id'    => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        

        $category = SubCategory::find($request->id);

        $category->name = $request->name;
        if($request->url == $category->url){
            $url = $request->url;
        }else{
            $request->validate([
                'url'   => 'unique:sub_categories,url'
            ]);
            $url = $this->createSubCategoryUrl($request->url);
        }

        $category->url = $url;
        $category->parent = $request->parent;
        $category->status = $request->status;
        if($category->update()){
            return Response()->json([
                'status'    => 200,
                'message'   => $this->defaultSuccessMessage('Sub Category')
            ]);
        }

        
    }

    public function deleteSubCategory($id){
        $category = SubCategory::find($id);

        if($category){
            $category->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Successfully Delete'
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Sub Category not found.'
            ]);
        }

    }

    public function getSubSubCategoryList(){
        $subcategories = SubCategory::where('status',1)->get();
        if($subcategories){
            return Response()->json([
                'status'    => 200,
                'subsubcategories'  => $subcategories
            ]);
        }
    }

    protected function createSubSubCategoryUrl($name){
        $slug = preg_replace("/-$/","",preg_replace('/[^a-z0-9]+/i', "-", strtolower($name)));
            $category = SubSubCategory::where('url',$slug)->get();
            $allCategories = SubSubCategory::all();
            if($category->count() > 0){
                $slug = $slug . '-' . $allCategories->count();
            }
            return $slug;
    }

    public function addSubSubCategory(Request $request){
        $validator = Validator::make($request->all(),[
            'name'  => 'required|string|max:255',
            'parent'    => 'required',
            'status'    => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $category = new SubSubCategory;

        $category->name = $request->name;
        $category->url = $this->createSubSubCategoryUrl($request->name);
        $category->parent = $request->parent;
        $category->status = $request->status;
        if($category->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => $this->defaultSuccessMessage('Category')
            ]);
        }else{
            return Response()->json([
                'status'    => 403,
                'message'   => $this->defaultErrorMessage
            ]);
        }
    }

    public function getSubSubCategories(){
        $categories = SubSubCategory::with('parentCategory')->get();
        return Response()->json([
            'status'    => 200,
            'categories'    => $categories
        ]);
    }

    public function deleteSubSubCategory($id){
        $category = SubSubCategory::find($id);
        if($category){
            $category->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Delete Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }

    public function editSubSubCategories($id){
        $category = SubSubCategory::find($id);
        if($category){
            return Response()->json([
                'status'    => 200,
                'category'  => $category
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }

    public function updateSubSubCategory(Request $request){
        $validator = Validator::make($request->all(),[
            'name'  => 'required|string|max:255',
            'url'   => 'required|string|max:255',
            'parent'    => 'required',
            'status'    => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $category = SubSubCategory::find($request->id);

        if($category){
            $category->name = $request->name;
            if($category->url == $request->url){
                $url = $request->url;
            }else{
                // $request->validate([
                //     'url'   => 'unique:sub_sub_categories,url'
                // ]);
                $url = $this->createSubSubCategoryUrl($request->url);
            }

            $category->url = $url;
            $category->parent = $request->parent;
            $category->status = $request->status;
            if($category->update()){
                return Response()->json([
                    'status'    => 200,
                    'message'   => 'Category update successfully'
                ]);
            }else{
                return Response()->json([
                    'status'    => 401,
                    'message'   => $this->defaultErrorMessage
                ]);
            }
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found'
            ]);
        }


    }
}
