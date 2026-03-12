import Public from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { IoClose, IoOpen } from 'react-icons/io5';

type Props = {
    course: {
        id: number;
        title: string;
        modules: Array<{
            id: number;
            module_title: string;
            lessons: Array<{
                id: number;
                lesson_title: string;
                progress: Array<{
                    id: number;
                    progress: number;
                    completed: boolean;
                    status: string;
                    created_at: string;
                }>;
            }>;
        }>;
    };
};


export default function ModulePage({ course }: Props) {
    const { url } = usePage();
    const [activeLink, setActiveLink] = useState('');

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const links = [

        { name: 'Modules', href: course ? `/users/modules/${course.id}` : '#' },
        { name: 'Grades', href: course ? `/users/grades/${course.id}` : '#' },

    ];

    useEffect(() => {
        const currentLink = links.find(link => url.includes(link.href));
        if (currentLink) {
            setActiveLink(currentLink.name);
        }
    }, [url]);


    return (
        <Public>
             <Head title="CourseGrades" />
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-full lg:mt-40 mt-24 px-4 lg:px-0 lg:pr-4 md:mb-48 mb-16">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:static w-64 h-full  bg-white lg:pl-8 pl-2  transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 lg:z-0 z-50`}
                >
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden absolute top-0 left-0  p-2 rounded-md"
                    >
                        <IoClose size={24} />
                    </button>
                    <nav className="text-lg lg:text-2xl font-medium lg:mt-0 mt-16">
                        <div className="flex flex-col space-y-4 lg:space-y-6 text-[#737373]  border-l-4  border-[#A4A5A4]">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`pl-4 hover:text-[#2BAFFC] -ml-1 hover:border-[#2BAFFC] ${activeLink === link.name
                                        ? 'border-l-4 text-[#2BAFFC] border-[#2BAFFC]'
                                        : 'border-l-4  border-transparent'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </aside>

                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden top-4 left-4 mb-10 z-10 p-2 rounded-md"
                >
                    <IoOpen size={24} />
                </button>

                <div className="md:px-5  w-full">
                    {course.modules.map((module) => (
                        <div key={module.id} className="mb-6 border-[#999999] border rounded-2xl p-4">
                            <h2 className="text-xl font-semibold">{module.module_title}</h2>
                      
                            <div className="overflow-x-auto">
                                <table className="w-full mt-4 text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="p-2 text-sm font-medium sm:w-1/4 ">Name</th>
                                            <th className="p-2 text-sm font-medium sm:w-1/4">Start date</th>
                                            <th className="p-2 text-sm font-medium sm:w-1/4">Status</th>
                                            <th className="p-2 text-sm font-medium sm:w-1/4">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {module.lessons.map((lesson) => (
                                            <tr key={lesson.id}>
                                                <td className="p-2 text-[#0470B0] md:text-xl  font-semibold hover:underline">{lesson.lesson_title}</td>
                                                {lesson.progress.map((progress) => (
                                                    <React.Fragment key={progress.id}>
                                                        <td className="p-2 md:text-xl font-normal">
                                                            {progress.created_at ? new Date(progress.created_at).toISOString().split('T')[0] : '-'}
                                                        </td>
                                                        <td className="p-2 md:text-xl font-normal">
                                                            {progress.progress ?
                                                                (progress.progress === 100 ? "Complete" :
                                                                    (progress.progress > 0 && progress.progress < 100 ? "In Progress" : `${progress.progress}%`))
                                                                : '-'}
                                                        </td>
                                                        <td className="p-2 md:text-xl font-normal">
                                                            {progress.progress ? `${progress.progress}%` : '-'}
                                                        </td>
                                                    </React.Fragment>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </Public>
    );
}







