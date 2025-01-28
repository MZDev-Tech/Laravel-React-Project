<?php

namespace App\Http\Controllers;
use App\Models\feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FeedbackController extends Controller
{
    function fetchFeedback(Request $req)
    {
        return feedback::all();
    }

    function addFeedback(Request $req)
    {
        $feedback = new feedback;

        $req->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'detail' => 'required|string',
            'image' => 'nullable|mimes:jpg,png,gif,jpeg|max:5120'
        ]);

        $feedback->name = $req->name;
        $feedback->detail = $req->detail;
        $feedback->location = $req->location;
        $feedback->image = $req->file('image')->store('images', 'public');
        $feedback->save();

        return response()->json(['message', 'data add successfully'], 201);

    }


    function deleteFeedback($id)
    {
        $feedback = feedback::find($id);

        if (!$feedback) {
            return response()->json(['message', 'feedback not found'], 404);
        }

        Storage::disk('public')->delete($feedback->image);
        $feedback->delete();
        return response()->json(['message', 'data delete successfully'], 201);

    }

    function feedbackById($id)
    {
        $feedback = feedback::find($id);
        if (!$feedback) {
            return response()->json(['message', 'feedback id not found'], 404);
        }
        return response()->json($feedback, 201);
    }

    function updateFeedback(Request $req, $id)
    {
        $feedback = feedback::find($id);
        $req->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'detail' => 'required|string',
            'image' => 'nullable|mimes:jpg,png,gif,jpeg|max:5120'

        ]);

        $feedback->name=$req->name;
        $feedback->location=$req->location;
        $feedback->detail=$req->detail;
        if($req->hasFile('image')){
            if(Storage::disk('public')->exists($feedback->image)){
                Storage::disk('public')->delete($feedback->image);

            }
            $feedback->image=$req->file('image')->store('images','public');
        }
        $feedback->save();

        return response()->json(['message','feedback update successfully'],201);
    }

    function singleFeedback(Request $req,$id){
        $Feedback=feedback::where('id',$id)->first();
        if (!$Feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }
        return response()->json($Feedback,201);
    }


}
