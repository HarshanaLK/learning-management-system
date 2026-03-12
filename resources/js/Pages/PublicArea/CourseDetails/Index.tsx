import Public from '@/Layouts/PublicLayout';
import CourseInfo from './Partials/CourseInfo';
import CoursePriceDetails from './Partials/CoursePriceDetails';
import PopularCourses from './Partials/LatestCourses';
import BackgroundIcon from '@/Components/shared/BackgroundIcon/BackgroundIcon';
import { Head } from '@inertiajs/react';


export default function ProfilePage({
    modules,
    course,
    courses,
    isEnrolled,
}: {
    modules: any;
    course: any;
    courses: any,
    isEnrolled: boolean;
}) {



    {
        return (
            <Public>
                <Head title="Course Details" />
                <div className='mt-40'>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3  px-5 crinfo:px-0 ">

                        {/* grid lest side course info section  */}
                        <div className="col-span-1 md:col-span-2 crinfo:mr-14 lg:mr-6">
                            <CourseInfo modules={modules} course={course} isEnrolled={isEnrolled} />
                        </div>

                        {/* grid right side price section */}
                        <div className="col-span-1 lg:mt-0 mt-12 lg:px-0 sm:px-10 px-4">
                            <CoursePriceDetails course={course} course_tag={undefined} isEnrolled={isEnrolled}    />
                        </div>
                    </div>


                    <div className='absolute ml-[225px] -mt-5 hidden md:block  -z-40 '>
                        <BackgroundIcon fillColor='#BBE7C0' />
                    </div>
                    <div className='absolute left-1/2 mt-16  hidden md:block -z-40  '>
                        <BackgroundIcon />
                    </div>


                    {/* Popular/ latest courses section */}
                    <section className='lg:mt-36 mt-16 md:mb-64 mb-20'>
                        <PopularCourses courses={courses} />
                    </section>

                    <div className='absolute ml-[330px] -mt-52  hidden md:block -z-40  '>
                        <BackgroundIcon />
                    </div>
                    <div className='absolute  right-1/2 -mt-20  hidden md:block -z-40  '>
                        <BackgroundIcon fillColor='#BBE7C0' />
                    </div>
                    <div className='absolute right-1/4 -mt-44   hidden md:block -z-40  '>
                        <BackgroundIcon fillColor='#AAE0FE' />
                    </div>
                </div>
            </Public>

        );
    };
}
