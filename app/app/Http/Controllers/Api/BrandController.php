<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Validator;
use Image;

class BrandController extends Controller
{
    public function add(Request $request){
        $validator = Validator::make($request->all(),[
            'name'      => 'required|string|max:255',
            'image'     => 'mimes:jpg,png,jpeg,gif'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        if($request->hasFile('image')){
            $image = $request->file('image');
            $name = $image->getClientOriginalName() . '_' . time() . '_rh.'.$image->getClientOriginalExtension();
            $path = 'brand/' . $name;
            Image::make($image)->save($path);
            // Image::make($image)->save($path,80);
            
        }else{
            $name = null;
        }

        $brand = new Brand;
        $brand->name = $request->name;
        $brand->image = $name;
        if($brand->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Brand Successfully saved'
            ]);
        }else{
            return Response()->json([
                'status'    => 403,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }

    public function all(){
        $brand = Brand::all();
        return Response()->json([
            'status'    => 200,
            'brands'    => $brand
        ]);
    }

    public function edit($id){
        $brand = Brand::find($id);
        if($brand){
            return Response()->json([
                'status'    => 200,
                'brand'     => $brand
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Brand not found'
            ]);
        }
    }

    public function update(Request $request){
        $brand = Brand::find($request->id);

        if($request->hasFile('image')){
            $image = $request->file('image');
            $name = $image->getClientOriginalName() . '_' . time() . '_rh.'.$image->getClientOriginalExtension();
            $path = 'brand/' . $name;
            Image::make($image)->save($path);
            // Image::make($image)->save($path,80);
            $brand->image = $name;
            
        }

        if($brand){
            $brand->name = $request->name;
            if($brand->update()){
                return Response()->json([
                    'status'    => 200,
                    'message'   => 'Brand update successfully'
                ]);
            }
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Brand not found'
            ]);
        }
    }

    public function delete($id){
        $brand = Brand::find($id);
        if($brand){
            $brand->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Brand delete successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Brand not found'
            ]);
        }
    }
}
