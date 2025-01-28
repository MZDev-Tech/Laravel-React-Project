<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\adoption;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Storage;
use Stripe\PaymentIntent;

class AdoptionController extends Controller
{
    function fetchAdoption(Request $req)
    {
        return adoption::all();
    }

    function fetchAdoptionByOrder($orderNumber)
    {
        $adoption = adoption::where('orderNumber', $orderNumber)->first();
        if (!$adoption) {
            return response()->json(['message', 'adoption record not found'], 404);

        }
        return response()->json($adoption);
    }

   // Create Payment Intent
   public function sendPayment(Request $request)
   {       
    $adoptionData = $request->input('adoptionData');
   
       // Validate incoming data
       $validatedData = $request->validate([
           'adoptionData' => 'required|array',
           'adoptionData.pet' => 'required|string',
           'adoptionData.category' => 'required|string',
           'adoptionData.image' => 'required|url', // Ensure image is a valid URL
           'adoptionData.payment_amount' => 'required|numeric|min:1',
       ]);
   
       try {
           // Set Stripe API key
           Stripe::setApiKey(config('services.stripe.secret'));
   
           // Create a checkout session
           $session = Session::create([
               'payment_method_types' => ['card'],
               'line_items' => [[
                   'price_data' => [
                       'currency' => 'pkr',
                       'product_data' => [
                           'name' => "Adopted Pet: {$adoptionData['pet']}",
                           'description' => "Pet Category: {$adoptionData['category']}",
                           'images' => [$adoptionData['image']], // Ensure this is a full URL
                       ],
                       'unit_amount' => intval($adoptionData['payment_amount'] * 100), // Stripe requires amount in cents
                   ],
                   'quantity' => 1,
               ]],
               'mode' => 'payment',
               'success_url' => 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
               'cancel_url' => 'http://localhost:3000/cancel',
               'metadata' => [
                   'adoptionData' => json_encode($adoptionData),
               ],
           ]);
   
           // Return the session ID as JSON
           return response()->json(['id' => $session->id]);
       } catch (\Exception $e) {
           // Log the specific error message for debugging
           \Log::error('Stripe Error: ' . $e->getMessage());
           return response()->json(['error' => 'Error creating checkout session'], 500);
       }
   }
   
   

    // Retrieve Session Details
    public function getSessionDetails($session_id)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            // Retrieve the session
            $session = Session::retrieve($session_id);
            return response()->json($session);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve session: ' . $e->getMessage()], 500);
        }
    }
    // Add a new adoption
    public function addAdoption(Request $request)
    {
        // Validate request data
        $request->validate([
            'adoptionData.user_id' => 'required|integer',
            'adoptionData.pet' => 'required|string',
            'adoptionData.category' => 'required|string',
            'adoptionData.fee' => 'required|numeric',
            'adoptionData.user' => 'required|string',
            'adoptionData.email' => 'required|email',
            'adoptionData.contact' => 'required|string',
            'adoptionData.city' => 'required|string',
            'adoptionData.shippingAddress' => 'required|string',
            'adoptionData.previousPet' => 'nullable|string',
            'adoptionData.experience' => 'nullable|string',
            'adoptionData.house' => 'nullable|string',
            'adoptionData.petSpace' => 'nullable|string',
            'payment_id' => 'required|string',
            'payment_amount' => 'required|numeric',
            'image'=>'nullable|url',
        ]);
    
        try {
            // Extracting data from the request
            $data = $request->input('adoptionData');
            $paymentId=$request->input('payment_id');
            $existingAdoption=Adoption::where('payment_id',$paymentId)->first();
            if($existingAdoption){
                return response()->json([
                    'success'=>false,
                    'message'=>'Adoption with this payment id already exists',
                ],400);
            }

    
            // Save adoption data to the database
            $adoption = new Adoption();
            $adoption->user_id = $data['user_id'];
            $adoption->pet = $data['pet'];
            $adoption->category = $data['category'];
            $adoption->fee = $data['fee'];
            $adoption->user = $data['user'];
            $adoption->email = $data['email'];
            $adoption->contact = $data['contact'];
            $adoption->city = $data['city'];
            $adoption->shippingAddress = $data['shippingAddress'];
            $adoption->previous_pet = $data['previousPet'];
            $adoption->experience = $data['experience'];
            $adoption->house = $data['house'];
            $adoption->petspace = $data['petSpace'];
            $adoption->payment_id = $paymentId;
            $adoption->payment_amount = $request->input('payment_amount');
            $adoption->payment_currency='Pkr';
            $adoption->delivery_status='Pending';
            $adoption->orderNumber = uniqid('order_'); // Unique order number

            if($request->hasFile('image')){
                $adoption->image=$request->file('image')->store('images','public');
            }elseif (!empty($data['image']) && filter_var($data['image'], FILTER_VALIDATE_URL)) {
                $adoption->image = $data['image']; // Save the URL directly
            } else{
                $adoption->image = null;
            }

            $adoption->save();
    
            return response()->json([
                'success' => true,
                'message' => 'Adoption saved successfully',
                'orderNumber' => $adoption->orderNumber,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save adoption',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

    function getAdoptionById($id)
    {
        $Adoption = Adoption::find($id);
        if (!$Adoption) {
            return response()->json(['message' => 'Adoption not found'], 404);
        }
        return response()->json($Adoption, 200);
    }

    // Update adoption delivery status
    public function updateAdoption(Request $request, $id)
    {
        $adoption = Adoption::find($id);

        if (!$adoption) {
            return response()->json(['message' => 'Adoption not found'], 404);
        }

        $adoption->delivery_status = $request->input('delivery_status');

        // Handle image update if a new image is provided
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if (Storage::disk('public')->exists($adoption->image)) {
                Storage::disk('public')->delete($adoption->image);
            }
            // Store the new image
            $adoption->image = $request->file('image')->store('images', 'public');
        }

        $adoption->save();

        return response()->json(['message' => 'Delivery Status updated successfully']);
    }

    // Delete adoption request
    public function deleteAdoption($id)
    {
        $adoption = Adoption::find($id);

        if (!$adoption) {
            return response()->json(['message' => 'Adoption not found'], 404);
        }

        // Delete the image from storage if it exists
        if (Storage::disk('public')->exists($adoption->image)) {
            Storage::disk('public')->delete($adoption->image);
        }

        $adoption->delete();

        return response()->json(['message' => 'Adoption deleted successfully']);
    }

    // Track order by order number and contact
    public function trackYourOrder(Request $request)
    {
        $orderNumber = $request->input('orderNumber');
        $contact = $request->input('contact');

        if (!$orderNumber || !$contact) {
            return response()->json(['message' => 'Order number and contact are required'], 400);
        }

        $adoption = Adoption::where('orderNumber', $orderNumber)->where('contact', $contact)->first();

        if (!$adoption) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json(['message' => 'Order found', 'adoptionDetails' => $adoption]);
    }


}


