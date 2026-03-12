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
            $table->float('price',  2)->after('instructor_role');
            $table->text('description')->nullable()->after('price');
            $table->json('what_you_learn')->nullable()->after('description');
            $table->json('materials_included')->nullable()->after('what_you_learn');
            $table->json('requirements')->nullable()->after('materials_included');
            $table->json('tags')->nullable()->after('requirements');
            $table->text('audience')->nullable()->after('tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn([
                'price',
                'description',
                'what_you_learn',
                'materials_included',
                'requirements',
                'tags',
                'audience'
            ]);
        });
    }
};
