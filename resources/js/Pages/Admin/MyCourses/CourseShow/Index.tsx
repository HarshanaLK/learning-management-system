import CourseInfo from './Partials/CourseInfo';
import CoursePriceDetails from './Partials/CoursePriceDetails';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';




const bRoutes = [
    { name: "Dashboard", hasArrow: false, link: "/dashboard" },
    { name: "My Courses", hasArrow: true, link: "/courses/all" },
    { name: "Course Preview", hasArrow: true,  },
];



export default function ProfilePage({
    modules,
    course,
    courses,
    course_tag,
}: {
    modules: any;
    course: any;
    courses: any,
    course_tag:any;
}) {


    console.log(course_tag);

    {
        return (
            <AdminLayout bRoutes={bRoutes}>
                <Head title="Course Preview" />
                <div className='mt-10 mb-24'>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3   crinfo:px-0 ">

                        {/* grid lest side course info section  */}
                        <div className="col-span-1 md:col-span-2 crinfo:mr-14 lg:mr-6">
                            <CourseInfo modules={modules} course={course} />
                        </div>

                        {/* grid right side price section */}
                        <div className="col-span-1 lg:mt-0 mt-12 lg:px-0 sm:px-10 px-4">
                            <CoursePriceDetails course={course} course_tag={ course_tag} />
                        </div>
                    </div>
                </div>
            </AdminLayout>

        );
    };
}
