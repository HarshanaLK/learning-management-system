import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/CourseProgressLayout';
import FlashAlerts from '@/Components/elements/alerts/FlashAlerts';
// Assuming SidebarLayout is in the same folder

interface LessonPageProps {
    course: any;
    totalLessonDuration: number;
    certificateIssued: boolean;
}

const Dashboard: React.FC<LessonPageProps> = ({ course, totalLessonDuration, certificateIssued }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeModule, setActiveModule] = useState<number | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const pageProps = usePage().props;

    const toggleModule = (moduleId: number) => {
        setActiveModule(activeModule === moduleId ? null : moduleId);
    };

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const renderDescription = () => {
        const maxLength = 400;
        if (course.description.length <= maxLength || isExpanded) {
            return course.description;
        }
        return `${course.description.slice(0, maxLength)}...`;
    };




    return (
        <SidebarLayout
            course={course}
            sidebarVisible={sidebarVisible}
            toggleSidebar={toggleSidebar}
            activeModule={activeModule}
            toggleModule={toggleModule}
            isExpanded={isExpanded}
            handleToggle={handleToggle}
            certificateIssued={certificateIssued}        >
            <Head title="Course Dashboard" />

            <nav className="text-xl text-[#0470B0] lg:block hidden font-medium mb-4">
                <Link href="#" className="hover:underline">
                    Dashboard
                </Link>
            </nav>
            <h1 className="sm:text-5xl text-4xl lg:mt-0 mt-10 sm:text-left text-center  font-semibold">{course.title}</h1>

            {/* About Section */}
            <h2 className="text-xl font-semibold mb-4 mt-14">About this Course</h2>
            <p className="text-xl font-normal">
                {renderDescription()}
                {course.description.length > 400 && (
                    <button
                        onClick={handleToggle}
                        className="text-[#0470B0] hover:underline"
                    >
                        {isExpanded ? 'See Less' : 'See More'}
                    </button>
                )}
            </p>

            <FlashAlerts flash={pageProps.flash} />

            {/* Instructor image Section */}

            <div className="flex  items-center mt-16">
                <img
                    src={`/storage/${course.instructor_image}`}
                    alt={course.author}
                    className="w-[100px] h-[100px] rounded-full mr-3"
                />
                <div className="flex flex-col pl-3">
                    <p className="font-semibold text-xl">Taught by:</p>
                    <div className="font-semibold text-xl">{course.author}</div>
                    <div className="text-[#999999] font-semibold text-base">{course.instructor_role}</div>
                </div>
            </div>

            {/* Table course description */}
            <div className="overflow-x-auto mt-16">
                <table className="min-w-1/2 border border-[#A4A5A4] text-left">
                    <tbody>
                        <tr className="border-b border-[#A4A5A4]">
                            <th className="py-2 px-4 font-medium text-lg sm:text-xl lg:text-xl">Level</th>
                            <td className="py-2 px-4 font-normal text-lg sm:text-xl lg:text-xl text-[#737373] border-l border-r border-[#A4A5A4]">{course.course_level}</td>
                        </tr>
                        <tr className="border-b border-[#A4A5A4]">
                            <th className="py-2 px-4 font-medium text-lg sm:text-xl lg:text-xl">Commitment</th>
                            <td className="py-2 px-4 font-normal text-lg sm:text-xl lg:text-xl text-[#737373] border-l border-r border-[#A4A5A4]">
                                {/* {Math.floor(totalLessonDuration / 60) > 0
                                    ? `${Math.floor(totalLessonDuration / 60)} hours ${totalLessonDuration % 60} minutes`
                                    : `${totalLessonDuration % 60} minutes`} */}
                                    {course.course_hours} hours
                            </td>
                        </tr>
                        <tr className="border-b border-[#A4A5A4]">
                            <th className="py-2 px-4 font-medium text-lg sm:text-xl lg:text-xl">Language</th>
                            <td className="py-2 px-4 font-normal text-lg sm:text-xl lg:text-xl text-[#737373] border-l border-r border-[#A4A5A4]">{course.course_language}</td>
                        </tr>
                        <tr>
                            <th className="py-2 px-4 font-medium text-lg sm:text-xl lg:text-xl">How to get Certificate</th>
                            <td className="py-2 px-4 font-normal text-lg sm:text-xl lg:text-xl text-[#737373] border-l border-r border-[#A4A5A4]">
                                Watch all the videos to complete the course.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </SidebarLayout>
    );
};

export default Dashboard;
