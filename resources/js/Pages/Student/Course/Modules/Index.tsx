import Public from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { GrDocumentDownload } from 'react-icons/gr';
import { IoClose, IoNewspaper, IoOpen } from 'react-icons/io5';

type Module = {
    id: number;
    module_title: string;
    course_id: number;
    lessons: { id: number; lesson_title: string; lesson_files: string | string[], files_original_names: string }[]; // `lesson_files` can be a string or an array
};

type Props = {
    modules: Module[];
};

export default function ModulePage({ modules }: Props) {
    const { url } = usePage();
    const [activeLink, setActiveLink] = useState('');
    const courseId = modules.length > 0 ? modules[0].course_id : null;
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const links = [

        { name: 'Modules', href: courseId ? `/users/modules/${courseId}` : '#' },
        { name: 'Grades', href: courseId ? `/users/grades/${courseId}` : '#' },

    ];

    useEffect(() => {
        const currentLink = links.find(link => url.includes(link.href));
        if (currentLink) {
            setActiveLink(currentLink.name);
        }
    }, [url]);

    const downloadFile = (fileUrl:any, fileName:any) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', fileName);
        link.click();
    };


    return (
        <Public>
            <Head title="CourseModules" />
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-full  lg:mt-40 mt-28 px-4 lg:px-0 lg:pr-4 lg:mb-48 mb-16">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:static w-64 h-full  bg-white lg:pl-8 pl-2  transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 z-50 lg:z-0`}
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


                {/* Main content */}
                <div className="w-full lg:w-3/4">
                    {modules.length === 0 ? (
                        <div className="text-center text-gray-600 text-lg lg:text-xl font-semibold mt-10 mb-52">
                            No modules or grades available yet.
                        </div>
                    ) : (

                        modules.map((module) => (
                            <div
                                key={module.id}
                                className="border-[#999999] border rounded-xl lg:rounded-2xl p-4 lg:pl-6 mb-6 lg:mb-7 bg-white"
                            >
                                <h2 className="text-lg lg:text-xl font-semibold">{module.module_title}</h2>
                                <h2 className="text-base lg:text-xl font-semibold text-[#737373]">Discuss this module here</h2>
                                <div className="mt-1">
                                    <ul className="space-y-2 lg:space-y-1">
                                        {module.lessons.map((lesson) => {
                                            const lessonFiles = Array.isArray(lesson.lesson_files)
                                                ? lesson.lesson_files
                                                : JSON.parse(lesson.lesson_files || '[]');

                                            return (
                                                <li key={lesson.id}>
                                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-2 lg:space-y-0">
                                                        <p className="text-base lg:text-xl font-semibold text-[#0470B0] flex items-center">
                                                            {lesson.lesson_title}
                                                            <IoNewspaper className="ml-2 w-5" />
                                                        </p>

                                                        {Array.isArray(lessonFiles) &&
                                                            lessonFiles.map((fileUrl, index) => {
                                                                const fullUrl = `/storage/${fileUrl}`;
                                                                const fileNames = Array.isArray(lesson.files_original_names)
                                                                    ? lesson.files_original_names
                                                                    : JSON.parse(lesson.files_original_names || "[]");

                                                                return (
                                                                    <a
                                                                        key={index}
                                                                        href={fullUrl}
                                                                        download={fileNames[index]}
                                                                        target="_blank"
                                                                        className="no-underline"
                                                                        rel="noopener noreferrer"

                                                                    >
                                                                        <div className="text-blue-500 hover:text-blue-700 flex items-center text-sm no-underline hover:no-underline">
                                                                            {fileNames[index] && (
                                                                                <p className='break-words break-all text-black overflow-x-auto'>
                                                                                    {fileNames[index]}
                                                                                </p>
                                                                            )}
                                                                            <GrDocumentDownload className="ml-1 w-5" />
                                                                        </div>
                                                                    </a>
                                                                );
                                                            })}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Public>
    );
}














