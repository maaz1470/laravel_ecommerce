<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'  => 'required|string|max:255|min:2',
            'email' => 'required|email|unique:admins,email',
            'username'  => 'required|string|max:255|unique:admins,username',
            'password'  => 'required|string|min:6',
            'confirmPassword'   => 'required|string|min:6|same:password'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $admin = new Admin;
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->username = $request->username;
        $admin->password = Hash::make($request->confirmPassword);
        $admin->status = 1;
        $admin->verify = 1;
        $admin->role = 1;
        if($admin->save()){
            $token = $admin->createToken($request->email);
            return Response()->json([
                'status'    => 200,
                'token'     => $token->plainTextToken,
                'message'   => 'Admin Registration Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 403,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }

    public function userLogin(Request $request){
        $validator = Validator::make($request->all(),[
            'username'  => 'required|string|max:255',
            'password'  => 'required|string'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'   => $validator->errors()->all()
            ]);
        }

        $admin = Admin::where('username',$request->username)->get()->first();
        if($admin){
            if(Hash::check($request->password,$admin->password)){
                $token = $admin->createToken($admin->email);
                return Response()->json([
                    'status'    => 200,
                    'token'   => $token->plainTextToken,
                    'message'   => 'You are Login Successfully'
                ]);
            }else{
                return Response()->json([
                    'status'    => 403,
                    'error'   => 'Username or Password not valid'
                ]);
            }
        }else{
            return Response()->json([
                'status'    => 403,
                'error'   => 'Username or Password not valid'
            ]);
        }
    }

    public function userLogout(Request $request){
        if(auth()->user()->tokens()->delete()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Logout Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 403,
                'error'     => 'Something went wrong. Please try again.'
            ]);
        }
    }
}
