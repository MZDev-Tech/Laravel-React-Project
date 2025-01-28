<?php

namespace App\Http\Controllers;

use App\Models\pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PetController extends Controller
{
    // Fetch all pets
    function fetchPets(Request $req)
    {
        return pet::all();
    }

    // Add a new pet
    function addPet(Request $req)
    {
        // Validation (uncomment as needed)
        // $req->validate([
        //     'pet' => 'required|string|max:255',
        //     'category' => 'required|string|max:255',
        //     'image' => 'nullable|mimes:jpg,png,gif,jpeg|max:5120',
        // ]);
    
        $pet = new pet;
        $pet->pet = $req->pet;
        $pet->category = $req->category;
        $pet->age = $req->age;
        $pet->price = $req->price;
        $pet->breed = $req->breed;
        $pet->gender = $req->gender;
        $pet->health = $req->health;
        $pet->size = $req->size;
        $pet->color = $req->color;
        $pet->location = $req->location;
        $pet->publish_date = $req->publish_date;
        $pet->energylevel = $req->energylevel;
        $pet->friendliness = $req->friendliness;
        $pet->ease_of_training = $req->ease_of_training;
        $pet->vendor = $req->vendor;
        $pet->status = $req->status;
        $pet->detail = $req->detail;
    
        // Check if an image file was uploaded before storing
        if ($req->hasFile('image')) {
            $pet->image = $req->file('image')->store('images', 'public');
        } else {
            $pet->image = null; // or set a default image path if needed
        }
    
        $pet->save();
    
        return response()->json(['message' => 'Pet added successfully'], 200);
    }
    

    // Delete a pet by ID
 
    function deletePet($id)
    {
        $pet = pet::find($id);

        if (!$pet) {
            return response()->json(['message', 'pet not found'], 404);
        }

        Storage::disk('public')->delete($pet->image);
        $pet->delete();
        return response()->json(['message', 'data delete successfully'], 201);

    }
    // Fetch a single pet by ID
    function petById($id)
    {
        $pet = pet::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet not found'], 404);
        }

        return response()->json($pet, 200);
    }

    // Update pet details by ID
    function updatePet(Request $req, $id)
    {
        $petData = pet::find($id);

        if (!$petData) {
            return response()->json(['message' => 'Pet not found'], 404);
        }
        

        $petData->pet = $req->pet;
        $petData->category = $req->category;
        $petData->age = $req->age;
        $petData->price = $req->price;
        $petData->breed = $req->breed;
        $petData->gender = $req->gender;
        $petData->health = $req->health;
        $petData->size = $req->size;
        $petData->color = $req->color;
        $petData->location = $req->location;
        $petData->publish_date = $req->publish_date;
        $petData->energylevel = $req->energylevel;
        $petData->friendliness = $req->friendliness;
        $petData->ease_of_training = $req->ease_of_training;
        $petData->vendor = $req->vendor;
        $petData->status = $req->status;
        $petData->detail = $req->detail;

        if ($req->hasFile('image')) {
            if (Storage::disk('public')->exists($petData->image)) {
                Storage::disk('public')->delete($petData->image);
            }
            $petData->image = $req->file('image')->store('images', 'public');
        }

        $petData->save();

        return response()->json(['message' => 'Pet updated successfully'], 200);
    }
}
