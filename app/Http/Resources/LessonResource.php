<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource {
    public function toArray($request) {
        return [
            'id' => $this->id,
            'lesson_title' => $this->lesson_title,
            'lesson_video' => $this->lesson_video,
            'completion' => $this->completion,
            'lesson_description' => $this->lesson_description,
        ];
    }
}
