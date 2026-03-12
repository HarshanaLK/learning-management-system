import React from "react";
import ReviewCard from "./ReviewCard";

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Jacob Jones",
            reviewText:
                "Esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.Esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
            rating: 4,
            avatar: "/assets/images/course.webp", // Replace with actual avatar image link
        },
        {
            name: "Emily Clark",
            reviewText:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
            rating: 5,
            avatar: "/assets/images/course.webp", // Replace with actual avatar image link
        },
        {
            name: "Michael Smith",
            reviewText:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            rating: 3,
            avatar: "/assets/images/course.webp", // Replace with actual avatar image link
        },
    ];

    return (
        <section className=" py-10 ">
            <div className="text-center mb-10 max-w-[30rem] mx-auto">
                <h1 className="text-[2.5rem] font-bold leading-[3.026rem]"> {/* Adjust leading-tight as needed */}
                    See what Our Students Say <span className="text-join">About Us</span>
                </h1>
            </div>

            <div className="flex justify-center mt-1 items-center px-4 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center ">
                    {testimonials.map((testimonial, index) => (
                        <ReviewCard
                            key={index}
                            name={testimonial.name}
                            reviewText={testimonial.reviewText}
                            rating={testimonial.rating}
                            avatarUrl={testimonial.avatar}
                        />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default TestimonialsSection;
