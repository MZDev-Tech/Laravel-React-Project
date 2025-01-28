<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ShelterController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdoptionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::controller(CategoryController::class)->group(function(){
    Route::get('/fetchCategory', 'fetchCategory');
    Route::post('/addCategory', 'addCategory');
    Route::delete('/deleteCategory/{id}', 'deleteCategory');
    Route::get('/CategoryById/{id}', 'categoryById');
    Route::put('/updateCategory/{id}', 'updateCategory');
});


Route::controller(ShelterController::class)->group(function(){
    Route::get('/fetchShelter', 'fetchShelter');
    Route::post('/addShelter', 'addShelter');
    Route::delete('/deleteShelter/{id}', 'deleteShelter');
    Route::get('/ShelterById/{id}', 'shelterById');
    Route::get('/singleShelter/{id}', 'singleShelter');
    Route::put('/updateShelter/{id}', 'updateShelter');
});


Route::controller(FeedbackController::class)->group(function(){
    Route::get('/fetchFeedback', 'fetchFeedback');
    Route::post('/addFeedback', 'addFeedback');
    Route::delete('/deleteFeedback/{id}', 'deleteFeedback');
    Route::get('/FeedbackById/{id}', 'feedbackById');
    Route::get('/singleFeedback/{id}', 'singleFeedback');
    Route::put('/updateFeedback/{id}', 'updateFeedback');
});


Route::controller(ContactController::class)->group(function(){
    Route::get('/fetchContact', 'fetchContact');
    Route::post('/addContact', 'addContact');
});


Route::controller(PetController::class)->group(function(){
    Route::get('/fetchPet', 'fetchPets');
    Route::post('/addPet', 'addPet');
    Route::delete('/deletePet/{id}', 'deletePet');
    Route::get('/PetById/{id}', 'petById');
    Route::put('/updatePet/{id}', 'updatePet');
});


Route::controller(DashboardController::class)->group(function(){
    Route::get('/totalPets', 'CountPets');
    Route::get('/totalContacts', 'CountContact');
    Route::get('/totalAdoptions', 'CountAdoption');
    Route::get('/totalUsers', 'CountUser');


});


Route::controller(AdoptionController::class)->group(function(){
    Route::get('/fetchAdoption', 'fetchAdoption');
    Route::post('/addAdoption', 'addAdoption');
    Route::post('/paymentCheckout', 'sendPayment');
    Route::post('/trackOrder', 'trackYourOrder');
    Route::get('/get-session/{session_id}', 'getSessionDetails');
    Route::get('/fetchAdoptionByOrder/{orderNumber}', 'fetchAdoptionByOrder');

    Route::delete('/deleteAdoption/{id}', 'deleteAdoption');
    Route::get('/adoptionById/{id}', 'adoptionById');
    Route::put('/updateAdoption/{id}', 'updateAdoption');
});


Route::controller(AdminController::class)->group(function(){
Route::get('/fetchAdmin','getAdmin')->middleware('auth:admin-api');
Route::post('/registerAdmin','addAdmin');
Route::post('/adminLogin','adminLogin');
Route::get('/getAdminById/{id}','getAdminById')->middleware('auth:admin-api');;
Route::put('/updateAdmin/{id}','updateAdmin')->middleware('auth:admin-api');;
Route::post('/logout','logout')->middleware('auth:admin-api');
});


Route::controller(UserController::class)->group(function(){
    Route::get('/fetchUser','getUser');
    Route::get('/getAuthenticatedUser','getAuthenticatedUser')->middleware('auth:user-api');
    Route::put('/updateUserProfile','updateUserProfile');
    Route::post('/registerUser','registerUser');
    Route::post('/UserLogin','UserLogin');
    Route::get('/getUserById/{id}','getUserById');
    Route::put('/updateUser/{id}','updateUser');
    Route::delete('/deleteUser/{id}','deleteUser');
    Route::post('/verifyUserToken','verifyToken');
    Route::post('/logout','logout');
    });