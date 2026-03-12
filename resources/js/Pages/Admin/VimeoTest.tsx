import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import InputError from '@/Components/elements/inputs/InputError';

const VimeoTest: React.FC = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<any>({}); // To store validation errors

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setVideo(file);
    // Clear previous errors when a new file is selected
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!video) {
      setErrors({ video: 'Please select a video to upload.' }); // Add error for missing video
      return;
    }

    const formData = new FormData();
    formData.append('video', video);

    Inertia.post('/video-upload', formData, {
      onSuccess: (page) => {
        setMessage('Video uploaded successfully!');
        setErrors({}); // Clear errors on successful upload
      },
      onError: (errors) => {
        setMessage('Video upload failed.');
        setErrors(errors); // Store errors returned from the server
      },
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Video to Vimeo</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <input
            type="file"
            onChange={handleVideoChange}
            accept="video/*"
            className="border border-gray-300 p-2 rounded"
          />
          {errors.video && <InputError message={errors.video} />}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Upload Video
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
};

export default VimeoTest;
