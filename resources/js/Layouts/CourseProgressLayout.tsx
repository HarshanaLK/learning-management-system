import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { IoChevronDown, IoChevronUp, IoClose, IoLayers, IoMenu } from 'react-icons/io5';
import Public from './PublicLayout';
import axios from 'axios';
import { PiCertificateFill } from 'react-icons/pi';

interface SidebarLayoutProps {
    children: React.ReactNode;
    course: any;
    sidebarVisible: boolean;
    toggleSidebar: () => void;
    activeModule: number | null;
    toggleModule: (moduleId: number) => void;
    isExpanded: boolean;
    handleToggle: () => void;
    certificateIssued: boolean;
    videoProgress?: number;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
    children,
    course,
    sidebarVisible,
    toggleSidebar,
    activeModule,
    toggleModule,
    isExpanded,
    handleToggle,
    certificateIssued,
    videoProgress,
}) => {


    const downloadCertificate = async (courseId: number) => {
        try {
            const response = await axios({
                url: `/my-courses/${courseId}/certificate`,
                method: 'GET',
                responseType: 'blob',
            });

            const contentDisposition = response.headers['content-disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
                : `certificate_${courseId}.pdf`;



            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename || `certificate_${courseId}.pdf`);
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading certificate:', error);
        }
    };



    return (
        <Public>

            <div className="flex flex-col lg:flex-row h-full max-w-7xl mx-auto lg:mt-36 mt-24 lg:mb-64 mb-32">
                {/* Sidebar Toggle Button (Visible Only on Small Screens) */}
                <button
                    className="lg:hidden p-4 text-[#0470B0] bg-white rounded-md z-10"
                    onClick={toggleSidebar}
                >
                    {sidebarVisible ? <IoClose size={24} /> : <IoMenu size={24} />}  {/* Show cross when sidebar is visible */}
                </button>

                {/* Sidebar (Visible on Large Screens, Toggleable on Small Screens) */}
                <div className={`px-4 ${sidebarVisible ? 'block' : 'hidden'} lg:block`}>
                    <div className="sidebar sm:w-[250px] w-full bg-[#CFCFCF]">
                        <div className='pb-10'>
                            <ul>
                                {/* Dashboard Section */}
                                <li>
                                    <Link href={`/my-courses/${course.id}`}>
                                        <div className="flex px-6 items-center hover:bg-[#034A74] hover:text-white py-4">
                                            <IoLayers />
                                            <h2 className="text-base font-medium ml-4">Dashboard</h2>
                                        </div>
                                    </Link>

                                    {/* Modules Section */}
                                    {course.modules.map((mod: any) => (
                                        <div key={mod.id}>
                                            <div>
                                                {/* Module Toggle */}
                                                <div
                                                    className="flex items-center py-4 px-6 hover:bg-[#034A74] hover:text-white cursor-pointer"
                                                    onClick={() => toggleModule(mod.id)}
                                                >
                                                    <IoLayers className='min-w-4' />
                                                    <h3 className="text-base font-medium ml-4">{mod.module_title}</h3>
                                                    <span className="ml-auto">
                                                        {activeModule === mod.id ? (
                                                            <IoChevronUp className="text-lg" />
                                                        ) : (
                                                            <IoChevronDown className="text-lg" />
                                                        )}
                                                    </span>
                                                </div>

                                                {/* Dropdown for lessons */}
                                                {activeModule === mod.id && (
                                                    <ul>
                                                        {mod.lessons.map((l: any) => (
                                                            <li key={l.id}>
                                                                <Link href={`/my-courses/${course.id}/modules/${mod.id}/lessons/${l.id}`} >
                                                                    <div className="flex items-center hover:text-white py-4 pl-14 text-bas justify-between   font-medium rounded hover:bg-[#337499] w-full">
                                                                        <span>{l.lesson_title}</span>
                                                                        <div className="ml-auto mr-8 flex items-center">
                                                                            <div className="  flex ">
                                                                                {l.progress && l.progress.length > 0 ? (
                                                                                    <div
                                                                                        className="relative w-7 h-7 border bg-[#034A74] border-black flex justify-center items-center rounded-full"
                                                                                    >
                                                                                        <span className="absolute text-[10px] font-semibold text-white">
                                                                                            {l.progress[0]?.progress || 0}%
                                                                                        </span>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="text-sm text-gray-500">0%</div>
                                                                                )}
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {/* All Notes and Resources Section */}
                                    <Link
                                        className="flex  px-6 items-center hover:bg-[#034A74] py-4 hover:text-white"
                                        href={`/users/modules/${course.id}`} // Proper string interpolation for dynamic route
                                    >
                                        <IoLayers />
                                        <h3 className="text-base font-medium ml-4">All Notes and Resources</h3>
                                    </Link>
                                    {certificateIssued && (
                                        <div className='flex mb-4 px-6 items-center hover:bg-[#034A74] py-4 hover:text-white'>
                                            <PiCertificateFill className='text-lg' />
                                            <button
                                                onClick={() => downloadCertificate(course.id)}
                                                className="ml-4 text-base font-medium"
                                            >
                                                Download Certificate
                                            </button></div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className={`flex-1  px-5 w-full ${sidebarVisible ? 'lg:w-[calc(100%-250px)]' : 'lg:w-full'}`}>
                    {children}
                </div>
            </div>
        </Public>
    );
};

export default SidebarLayout;
