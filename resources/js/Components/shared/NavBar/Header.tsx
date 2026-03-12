import Dropdown from '@/Components/elements/other/Dropdown';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Link, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import HeaderSearch from './HeaderSearch';
import Avatar from 'react-avatar';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const modalSearchRef = useRef<HTMLInputElement>(null);
    const { url, props } = usePage();


    const user = props.auth.user; // Get the authenticated user

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    useEffect(() => {
        if (isModalOpen && modalSearchRef.current) {
            modalSearchRef.current.focus();
        }
    }, [isModalOpen]);

    // check the active link
    const isActive = (route: string) => url === route;


    // search function for search bar
    const [searchParam, setSearchParam] = useState("");

    const debouncedHandleSearch = useDebouncedCallback(
        (value) => {
            setSearchParam(value);
            router.get("/courses", { searchParam: value }, { replace: true, preserveState: true });
            setIsModalOpen(!isModalOpen);
        },
        1000
    );

    const resetSearch = () => {
        setSearchParam("");
        router.get("/courses", { searchParam: "" }, { replace: true, preserveState: true });
    };

    console.log(user);

    return (
        <div className="flex ">
            {/* Sidebar */}
            <div className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>
            <aside className={`fixed z-30 left-0 top-0 w-full h-full bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleSidebar} aria-label="Close Menu" className="text-gray-700 mt-2">
                        <XMarkIcon className="h-8 w-8 text-black" aria-hidden="true" />
                    </button>
                </div>
                {/* Navigation Links */}
                <div className="flex flex-col items-center">
                    <img src="/assets/images/logo.webp" alt="LMS Logo" className="h-14 " />
                </div>
                <div className="flex flex-col p-4 mt-10 ml-2">
                    <Link href={route('home')} className={`font-bold mb-2 ${isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary  '}`}>
                        Home
                    </Link>
                    <Link href={route('courses.index')} className={`font-bold mb-2 ${isActive('/courses') ? 'text-primary' : 'text-gray-700 hover:text-primary  '}`}>
                        Courses
                    </Link>
                    <Link href={route('about')} className={`font-bold mb-2 ${isActive('/about') ? 'text-primary' : 'text-gray-700 hover:text-primary '}`}>
                        About Us
                    </Link>
                    <Link href={route('contact.index')} className={`font-bold mb-2 ${isActive('/contact') ? 'text-primary' : 'text-gray-700 hover:text-primary '}`}>
                        Contact Us
                    </Link>
                    <div className="border-t mt-2 sm:mt-4 px-10" style={{ borderTopColor: '#CCCCCC' }} />

                    <div className="flex flex-col items-center mt-4">
                        {/* Conditional rendering based on authentication */}
                        {user ? (
                            <div className="relative">
                                <div className="inline-flex items-center space-x-3">
                                    {/* Notification Icon */}
                                    <button>
                                        <img
                                            src="/assets/profile/notifications.webp"
                                            alt="Notifications"
                                            className="h-[51px] w-[51px] hover:opacity-80 hover:scale-105 transition-transform duration-200"
                                        />
                                    </button>

                                    {/* Dropdown Trigger for Profile Icon */}
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button>
                                                <span className="inline-flex rounded-md">
                                                    {user.profile_avatar ? (
                                                        <img
                                                            src={`/storage/${user.profile_avatar}`}
                                                            alt="Profile"
                                                            className="h-10 w-10 rounded-full hover:scale-105 transition-transform duration-200"
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            name={user.first_name}
                                                            size="40"
                                                            round
                                                            textSizeRatio={2}
                                                        />
                                                    )}
                                                </span>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.index')}>
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 hover:text-primary font-bold mb-2">
                                    Log in
                                </Link>
                                <Link href="/register" className="bg-primary text-white px-10 py-1 rounded-full hover:bg-blue-500 font-bold">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <nav className={`fixed z-20 top-0 left-0 right-0 flex flex-col  lg:flex-row justify-between items-center py-[16px] px-4 bg-white  transition-opacity`} >
                {/* Logo Section */}
                <div className="hidden lg:flex items-left justify-between -my-16">
                    <div className="flex item-center  xlm-:pl-14 pl-2  ">
                        <Link href={route('home')}>
                            <img src="/assets/images/logo.webp" alt="LMS Logo" className="h-16 w-auto" />
                        </Link>
                    </div>
                </div>

                {/* Small screen */}
                <div className="lg:hidden flex items-center justify-between w-full">
                    {/* Logo Section */}
                    <div className="flex items-center justify-start flex-grow ml-6">
                        <img src="/assets/images/logo.webp" alt="LMS Logo" className="h-10 w-auto" />
                    </div>

                    {/* Search Input Section */}
                    <div className="hidden md:flex items-center bg-[#F5FBFF] rounded-full w-48 mr-4 lg:mb-0 flex-grow">
                        <HeaderSearch
                            id="search"
                            defaultValue={searchParam}
                            placeholder="What do you want to learn?"
                            resetSearch={resetSearch}
                            autoComplete="search"
                            onChange={(e) => debouncedHandleSearch(e.target.value)}
                            searchLoader={false}
                            className="md:order-1"
                        />
                    </div>

                    {/* Search Button (For Modal) */}
                    <button className="text-black h-8 md:hidden mr-4" onClick={toggleModal}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.1107 12.0055L9.2324 8.12658C9.85741 7.26768 10.1936 6.23254 10.1926 5.17031C10.1926 2.39002 7.93055 0.12796 5.15026 0.12796C2.36997 0.12796 0.10791 2.39002 0.10791 5.17031C0.10791 7.9506 2.36997 10.2127 5.15026 10.2127C6.21249 10.2137 7.24763 9.87746 8.10653 9.25245L11.9855 13.1308L13.1107 12.0055ZM5.15026 8.62012C4.46786 8.62018 3.80077 8.41788 3.23335 8.0388C2.66594 7.65972 2.22368 7.12089 1.9625 6.49045C1.70133 5.86001 1.63298 5.16627 1.7661 4.49699C1.89921 3.8277 2.22781 3.21292 2.71034 2.73039C3.19287 2.24786 3.80765 1.91926 4.47694 1.78615C5.14622 1.65303 5.83996 1.72138 6.4704 1.98255C7.10084 2.24373 7.63967 2.68599 8.01875 3.2534C8.39783 3.82082 8.60013 4.48791 8.60007 5.17031C8.599 6.08493 8.23519 6.96178 7.58846 7.60851C6.94173 8.25524 6.06488 8.61905 5.15026 8.62012Z" fill="black" />
                        </svg>
                    </button>
                    {/* Hamburger Icon */}
                    <div className="flex items-center justify-end">
                        <button onClick={toggleSidebar} aria-label="Toggle Menu" className="ml-auto">
                            <Bars3Icon className="h-6 w-6 mr-1 text-black" />
                        </button>
                    </div>
                </div>



                {/* Search Input */}
                <div className="hidden lg:flex xlm-:-mr-32  bg-[#F5FBFF] rounded-full w-1/4 lg:mb-0 mt-1 ">
                    <HeaderSearch
                        id="search"
                        defaultValue={searchParam}
                        placeholder="What do you want to learn?"
                        resetSearch={resetSearch}
                        autoComplete="search"
                        onChange={(e) => debouncedHandleSearch(e.target.value)}
                        searchLoader={false}
                        className="md:order-1"
                    />
                </div>

                {/* Navigation Links for Large Screens */}
                <div className="hidden lg:flex items-center xlm-:space-x-8 space-x-6 text-lg mt-1">

                    <Link href={route('home')} className={`font-semibold ${isActive('/') ? 'text-primary' : ' hover:text-primary'}`}>
                        Home
                    </Link>
                    <Link href={route('courses.index')} className={`font-semibold ${isActive('/courses') ? 'text-primary' : ' hover:text-primary'}`}>
                        Courses
                    </Link>
                    <Link href={route('about')} className={`font-semibold ${isActive('/about') ? 'text-primary' : ' hover:text-primary'}`}>
                        About Us
                    </Link>
                    <Link href={route('contact.index')} className={`font-semibold  ${isActive('/contact') ? 'text-primary' : ' hover:text-primary'}`}>
                        Contact Us
                    </Link>

                    <div className="flex items-center xlm-:space-x-5 space-x-4 xlm-:pl-7 pl-4 xlm-:pr-10">
                        {user ? (
                            <div className="inline-flex items-center space-x-3">
                                {/* Notification Icon */}
                                <button>
                                    <img
                                        src="/assets/profile/notifications.webp"
                                        alt="Notifications"
                                        className="h-[51px] w-[51px] hover:opacity-80 hover:scale-105 transition-transform duration-200"
                                    />
                                </button>

                                {/* Dropdown Trigger for Profile Icon */}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button>
                                            <span className="inline-flex rounded-md">
                                                {user.profile_avatar ? (
                                                    <img
                                                        src={`/storage/${user.profile_avatar}`}
                                                        alt="Profile"
                                                        className="h-10 w-10 rounded-full hover:scale-105 transition-transform duration-200"
                                                    />
                                                ) : (
                                                    <Avatar
                                                        name={user.first_name}
                                                        size="40"
                                                        round
                                                        textSizeRatio={2}
                                                    />
                                                )}
                                            </span>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.index')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        ) : (
                            <>
                                <Link href={route('login')} className="hover:text-primary  font-semibold">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="bg-primary  text-white px-[24px] py-[6px] rounded-full hover:bg-blue-500 font-semibold">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>



            {/* Modal for Search */}
            <div className={`fixed inset-0 flex md:hidden items-center justify-center z-30 bg-opacity-75 transition-opacity duration-300 ease-out ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div
                    className={`bg-white p-6 rounded-lg w-full h-full max-w-none transform transition-transform duration-300 ease-out ${isModalOpen ? 'translate-y-0' : '-translate-y-full'
                        }`}
                >
                    <div className="flex justify-end items-center mb-4">
                        <button onClick={toggleModal} aria-label="Close Modal">
                            <XMarkIcon className="h-8 w-8 text-black" />
                        </button>
                    </div>
                    <div className="flex items-center bg-[#F5FBFF] px-2 rounded-full w-full">
                        <HeaderSearch
                            id="search"
                            defaultValue={searchParam}
                            placeholder="What do you want to learn?"
                            resetSearch={resetSearch}
                            autoComplete="search"
                            onChange={(e) => debouncedHandleSearch(e.target.value)}
                            searchLoader={false}
                            className="md:order-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
