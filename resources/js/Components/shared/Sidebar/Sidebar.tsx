import { Dialog, Transition } from "@headlessui/react";
import {
    BookOpenIcon,
    HomeIcon,
    CurrencyDollarIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import { Fragment } from "react/jsx-runtime";

const navigation = [
    {
        name: "Home",
        href: "admin.index",
        icon: HomeIcon,
        count: "5",
        startFrom: "/admin",
    },
    {
        name: "Students",
        href: "admin.index",
        icon: UsersIcon,
        count: "5",
        startFrom: "/",
    },
    {
        name: "Courses",
        href: "admin.index",
        icon: BookOpenIcon,
        count: "5",
        startFrom: "/",
    },
    {
        name: "Purchases",
        href: "admin.index",
        icon: CurrencyDollarIcon,
        count: "5",
        startFrom: "/",
    },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: any) {
    const { url } = usePage();
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    className="relative z-50 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>


                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <h6 className="absolute text-white mx-auto text-center text-sm font-[800]">
                                            LMS
                                        </h6>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul
                                            role="list"
                                            className="flex flex-1 flex-col gap-y-7"
                                        >
                                            <li>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 space-y-1"
                                                >
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                href={route(
                                                                    item.href
                                                                )}
                                                                className={classNames(
                                                                    url ==
                                                                        item.startFrom
                                                                        ? "bg-primary-800 text-white"
                                                                        : "text-gray-400 hover:text-white hover:bg-primary-800",
                                                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                )}
                                                            >
                                                                <item.icon
                                                                    className="h-6 w-6 shrink-0"
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>


            {/* side bar display */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[280px] lg:flex-col">

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center ml-12 relative">
                        <h6 className="absolute text-white mx-auto text-center text-4xl font-[800]">
                            LMS
                        </h6>
                    </div>
                    <nav className="flex flex-1 flex-col mt-8">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-3"
                        >
                            <li>
                                <ul role="list" className="-mx-2 space-y-7">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={route(item.href)}
                                                className={classNames(
                                                    url == item.startFrom
                                                        ? "bg-primary-800 text-white"
                                                        : "text-gray-400 hover:text-white hover:bg-primary-800",
                                                    "group flex gap-x-3 rounded-md p-4 text-sm leading-6 font-semibold"
                                                )}
                                            >
                                                <item.icon
                                                    className="h-6 w-6 shrink-0"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
