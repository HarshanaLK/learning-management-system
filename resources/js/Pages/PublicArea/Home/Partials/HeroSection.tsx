import { useState, useEffect } from 'react';
import './HomeBanner.css'; // Import the CSS file
import { PrimaryButton } from '@/Components/elements/buttons/PrimaryButton';
import { router } from '@inertiajs/react';

const HomeBanner = () => {
    const images = [
        'assets/images/home/banner1.webp',
        'assets/images/home/banner2.webp',
        'assets/images/home/banner3.webp',
        'assets/images/home/banner4.webp',
    ];

    useEffect(() => {
        const preloadImages = () => {
            images.forEach((image) => {
                const img = new Image();
                img.src = image;
            });
        };
        preloadImages();
    }, [images]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const handleViewCourses = () => {
        router.get(route('courses.index'));
    };



    return (

            <section
                className="relative flex justify-center lg:mt-[82px] mt-[68px] items-center bg-cover bg-center bg-no-repeat h-[25rem] md:h-[32rem] lg:h-[40rem] banner-image"
                style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, rgba(217, 217, 217, 0) 17.92%, rgba(0, 0, 0, 0.31) 59.92%, rgba(0, 0, 0, 0.78) 95%)'
                    }}
                ></div>

                {/* text and button area */}
                <div className="max-w-7xl mx-auto mt-36 w-full z-10">
                    <div className="max-w-7xl mx-auto lg:p-5 p-4 ml-10  lg:m-0 md:ml-8 sm:mb-10 mb-20 flex flex-col justify-start items-start text-start text-white">
                        <h1 className="text-3xl md:text-5xl lg:text-8xl mb-4 font-bold">
                            Knowledge Meets
                            <br />
                            Innovation
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl font-semibold sm:mb-4 mb-0">
                            This platform’s simplicity belies its powerful capabilities, offering a seamless and<br />
                            enjoyable educational experience.
                        </p>
                        <button
                            onClick={handleViewCourses}
                            className="bg-primary text-white mt-5 sm:px-12 px-5 py-1 md:py-1 rounded-full hover:bg-blue-600 transition text-base md:text-base"
                        >
                            View Courses
                        </button>
                    </div>
                </div>
            </section>

    );
};

export default HomeBanner;
