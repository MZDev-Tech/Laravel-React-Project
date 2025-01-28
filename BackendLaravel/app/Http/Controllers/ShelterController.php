<?php

namespace App\Http\Controllers;
use App\Models\shelter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ShelterController extends Controller
{
    function fetchShelter(Request $req)
    {
        return shelter::all();
    }

    function addShelter(Request $req)
    {
        $shelter = new shelter;

        $req->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'detail' => 'required|string',
            'image' => 'nullable|mimes:jpg,png,gif,jpeg|max:5120',
            'link' => 'required|string',

        ]);

        $shelter->name = $req->name;
        $shelter->detail = $req->detail;
        $shelter->location = $req->location;
        $shelter->image = $req->file('image')->store('images', 'public');
        $shelter->link = $req->link;

        $shelter->save();

        return response()->json(['message', 'data add successfully'], 201);

    }


    function deleteShelter($id)
    {
        $shelter = shelter::find($id);

        if (!$shelter) {
            return response()->json(['message', 'shelter not found'], 404);
        }

        Storage::disk('public')->delete($shelter->image);
        $shelter->delete();
        return response()->json(['message', 'data delete successfully'], 201);

    }

    function shelterById($id)
    {
        $shelter = shelter::find($id);
        if (!$shelter) {
            return response()->json(['message', 'shelter id not found'], 404);
        }
        return response()->json($shelter, 201);
    }

    function updateShelter(Request $req, $id)
    {
        $shelter = shelter::find($id);
        $req->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'detail' => 'required|string',
            'image' => 'nullable|mimes:jpg,png,gif,jpeg|max:5120',
            'link' => 'required|string|max:255'


        ]);

        $shelter->name=$req->name;
        $shelter->location=$req->location;
        $shelter->detail=$req->detail;
        $shelter->link=$req->link;

        if($req->hasFile('image')){
            if(Storage::disk('public')->exists($shelter->image)){
                Storage::disk('public')->delete($shelter->image);

            }
            $shelter->image=$req->file('image')->store('images','public');
        }
        $shelter->save();
        return response()->json(['message','shelter update successfully'],201);
    }

    function singleShelter(Request $req,$id){
        $shelter=shelter::where('id',$id)->first();
        if (!$shelter) {
            return response()->json(['message' => 'Shelter not found'], 404);
        }
        return response()->json($shelter,201);
    }


}
