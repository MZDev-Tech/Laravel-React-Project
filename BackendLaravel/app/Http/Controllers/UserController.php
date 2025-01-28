<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function getUser(Request $req)
    {
        return User::all();
    }

    function getAuthenticatedUser(Request $req){
    $user=Auth::gurd('user-api')->user();
    if(!$user){
    return response()->json(['message'=>'Unauthorized User'],401);
    }
    return response()->json([
        'id'=>$user->id,
        'name'=>$user->name,
        'email'=>$user->email,
    ]);
    }


    function updateUserProfile(Request $req){
        $user=Auth::gurd('user-api')->user();
        if(!$user){
            return response()->json(['message'=>'Unauthorized'],401);
        }
        $rules = [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6', 
        ];

        $validator=Validator::make($req->all(),$rules);
        if(!$validator){
            return response()->json($validator->errors(), 422);
        }

            // Update user details
    $user->name = $req->name;
    $user->email = $req->email;

    if ($req->filled('password')) {
        $user->password = Hash::make($req->password);
    }

    $user->save();
    return response()->json(['message' => 'User profile updated successfully'], 200);
}


    
    function registerUser(Request $req)
    {
        $req->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
        ]);

        $user->save();
        return response()->json(['message' => 'user add successfully'], 201);

    }


    public function userLogin()
{
    $credentials = request(['email', 'password']);

    if (!$token = auth('user-api')->attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Get the authenticated user
    $user = auth('user-api')->user();

    // Respond with the token and user data
    return $this->respondWithToken($token, $user);
}

protected function respondWithToken($token, $user)
{
    return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => auth('user-api')->factory()->getTTL() * 60,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]
    ]);
}



    function getUserById($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message', 'Id not found'], 404);

        }
        return response()->json($user);

    }

    function updateUser(Request $req, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User ID not found'], 404);
        }
    
        // Update validation rules
        $rules = [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6', // Allow password to be optional
        ];
    
        $validator = Validator::make($req->all(), $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Update user details
        $user->name = $req->name;
        $user->email = $req->email;
    
        // Only hash and update the password if provided
        if ($req->has('password') && !empty($req->password)) {
            $user->password = Hash::make($req->password);
        }
    
        $user->save();
        return response()->json(['message' => 'User details updated successfully'], 201);
    }
    

    function deleteUser($id){
        $user=User::find($id);
        if(!$user){
            return response()->json(['message','id not found'],404);
        }
        

        $user->delete();
        return response()->json(['message','delete successfully'],201);
    }


    function verifyToken(Request $req){
        $token=$req->input('token');
        if (!$token) {
            return response()->json(['isValid' => false, 'message' => 'Token is missing']);
        }
        try{

            $token_decoded=JWTAuth::setToken($token)->getPayload()->toArray();
           return response()->json(['isValid'=>true, 'user'=> $token_decoded]);
        }
        catch(JWTException $e){
         return response()->json(['isValid'=>false,'message'=>$e->getMessage()]);
        }


    }

    function logout()
    {
        auth()->logout();
        return response()->json(data: ['message' => 'Successfully logged out']);

    }

}
