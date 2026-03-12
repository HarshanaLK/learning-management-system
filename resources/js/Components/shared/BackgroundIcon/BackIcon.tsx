import React from 'react';
import BackgroundIcon from './BackgroundIcon'; // Assuming this is your BackgroundIcon component

export default function Background() {
    return (
        <div className="relative w-full h-screen"> {/* Parent container */}
            {/* First Icon */}
            <div className="absolute top-10 left-10">
                <BackgroundIcon />
            </div>
            {/* Second Icon */}
            <div className="absolute top-32 right-12">
                <BackgroundIcon fillColor="#FFCDD2" /> {/* You can change the color */}
            </div>
            {/* Third Icon */}
            <div className="absolute bottom-20 left-1/4">
                <BackgroundIcon fillColor="#BBDEFB" /> {/* Another color variation */}
            </div>
            {/* Fourth Icon */}
            <div className="absolute bottom-32 right-1/3">
                <BackgroundIcon fillColor="#C8E6C9" />
            </div>
            {/* Other website content goes here */}
            <div className="relative z-10 p-8">
                <h1 className="text-4xl font-bold">Website Content</h1>
                <p>Your website content will stay unaffected and overlay the icons.</p>
            </div>
        </div>
    );
}
