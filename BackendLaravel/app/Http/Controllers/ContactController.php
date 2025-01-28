<?php

namespace App\Http\Controllers;
use App\Models\contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContactController extends Controller
{
    function fetchContact(Request $req)
    {
        return contact::all();
    }

    function addContact(Request $req)
    {

       $validation= $req->validate([
        'name'=>'required|string',
        'email'=>'required|email',
        'phone'=>'required|min:6',
        "message"=>'required|string',
        ]);
        if($validation){

        $contact = new contact;
        $contact->name = $req->name;
        $contact->email = $req->email;
        $contact->phone = $req->phone;
        $contact->message = $req->message;

        $contact->save();

        return response()->json(['message', 'data add successfully'], 201);
        }
        else{
            return response()->json(['errors' => $validation], 422); // Return validation errors

        }

    }






}
