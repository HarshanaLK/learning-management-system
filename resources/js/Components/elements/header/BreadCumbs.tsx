import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Breadcrumbs = (props: { routes: any }) => {
    return (
        <nav className="self-center flex" aria-label="Breadcrumb">
            <ol
                role="list"
                className="flex items-center space-x-1 lg:space-x-4"
            >
                <li className="flex">
                    <HomeIcon className="h-4 w-4 lg:h-8 lg:w-6 flex-shrink-0 text-black" />
                </li>
                {props?.routes?.map(
                    (
                        route: {
                            name: string;
                            hasArrow: boolean;
                            link: string;
                        },
                        index: any
                    ) => (
                        <li key={index}>
                            <div className="flex">
                                {route.hasArrow && (
                                    <ChevronRightIcon
                                        className=" h-4 w-4 lg:h-6 lg:w-6 flex-shrink-0 text-black"
                                        aria-hidden="true"
                                    />
                                )}
                                <Link
                                    href={route.link}
                                    className={classNames(
                                        route.hasArrow ? " ml-1 lg:ml-4" : "",
                                        " text-[14px] lg:text-base font-medium text-black hover:text-primary"
                                    )}
                                >
                                    {route.name}
                                </Link>
                            </div>
                        </li>
                    )
                )}
            </ol>
        </nav>
    );
};
export default Breadcrumbs;
