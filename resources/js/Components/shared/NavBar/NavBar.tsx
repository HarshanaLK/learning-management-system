import Breadcrumbs from '@/Components/elements/header/BreadCumbs';
import Dropdown from '@/Components/elements/other/Dropdown';
import NavLink from '@/Components/elements/other/NavLink';
import ResponsiveNavLink from '@/Components/elements/other/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Avatar from 'react-avatar';




export default function NavBar({ showLogo = true, bRoutes }: {
    showLogo: boolean,
    bRoutes: any,
}
) {
    const user = usePage().props.auth.user;
    const { url } = usePage();

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <nav className="  ">
            <div className="container mx-auto px-4 sm:px-0">
                <div className="flex h-16 justify-between">
                    <div className="ml-6 mt-5">
                        <Breadcrumbs routes={bRoutes} />
                    </div>

                    <div className="flex">
                        {showLogo && (
                            <>
                                <div className="flex shrink-0 items-center">
                                    <Link href={route('home')}>
                                        <img
                                            src="/assets/images/logo.png"
                                            alt="Logo"
                                            className="h-10 w-auto"
                                        />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                </div>
                            </>
                        )}
                    </div>


                    <div className="hidden sm:ms-6 sm:flex sm:items-center mr-12 mt-4">
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
                                                    size="48" // Matches h-12 and w-12
                                                    round={true}
                                                    textSizeRatio={2}
                                                    className="hover:scale-105 transition-transform duration-200"
                                                />
                                            )}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('setting.index')}>
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

                    <div className="-me-2 flex items-center sm:hidden ">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
                <div className="border-t border-gray-200 pb-1 pt-4 ">
                    <div className="px-4">
                        <div className="text-base font-medium text-gray-800">
                            {user.first_name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        {/* <ResponsiveNavLink href={route('')}>
                            Profile
                        </ResponsiveNavLink> */}
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
