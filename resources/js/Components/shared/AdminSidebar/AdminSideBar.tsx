import { FC } from "react";
import { navigationLinks } from "@/lib/SideNavLinks";
import NavMulti from "./partials/NavMulti";
import NavSeparator from "./partials/NavSeparator";
import NavSingle from "./partials/NavSingle";
import NavTitle from "./partials/NavTitle";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

interface ISidebar {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: FC<ISidebar> = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            {/* Static sidebar for desktop */}
            <div className={`fixed lg:flex w-[320px] z-20 h-full lg:flex-col bg-[#00131E] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex flex-grow flex-col overflow-y-auto pb-4  pt-0">
                    <div className='z-10 mt-4 ml-4 absolute'>
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
                    <div className="flex  shrink-0 items-center ml-12 relative">
                        <div className="flex flex-col items-center">
                            <Link href={route('dashboard.index')}>
                                <img src="/assets/images/logo.webp" alt="LMS Logo" className="h-14 ml-6 mt-5 w-auto" />
                            </Link>
                        </div>
                    </div>
                    <div
                        className="border-t mt-8 pt-4 "  // Set width and center it
                        style={{ borderTopColor: '#A4A5A4' }}>
                    </div>

                    <nav aria-label="Sidebar" className="overflow-auto flex flex-1 flex-col">
                        <div className="py-10">
                            {navigationLinks.map((item: any, index: number) => (
                                <div key={index}>
                                    {item.link && item.children?.length > 0 && (
                                        <NavMulti
                                            name={item.name}
                                            startWith={item.startWith}
                                            icon={item.img}
                                            children={item.children}
                                        />
                                    )}
                                    {item.link && !item.children && (
                                        <NavSingle
                                            name={item.name}
                                            startWith={item.startWith}
                                            routeName={route(item.route)}
                                            icon={item.icon}
                                        />
                                    )}
                                    {!item.link && item.border && (
                                        <NavSeparator name={item.name} />
                                    )}
                                    {!item.link && !item.border && (
                                        <NavTitle name={item.name} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
