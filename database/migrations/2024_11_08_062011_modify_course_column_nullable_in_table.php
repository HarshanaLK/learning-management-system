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
        Schema::table('courses', function (Blueprint $table) {
            $table->string('instructor_image')->nullable()->change();
            $table->float('price',  2)->nullable()->change();
            $table->string('title')->nullable()->change();
            $table->string('author')->nullable()->change();
            $table->integer('lessons')->nullable()->change();
            $table->string('image')->nullable()->change();
            $table->float('rating', 2)->nullable()->change();
            $table->string('instructor_role')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('instructor_image')->nullable(false)->change();
            $table->float('price',  2)->nullable(false)->change();
            $table->string('title')->nullable(false)->change();
            $table->string('author')->nullable(false)->change();
            $table->integer('lessons')->nullable(false)->change();
            $table->string('image')->nullable(false)->change();
            $table->float('rating', 2)->nullable(false)->change();
            $table->string('instructor_role')->nullable(false)->change();
            //
        });
    }
};
