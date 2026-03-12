import React from 'react';

const FormSuccess: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Form Submitted Successfully!
        </h1>

        {/* Main Text */}
        <p className="text-lg font-semibold text-gray-700 mb-4">
          It is a long established fact that a reader will be distracted by the readable.
        </p>

        {/* Subtext */}
        <p className="text-gray-600 text-sm mb-6">
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
          <br />
          The standard chunk of Lorem Ipsum used since the 1500s
        </p>

        {/* Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-600">
          Got It! Thanks!
        </button>
      </div>
    </div>
  );
};

export default FormSuccess;

