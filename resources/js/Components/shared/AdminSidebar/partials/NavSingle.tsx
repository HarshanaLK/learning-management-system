import { navigationLinks } from "@/lib/SideNavLinks";
import { Link, usePage } from "@inertiajs/react";
import classNames from "classnames";

// NavSingle component
export default function NavSingle({
    startWith,
    routeName,
    name,
    icon: Icon,
    firstItem,
}: {
    startWith?: string;
    routeName?: any;
    name: any;
    icon: React.ElementType;
    firstItem?: boolean;
}) {
    const { url } = usePage();

    function isActive(startWith?: string) {
        return startWith === "/" ? url === startWith : url.startsWith(startWith ?? "");
    }

    return (
        <div className="py-[1px]">
            <Link
                href={routeName}
                className={classNames(
                    isActive(startWith)
                        ? "text-black px-10 py-3 shadow bg-[#2BAFFC] text-lg "
                        : "text-white px-10 py-3 text-lg cursor-pointer hover:text-black hover:shadow hover:bg-[#2BAFFC]",
                    "group mt-0 flex items-center font-medium duration-300 ease-in-out transition-all w-full",
                    firstItem ? "ml-32" : "p-2" // Adjust margin or padding for the first item
                )}
                aria-current={isActive(startWith) ? "page" : undefined}
            >
                <Icon
                    className={classNames(
                        isActive(startWith)
                            ? "text-black text-lg"
                            : "text-white text-lg group-hover:text-black duration-300 ease-in-out transition-all",
                        "mr-6 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                />
                <span className="text">{name}</span>
            </Link>
        </div>
    );
}

// Mapping through the navigation links
{navigationLinks.map((link, index) => (
    <NavSingle
        key={index}
        startWith={link.startWith}
        routeName={link.route}
        name={link.name}
        icon={link.icon}
        firstItem={link.firstItem} // Correctly pass firstItem
    />
))}
