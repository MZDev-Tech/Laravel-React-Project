<?php

namespace App\Http\Controllers;
use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    function fetchCategory(Request $req)
    {
        return category::all();
    }

    function addCategory(Request $req)
    {
        $category = new category;

        $req->validate([
            'name' => 'required|string|max:255',
            'detail' => 'required|string',
            'image' => 'nullable|mimes:jpg,png,gif,jpeg|max:5120'
        ]);

        $category->name = $req->name;
        $category->detail = $req->detail;
        $category->image = $req->file('image')->store('images', 'public');
        $category->save();

        return response()->json(['message', 'data add successfully'], 201);

    }


    function deleteCategory($id)
    {
        $category = category::find($id);

        if (!$category) {
            return response()->json(['message', 'category not found'], 404);
        }

        Storage::disk('public')->delete($category->image);
        $category->delete();
        return response()->json(['message', 'data delete successfully'], 201);

    }

    function categoryById($id)
    {
        $category = category::find($id);
        if (!$category) {
            return response()->json(['message', 'category id not found'], 404);
        }
        return response()->json($category, 201);
    }

    function updateCategory(Request $req, $id)
    {
        $category = category::find($id);
        $req->validate([
            'name' => 'required|string|max:255',
            'detail' => 'required|string',
            'image' => 'nullable|mimes:jpg,png,gif,jpeg|max:5120'
        ]);

        $category->name=$req->name;
        $category->detail=$req->detail;
        if($req->hasFile('image')){
            if(Storage::disk('public')->exists($category->image)){
                Storage::disk('public')->delete($category->image);

            }
            $category->image=$req->file('image')->store('images','public');
        }
        $category->save();
        return response()->json(['message','category update successfully'],201);

    

    }


}
