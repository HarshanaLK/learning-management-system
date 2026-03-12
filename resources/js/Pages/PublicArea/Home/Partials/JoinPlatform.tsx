import { PrimaryButton } from '@/Components/elements/buttons/PrimaryButton';
import { AcademicCapIcon, PlayIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import { router } from '@inertiajs/react';
import React from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { IoPeopleCircle, IoPeopleCircleSharp, IoPeopleSharp } from 'react-icons/io5';
import { IoSchool } from "react-icons/io5";

const JoinPlatform = () => {



const handleShow=()=>{
    router.get(route('about'));
}



    return (

        <div className="bg-blue-50 flex flex-col lg:flex-row items-center justify-center  py-11  mt-12 ">
            <div className="flex max-w-7xl mx-auto  flex-col lg:flex-row justify-start mt-2 w-full">
                {/* Image content */}
                <div className="flex-shrink-0  lg:w-1/2 md:w-96 sm:w-80 w-72  mb-6 lg:mb-0 flex justify-center items-center mx-auto">
                    <img
                        src="/assets/images/JoinPlatform.webp"
                        alt="Student"
                        className="object-cover w-full sm:w-auto  h-[100%] lg:h-[100%] max-h-[80vh] lg:max-h-[50vh] "
                    />
                </div>

                {/* Text content */}
                <div className="text-left w-full lg:w-1/2  lg:px-0 lg:ml-6 sm:px-12 px-6">
                    <h1 className="text-3xl xl:text-5xl lg:text-4xl  font-bold mb-4">
                        Join our <span className="text-primary">world's largest</span><br /> learning platform today
                    </h1>
                    <p className="text-gray-600 text-base lg:mb-5">
                        Esse cillum dolore eu fugiat nulla pariatur. Exceptetur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit.
                    </p>
                    <button
                    onClick={handleShow}
                     className="bg-join text-white px-6 py-1 lg:mt-9 mt-7 rounded-full shadow-md border border-transparent hover:bg-transparent hover:border hover:border-join hover:text-join hover:font-semibold">
                        Learn More
                    </button>

                    <div className="flex  lg:justify-start justify-center sm:flex-row sm:space-x-9 space-x-4 lg:mt-32 mt-14 ">

                        <div className="bg-white rounded-xl shadow-iconBox sm:px-4 sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customYellow text-left flex items-center space-x-2 hover:text-white group">
                            <IoPeopleCircle className="h-7 w-7 sm:h-10 text-customYellow sm:w-10 group-hover:text-white" />
                            <div >
                                <p className="text-sm sm:text-base font-semibold group-hover:text-white">30,000+</p>
                                <p className="text-gray-500 text-xs group-hover:text-white">Students</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-iconBox sm:px-5  sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customPurple text-left flex items-center space-x-2 hover:text-white group">
                            <div className="bg-customPurple p-1 sm:p-2 rounded-full group-hover:bg-white">
                                <IoSchool className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-customPurple" />
                            </div>
                            <div>
                                <p className="text-sm sm:text-base font-semibold group-hover:text-white">200</p>
                                <p className="text-gray-500 text-xs group-hover:text-white">Instructors</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-iconBox sm:px-5  sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customGreen text-left flex items-center space-x-2 hover:text-white group">
                            <div className="bg-customGreen p-1 sm:p-2 rounded-full group-hover:bg-white">
                                <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-customGreen" />
                            </div>
                            <div>
                                <p className="text-sm sm:text-base font-semibold group-hover:text-white">10,000+</p>
                                <p className="text-gray-500 text-xs group-hover:text-white">Videos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinPlatform;
