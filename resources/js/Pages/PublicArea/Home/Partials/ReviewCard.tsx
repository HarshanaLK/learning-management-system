import React from 'react';

interface ReviewCardProps {
    name: string;
    avatarUrl: string;
    reviewText: string;
    rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, avatarUrl, reviewText, rating }) => {
    const starRating = Array(5).fill(0).map((_, i) => (
        <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < rating ? "#FAB437" : "#CBC2FF"}
            viewBox="0 0 17 14"
            width="17"
            height="14"
        >
            <path d="M8.32984 0.354614L10.2777 5.51343L16.5812 5.51343L11.4816 8.70175L13.4295 13.8606L8.32984 10.6722L3.2302 13.8606L5.17809 8.70175L0.0784435 5.51343L6.38195 5.51343L8.32984 0.354614Z"  />
        </svg>

    ));

    return (
        <div className="bg-white rounded-[28px] shadow-feedbackBox p-7 max-w-sm mx-auto flex flex-col justify-between sm:h-full h-[320px] hover:bg-[#D7F0FE]">

            <div>
                <div className="flex items-center mb-4">
                    <img
                        src={avatarUrl}
                        alt={`${name}'s avatar`}
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
                    </div>
                </div>
                <p className="text-gray-600 text-base mb-4">
                    {reviewText}
                </p>
            </div>
            <div className="flex items-center mt-auto gap-1">
                {starRating}
            </div>
        </div>


    );
};

export default ReviewCard;
