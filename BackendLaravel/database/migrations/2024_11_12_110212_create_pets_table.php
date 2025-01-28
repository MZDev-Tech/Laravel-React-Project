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
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->string('pet');
            $table->string('category');
            $table->integer('age');
            $table->string('price');
            $table->string('breed');
            $table->string('gender');
            $table->string('health');
            $table->string('size');
            $table->string('color');
            $table->string('location');
            $table->date('publish_date');
            $table->string('energylevel');
            $table->string('friendliness');
            $table->string('ease_of_training');
            $table->string('vendor');
            $table->string('status');
            $table->text('detail');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
