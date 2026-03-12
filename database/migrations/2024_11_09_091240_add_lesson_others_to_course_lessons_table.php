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
            $table->string('lesson_video')->nullable()->after('lesson_title');
            $table->text('lesson_note')->nullable()->after('lesson_duration');
            $table->json('lesson_files')->nullable()->after('lesson_note');
            $table->text('lesson_description')->nullable()->after('lesson_files');
            $table->text('lesson_introduction')->nullable()->after('lesson_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('course_lessons', function (Blueprint $table) {
            //
        });
    }
};
