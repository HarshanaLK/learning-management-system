import { Page } from '@inertiajs/inertia';
import { router, usePage } from '@inertiajs/react';
import React from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';

export default function CourseInfo({
    course,
    course_tag,
    isEnrolled,

}: {
    course: any;
    course_tag: any;
    isEnrolled: boolean;

}) {


    const { props } = usePage();
    const isAuthenticated = Boolean(props.auth?.user);

    // const handleEnrollment = () => {
    //     router.post(`/courses/${course.id}/checkout`, {}, {
    //         preserveState: true,
    //         preserveScroll: true,
    //     });
    // };



    const handleEnrollment = () => {
        if (!isAuthenticated) {
            // Redirect non-authenticated users to the enrollment page
            router.get(`/enroll/${course.id}`, {}, {
                preserveState: true,
                preserveScroll: true,
            });
            return;
        }

        // Proceed with enrollment for authenticated users
        router.post(`/courses/${course.id}/checkout`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };



    const handleGoTo = () => {
        router.get(`/my-courses/${course.id}`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };



    return (
        <div className="pl-5 py-5 pr-1 pb-11  bg-[#EFF9FF]  rounded-[20px]">

            <p className="text-4xl font-semibold mb-2 mt-3">Price ${course?.price}</p>

            {isEnrolled ? (
                <button
                    onClick={handleGoTo}
                    className="bg-green-500 text-white px-8 py-[6px] text-sm font-medium mt-6 rounded-full hover:bg-green-600 mb-3">
                    Go to Course
                </button>
            ) : (
                <button
                    onClick={handleEnrollment}
                    className="bg-primary text-white px-8 py-[6px] text-sm font-medium mt-6 rounded-full hover:bg-[#004AAD] mb-3">
                    Enroll Now
                </button>
            )}



            <p className=" mb-5 text-sm font-medium">No any hidden charges</p>

            <p className=" mb-2 text-base font-medium">Total Hours: {course.course_hours} hours</p>
            <p className=" mb-5 text-base font-medium">Language: {course.course_language}</p>


            <section>
                <h3 className="text-xl font-semibold mb-2">What you’ll learn</h3>
                <ul className="list-none list-inside mb-4">
                    {course?.what_you_learn?.map((item: any, index: React.Key) => (
                        <li key={index} className="flex items-center text-sm font-normal py-[6px]">
                            <IoCheckmarkOutline className="mr-5 min-w-4 " />
                            {item}
                        </li>
                    )) || <li>No information available</li>}
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">Material Includes</h3>
                <ul className="list-none list-inside mb-4">
                    {course?.materials_included?.map((item: any, index: React.Key) => (
                        <li key={index} className="flex items-center text-sm font-normal py-[6px]">
                            <IoCheckmarkOutline className="mr-5 min-w-4  " />
                            {item}
                        </li>
                    )) || <li>No materials included</li>}
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">Requirements</h3>
                <ul className="list-none list-inside mb-4">
                    {course?.requirements?.map((item: any, index: React.Key) => (
                        <li key={index} className="flex items-center text-sm font-normal py-[6px]">
                            <IoCheckmarkOutline className="mr-5 min-w-4" />
                            {item}
                        </li>
                    )) || <li>No requirements specified</li>}
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-3 gap-x-4 mb-4">
                    {/* {course?.tags?.map((tag: any, index: React.Key) => (
                        <span key={index} className="bg-[#F5FBFF] px-2 border-[#b1a8a8] text-[#6d6c6c] border-[1px] py-1 rounded-md text-sm font-semibold">{tag}</span>
                    )) || <span>No tags available</span>} */}
                    {course.course_tag?.map((tagObject: { course_tag: string }, index: number) => (
                        <span
                            key={index}
                            className="bg-[#F5FBFF] px-2 border-[#b1a8a8] text-[#6d6c6c] border-[1px] py-1 rounded-md text-sm font-semibold"
                        >
                            {tagObject.course_tag}
                        </span>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">Audience</h3>
                {/* <p className="text-sm font-normal">{course?.audience || "No audience information available"}</p> */}
                <p className="text-sm font-normal">
                    You’ll also be enrolled in this specialization</p>
            </section>
        </div>
    );
}
