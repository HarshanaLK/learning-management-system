<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */

    public function toArray($request)
    {

        $userTimezone = $request->user()->timezone ?? config('app.timezone');
        return [
            'id' => $this->id,
            'title' => $this->title,
            'price' => $this->price,
            'purchased_count' => $this->purchased_count,
            'purchased_income' => $this->purchased_income,
            'course_status' => $this->course_status,
            'formatted_date' => Carbon::parse($this->created_at)
                ->setTimezone($userTimezone)
                ->format('Y-m-d'),
            'formatted_time' => Carbon::parse($this->created_at)
                ->setTimezone($userTimezone)
                ->format('h:i a'),
        ];
    }
}
