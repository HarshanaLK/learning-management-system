import { Head, } from '@inertiajs/react';
import Public from '@/Layouts/PublicLayout';
import { IoPeopleCircle, IoSchool } from 'react-icons/io5';
import { PlayIcon } from '@heroicons/react/24/solid';
import BackgroundIcon from '@/Components/shared/BackgroundIcon/BackgroundIcon';
import FeedbackSection from './Partials/Feedback';




const About = () => {

    return (
        <Public>
            <Head title="About Us" />
            {/* Hero Section */}
            <section className="relative mt-30">
                <div
                    className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center"
                    style={{ backgroundImage: 'url(assets/images/about/about.webp)' }}
                >
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <h1 className="text-white text-3xl mt-20  sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            ABOUT US
                        </h1>
                    </div>
                </div>

                <div
                    className="absolute inset-0"
                    style={{
                        background: '#00000080'
                    }}
                ></div>

            </section>

            {/* Vision Section */}
            <section className="py-16 px-6 ">
                <div className="hidden md:flex justify-center -mb-18">
                    <BackgroundIcon fillColor='#AAE0FE' />
                </div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                    {/* Text content */}
                    <div className="text-center md:text-left md:w-7/12">
                        <h2 className="text-2xl font-bold text-primary">Vision</h2>
                        <h3 className="text-[2.5rem] font-semibold my-4">Empowering Education for a Global Audience</h3>
                        <p className="text-xl font-normal">
                            To become the leading platform for accessible, innovative, and personalized learning experiences that empower learners and educators worldwide to achieve their full potential.
                        </p>
                        <div className='-ml-20 -mt-12'>
                            <BackgroundIcon fillColor='#BBE7C0' />
                        </div>
                        <button
                            onClick={() => ('/courses')}
                            className="inline-block mt-7 bg-primary text-white py-1 px-8 text-base rounded-full hover:bg-join"
                        >
                            View Courses
                        </button>
                    </div>
                    {/* Image content */}
                    <div className="mt-8 md:mt-0 md:w-5/12 flex justify-center">
                        <img src="assets/images/about/twostudent.webp" alt="Vision Image" className="w-full max-w-md h-auto " />
                    </div>
                </div>
                <div className="flex justify-center -ml-72 -mt-14">
                    <BackgroundIcon />
                </div>
                <div className="hidden sm:flex float-right mr-56 -mt-14">
                    <BackgroundIcon fillColor='#BBE7C0' />
                </div>
            </section>



            {/* banner section */}
            <section className='mt-6'>
                <div
                    className="w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[380px] bg-cover bg-center"
                    style={{ backgroundImage: 'url(assets/images/about/video-banner.webp)' }}
                >
                </div>
            </section>




            {/* Mission Section */}
            <section className="py-16 px-6 ">

                <div className="flex -mb-24 mr-96 ">
                    <BackgroundIcon fillColor='#BBE7C0' />
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                    <div className="md:w-5/12 flex justify-start mt-16">
                        <img src="assets/images/about/mission.webp" alt="Mission Image" className="w-3/4 h-auto" />
                    </div>
                    <div className="mt-8 text-center md:text-left md:mt-0 md:w-7/12">
                        <div className="flex float-right -mt-16">
                            <BackgroundIcon fillColor='#AAE0FE' />
                        </div>

                        <h2 className="text-2xl font-bold text-primary">Mission</h2>
                        <h3 className="text-[2.5rem] font-semibold my-4">Facilitating Seamless and Personalized Learning</h3>
                        <p className="text-xl">
                            Our mission is to provide an intuitive, flexible, and scalable learning management system that facilitates seamless access to educational content, fosters collaboration, and supports continuous learning and development. By integrating cutting-edge technology with user-friendly interfaces, we aim to bridge the gap between learners and educators, enabling personalized learning pathways and fostering a lifelong passion for learning.
                        </p>
                    </div>
                </div>
                <div className="flex float-left ml-40 -mt-20">
                    <BackgroundIcon />
                </div>
            </section>

            {/* icon section */}
            <section className="mt-8">
                <div className="flex  lg:justify-center justify-center  sm:flex-row sm:space-x-10 space-x-4  ">
                    <div className="bg-white rounded-xl shadow-iconBox sm:px-6 sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customYellow text-left flex items-center space-x-2 hover:text-white group">
                        <IoPeopleCircle className="h-7 w-7 sm:h-10 text-customYellow sm:w-10 group-hover:text-white" />
                        <div >
                            <p className="text-sm sm:text-base font-semibold group-hover:text-white">30,000+</p>
                            <p className="text-gray-500 text-xs group-hover:text-white">Students</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-iconBox sm:px-7  sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customPurple text-left flex items-center space-x-2 hover:text-white group">
                        <div className="bg-customPurple p-1 sm:p-2 rounded-full group-hover:bg-white">
                            <IoSchool className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-customPurple" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-base font-semibold group-hover:text-white">200</p>
                            <p className="text-gray-500 text-xs group-hover:text-white">Instructors</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-iconBox sm:px-7  sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customGreen text-left flex items-center space-x-2 hover:text-white group">
                        <div className="bg-customGreen p-1 sm:p-2 rounded-full group-hover:bg-white">
                            <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-customGreen" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-base font-semibold group-hover:text-white">10,000+</p>
                            <p className="text-gray-500 text-xs group-hover:text-white">Videos</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex float-right mr-72 ">
                <BackgroundIcon />
            </div>
            <div className="hidden md:flex float-left ml-32 mt-20  ">
                <BackgroundIcon fillColor='#AAE0FE' />
            </div>


            <div className="bg-bgBlue  mt-28 mb-28 pb-20 ">
                <FeedbackSection />
                <div className="flex float-end mr-[60rem] -mt-96  ">
                    <BackgroundIcon fillColor='#BBE7C0' />
                </div>
                <div className="flex float-left ml-40 mt-12   ">
                    <BackgroundIcon />
                </div>
                <div className="hidden md:flex float-right mr-44    ">
                    <BackgroundIcon />
                </div>
                <div className="flex float-right mr-72 mt-28   ">
                    <BackgroundIcon fillColor='#BBE7C0' />
                </div>
            </div>

        </Public>
    );
};

export default About;





