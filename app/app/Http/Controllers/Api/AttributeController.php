<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Attribute;
use GuzzleHttp\Psr7\Response;

class AttributeController extends Controller
{
    public function add(Request $request){
        $validator = Validator::make($request->all(),[
            'name'      => 'required|string|max:255'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $attribute = new Attribute;

        $attribute->name = $request->name;
        if($attribute->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Attribute Successfully saved.'
            ]);
        }

    }

    public function all(){
        $attributes = Attribute::all();
        return Response()->json([
            'status'    => 200,
            'attributes'    => $attributes
        ]);
    }

    public function edit($id){
        $attribute = Attribute::find($id);
        if($attribute){
            return Response()->json([
                'status'        => 200,
                'attribute'     => $attribute
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Attribute not found.'
            ]);
        }
    }

    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'name'  => 'required|string|max:255'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $attribute = Attribute::find($request->id);
        if($attribute){
            $attribute->name = $request->name;
            if($attribute->update()){
                return Response()->json([
                    'status'    => 200,
                    'message'   => 'Attribute saved successfully'
                ]);
            }else{
                return Response()->json([
                    'status'    => 403,
                    'message'   => 'Something went wrong. Please try again.'
                ]);
            }
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Attribute not found.'
            ]);
        }
    }

    public function delete($id){
        $attribute = Attribute::find($id);
        if($attribute){
            $attribute->delete();
            return Response()->json([
                'status'    => 200,
                'message'    => 'Attribute delete successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Attribute delete successfully'
            ]);
        }
    }
}
