<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pet;

use App\Models\contact;
use App\Models\User;
use App\Models\adoption;

class DashboardController extends Controller
{
    public function countPets()
{
    return Pet::count();
    
}

public function countContact()
{
    return contact::count();
}


public function countAdoption()
{
    return adoption::count();
}

public function countUser()
{
    return User::count();
}
}
