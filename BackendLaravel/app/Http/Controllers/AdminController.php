<?php

namespace App\Http\Controllers;

use App\Models\admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    // Get all admin data
    public function getAdmin()
    {
        $admin = Auth::guard('admin-api')->user();
        if ($admin) {
            return response()->json($admin);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function addAdmin(Request $req)
    {
        $req->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'image' => 'nullable|image|mimes:jpg,jpeg,gif,png|max:5120',
        ]);

        $admin = new Admin;
        $admin->name = $req->name;
        $admin->email = $req->email;
        $admin->password = Hash::make($req->password);
        $admin->image = $req->file('image')->store('images', 'public');
        $admin->save();
        return response()->json(['message' => 'admin added successfully.'], 201);

    }

    // Admin login logic

    public function adminLogin()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth('admin-api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('admin-api')->factory()->getTTL() * 60
        ]);
    }

    // Fetch admin by ID
    public function getAdminById($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        return response()->json($admin);
    }

    // Update admin details
    public function updateAdmin(Request $request, $id)
    {
        $admin = Admin::find($id);
    
        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }
    
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:admins,email,' . $id,
            'password' => 'nullable|string|min:6',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $admin->name = $request->name;
        $admin->email = $request->email;

    // Only update password if a new password is provided
        if (!empty($request->password)) {
            $admin->password = Hash::make($request->password);
        }
    
        if ($request->hasFile('image')) {
            $admin->image = $request->file('image')->store('images', 'public');
        }
    
        $admin->save();
    
        return response()->json(['message' => 'Admin updated successfully']);
    }
    

    // Admin logout
    public function logout()
    {
        auth()->logout();

        return response()->json(data: ['message' => 'Successfully logged out']);
    }
}

