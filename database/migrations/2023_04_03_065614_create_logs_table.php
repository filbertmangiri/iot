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
            $table->string('device');
            $table->string('serial_number');
            $table->string('password');
            $table->string('latitude');
            $table->string('longitude');
            $table->string('temperature');
            $table->string('runtime');
            $table->string('stoptime');
            $table->string('status', ['good', 'bad']);
            $table->string('led_01', ['on', 'off']);
            $table->string('led_02', ['on', 'off']);
            $table->string('time');
            $table->string('date');
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
