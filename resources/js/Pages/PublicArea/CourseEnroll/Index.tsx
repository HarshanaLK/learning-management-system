import Public from '@/Layouts/PublicLayout';
import { PlayCircleIcon } from '@heroicons/react/16/solid';
import EnrollRegister from './Partials/EnrollRegister';
import { Head, usePage } from '@inertiajs/react';
import FlashAlerts from '@/Components/elements/alerts/FlashAlerts';

export default function CourseEnrollPage({
    course,
    lessonCount,
}: {
    course: any;
    lessonCount: any;
}) {


    const pageProps = usePage().props;
    return (
        <Public>
            <Head title="Enroll Course" />
            <FlashAlerts flash={pageProps.flash} />

            <div className='flex flex-col lg:flex-row max-w-7xl mx-auto  sm:mt-40 mt-24 justify-center sm:mb-32 mb-12 px-2'>
                <div className='w-full lg:w-1/2'>
                    <EnrollRegister course={course} />
                </div>

                <div className="w-full lg:w-1/2 sm:px-6 px-1 mt-3 sm:mt-0">
                    {/* Course Image */}
                    <div>
                        <img
                            src={`${course.image ? `/storage/${course.image}` : ''}`}
                            alt="Course"
                            className="w-full   h-[320px] bg-cover rounded-lg"
                        />
                    </div>

                    {/* Course Information */}
                    <div className="xlg:p-4 xlg:px-6 p-2 px-1 flex flex-col flex-grow mt-6 sm:mt-8">
                        <h2 className="sm:text-[32px] text-2xl font-bold md:text-left">{course.title}</h2>

                        <div className="flex justify-between mt-6 items-center text-sm xlg:mb-2 mb-1">
                            <div className="sm:flex items-center hidden">
                                <img
                                    src={`${course.instructor_image ? `/storage/${course.instructor_image}` : ''}`}
                                    alt={course.author}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3"
                                />
                                <div className="flex flex-col">
                                    <div className="font-semibold text-sm">{course.author}</div>
                                    <div className="text-gray-500 text-xs">{course.instructor_role}</div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <PlayCircleIcon className="sm:h-9 sm:w-9 h-6 w-6 sm:mr-1 text-[#54BFFD]" />
                                <div className='sm:text-xl text-base font-normal'>
                                    {lessonCount} + Lessons
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={i < course.rating ? "#FAB437" : "#CBC2FF"}
                                        viewBox="0 0 17 14"
                                        width="20"
                                        height="20"
                                    >
                                        <path d="M8.32984 0.354614L10.2777 5.51343L16.5812 5.51343L11.4816 8.70175L13.4295 13.8606L8.32984 10.6722L3.2302 13.8606L5.17809 8.70175L0.0784435 5.51343L6.38195 5.51343L8.32984 0.354614Z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="sm:hidden items-center flex mt-4">
                            <img
                                src={`${course.instructor_image ? `/storage/${course.instructor_image}` : ''}`}
                                alt={course.author}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3"
                            />
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">{course.author}</div>
                                <div className="text-gray-500 text-xs">{course.instructor_role}</div>
                            </div>
                        </div>

                        {/* Course Title */}
                        <div className="flex-grow" />
                        <h1 className='text-xl font-medium mt-4'>Summary</h1>

                        <div className="border-t mt-2 border-1 border-black" />

                        <div className='flex justify-between items-center mt-6'>
                            <h1 className='text-xl font-medium'>Total</h1>
                            <h1 className='text-xl font-medium'>${course.price}</h1>
                        </div>

                        <p className='mt-3'>By completing your purchase, you agree to these Terms of services.</p>
                        <p>Payments are secured and encrypted!</p>

                        <div className="flex justify-between items-center mt-6">
                            {/* Instructor Info */}
                            <div className="flex items-center mb-4 sm:mb-0 w-full justify-between">
                                {/* Rating Visible on hover */}
                                <div className="ml-2 hidden">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={i < course.rating ? "#FAB437" : "#CBC2FF"}
                                            viewBox="0 0 17 14"
                                            width="17"
                                            height="14"
                                        >
                                            <path d="M8.32984 0.354614L10.2777 5.51343L16.5812 5.51343L11.4816 8.70175L13.4295 13.8606L8.32984 10.6722L3.2302 13.8606L5.17809 8.70175L0.0784435 5.51343L6.38195 5.51343L8.32984 0.354614Z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            {/* Buy Course Button */}
                            {/* <button className="bg-[#2BAFFC] text-white py-1 px-12 rounded-full hover:bg-[#2b8dfc] text-xl font-medium">
                                Buy Course
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </Public>
    );
}
