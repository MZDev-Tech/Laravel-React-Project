<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adoptions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('pet');
            $table->string('category');
            $table->string('fee');
            $table->string('user');
            $table->string('email');
            $table->string('contact');
            $table->string('city');
            $table->string('shippingAddress');
            $table->string('date');
            $table->string('previous_pet');
            $table->string('experience');
            $table->string('house');
            $table->string('petspace');
            $table->string('payment_id');
            $table->string('payment_amount');
            $table->string('payment_currency');
            $table->string('delivery_status');
            $table->string('image');
            $table->string('orderNumber');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adoptions');
    }
};
