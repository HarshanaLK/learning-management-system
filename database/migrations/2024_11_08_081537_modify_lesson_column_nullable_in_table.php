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
        Schema::table('course_lessons', function (Blueprint $table) {
            $table->string('lesson_title')->nullable()->change();
            $table->string('lesson_duration')->nullable()->change();
            $table->integer('lesson_order')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('course_lessons', function (Blueprint $table) {
            $table->string('lesson_title')->nullable(false)->change();
            $table->string('lesson_duration')->nullable(false)->change();
            $table->integer('lesson_order')->nullable(false)->change();
        });
    }
};
