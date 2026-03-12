import React from 'react';

export default function BackgroundIcon({ fillColor = "#CBC2FF" }) { // Set a default color
    return (
        <div className="max-w-7xl mx-auto -z-10">
            <svg
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-12 lg:w-16 lg:h-14" // Responsive widths and heights
                viewBox="0 0 58 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M42.8692 1.52776C49.6487 -1.72652 57.4594 3.38546 57.1903 10.9007L55.7514 51.0958C55.4727 58.8785 46.7977 63.37 40.2815 59.1052L5.46086 36.3157C-1.05536 32.0509 -0.411199 22.3034 6.60958 18.9333L42.8692 1.52776Z" fill={fillColor} />
            </svg>
        </div>
    );
}
