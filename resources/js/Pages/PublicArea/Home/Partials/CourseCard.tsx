import React from 'react';
import { PlayCircleIcon } from '@heroicons/react/20/solid';
import { router } from '@inertiajs/react';

interface CourseCardProps {
    id: number;
    imageUrl: string;
    lessonsCount: number;
    courseTitle: string;
    rating: number;
    instructorName: string;
    instructorRole: string;
    instructorImage: string;
    isEnrolled: boolean;
}

export default function CourseCard({
    id,
    imageUrl,
    lessonsCount,
    courseTitle,
    rating,
    instructorName,
    instructorRole,
    instructorImage,
    isEnrolled,

}: CourseCardProps) {

    const handleShow = (id: number) => {
        router.get(route('courses.show', id)); // Change to GET request
    };

    return (
        <div className="bg-card rounded-[20px]  xlg:w-[400px]  xlg:h-[540px] lg:w-[18rem] lg:h-[415px] max-w-sm  md:w-[21rem] md:h-[472px] sm:w-[18.3rem] sm:h-[410px] +xsm:w-[384px] +xsm:h-[540px] w-[290px] h-[408px] mt-1 overflow-hidden mx-auto flex flex-col ">
            {/* Course Image */}
            <div className="  xlg:min-h-[340px] lg:min-h-[253px] md:min-h-[297px] sm:min-h-[248px] +xsm:min-h-[340px] h-[257px]  overflow-hidden">
                <img
                    src={`${imageUrl ? `/storage/${imageUrl}` : ''}`}
                    alt="Course"
                    className="w-full  h-full  resize"
                />
            </div>

            {/* Course Information */}
            <div className="xlg:p-4 xlg:px-6 p-2 px-5 flex flex-col flex-grow ">

                <div className="flex justify-between items-center text-sm xlg:mb-2 mb-1 ">

                    <div className="flex items-center  mb-2 ">
                        <PlayCircleIcon className="h-6 w-6 mr-1 text-[#54BFFD]" />
                        {lessonsCount}+ Lessons
                    </div>

                    {/* Rating */}
                    <div className="flex ">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                fill={i < rating ? "#FAB437" : "#CBC2FF"}
                                viewBox="0 0 17 14"
                                width="17"
                                height="14"
                            >
                                <path d="M8.32984 0.354614L10.2777 5.51343L16.5812 5.51343L11.4816 8.70175L13.4295 13.8606L8.32984 10.6722L3.2302 13.8606L5.17809 8.70175L0.0784435 5.51343L6.38195 5.51343L8.32984 0.354614Z" />
                            </svg>
                        ))}
                    </div>
                </div>

                {/* Course Title */}
                <h2 className="text-base font-bold md:text-left">
                    <span
                        className="cursor-pointer hover:text-[#000000be]"
                        onClick={() => handleShow(id)}>
                        {courseTitle}
                    </span>
                </h2>

                <div className="flex-grow" />

                <div className="border-t mt-2 sm:mt-4 " style={{ borderTopColor: '#CCCCCC' }} />

                <div className="flex   items-center xlg:mt-3 mt-1 mb-2 ">
                    {/* Instructor Info */}
                    <div className="flex items-center mb-4 sm:mb-0  w-full justify-between ">
                        {/* Instructor Image, Name, and Role */}
                        <div className="flex ">
                            <img
                                src={`${instructorImage ? `/storage/${instructorImage}` : ''}`}
                                alt={instructorName}
                                className="w-8 h-8 sm:min-w-10 sm:min-h-10 rounded-full mr-3"
                            />
                            <div className=" w-32">
                                <div className="font-semibold text-sm  break-words overflow-hidden"><p>{instructorName}</p></div>
                                <div className="text-gray-500 text-xs break-words overflow-hidden"><p>{instructorRole}</p></div>
                            </div>
                        </div>
                    </div>
                    {/* Enroll Button */}
                    <div>
                        <button
                            className={`py-1 px-4 rounded-2xl text-sm sm:w-auto min-w-[100px] ${isEnrolled
                                ? "bg-gray-400 text-white hover:bg-gray-500"
                                : "bg-[#55C360] text-white hover:bg-green-600"
                                }`}
                            onClick={() => handleShow(id)} // Keep the navigation behavior unchanged
                        >
                            {isEnrolled ? "Enrolled" : "Enroll Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
