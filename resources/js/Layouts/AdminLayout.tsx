import { useState, useEffect } from 'react';

import NavBar from '@/Components/shared/NavBar/NavBar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/Components/shared/AdminSidebar/AdminSideBar';
import Dropdown from '@/Components/elements/other/Dropdown';
import { usePage } from '@inertiajs/react';
import Avatar from 'react-avatar';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminLayout({ children, bRoutes }: { children: any; bRoutes: any }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Update window width on resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);

            // Auto-close sidebar if screen width is less than 1024px
            if (width > 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = ''; // Clean up on unmount
        };
    }, [sidebarOpen]);




    return (
        <div className="w-full h-full relative">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Overlay when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
                />
            )}

            <div className="lg:pl-72 ">
                <div className="sticky lg:hidden top-0 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
                    <div className='z-10'>
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden "
                            onClick={() => setSidebarOpen((prev) => !prev)}
                        >
                            <span className="sr-only">Toggle sidebar</span>
                            {sidebarOpen ? (
                                <XMarkIcon className="w-8 h-8 text-white z-60 " aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    <div className="sm:ms-6 sm:flex sm:items-center absolute right-0 top-0 mt-2 me-4">
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button>
                                        <span className="inline-flex rounded-md">
                                            {user.profile_avatar ? (
                                                <img
                                                    src={`/storage/${user.profile_avatar}`}
                                                    alt="Profile"
                                                    className="h-12 w-12 rounded-full hover:scale-105 transition-transform duration-200"
                                                />
                                            ) : (
                                                <Avatar
                                                    name={`${user.first_name}`}
                                                    size="48"
                                                    round={true}
                                                    textSizeRatio={2}
                                                    className="hover:scale-105 transition-transform duration-200"
                                                />
                                            )}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('setting.index')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:pl-80">
                {/* Conditionally render NavBar based on window width */}
                {windowWidth > 1023 && <NavBar showLogo={false} bRoutes={bRoutes} />}
                <main
                    className={`px-4 lg:px-8 flex flex-col min-h-[94vh] transition-opacity duration-300 ${sidebarOpen ? 'pointer-events-none opacity-50' : ''
                        }`}
                >
                    {/* Content goes here */}
                    <div >
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
