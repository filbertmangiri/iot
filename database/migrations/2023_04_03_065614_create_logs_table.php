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
        Schema::create('logs', function (Blueprint $table) {
            $table->id();

            /* $table->string('device');
            $table->string('serial_number');
            $table->string('password');
            $table->double('latitude');
            $table->double('longitude');
            $table->double('temperature');
            $table->time('runtime');
            $table->time('stoptime');
            $table->enum('status', ['good', 'bad']);
            $table->enum('led_01', ['on', 'off']);
            $table->enum('led_02', ['on', 'off']);
            $table->time('time');
            $table->date('date'); */

            /* TEST ALL STRING */
            $table->string('device')->default('default-value');
            $table->string('serial_number')->default('default-value');
            $table->string('password')->default('default-value');
            $table->string('latitude')->default('default-value');
            $table->string('longitude')->default('default-value');
            $table->string('temperature')->default('default-value');
            $table->string('runtime')->default('default-value');
            $table->string('stoptime')->default('default-value');
            $table->string('status')->default('default-value');
            $table->string('led_01')->default('default-value');
            $table->string('led_02')->default('default-value');
            $table->string('time')->default('default-value');
            $table->string('date')->default('default-value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
