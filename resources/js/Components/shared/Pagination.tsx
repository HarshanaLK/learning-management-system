
import classNames from "classnames";
import { Link } from "@inertiajs/react";

const PageLink = ({
    active,
    label,
    url,
}: {
    active: any;
    label: string;
    url: string;
}) => {
    const className = classNames(
        [
            "mr-1 mb-1",
            "px-4 py-3",
            "border border-solid border-gray-300 rounded",
            "text-sm",
            "hover:bg-primary",
            "focus:outline-none focus:border-indigo-700 focus:text-indigo-700",
        ],
        {
            "bg-primary": active,
        }
    );
    return (
        <Link className={className} href={url}>
            <span dangerouslySetInnerHTML={{ __html: label }}></span>
        </Link>
    );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }: { label: string }) => {
    const className = classNames(
        "mr-1 mb-1 px-4 py-3 text-sm border rounded border-solid border-gray-300 text-gray"
    );
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: label }}
        />
    );
};

export default ({ links = [] }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null;
    return (
        <div className="flex flex-wrap mt-6 -mb-1 justify-end">
            {links.map(({ active, label, url }, index) => {
                // Hide "Previous" on the first page
                if (index === 0 && url === null) return null;

                // Hide "Next" on the last page
                if (index === links.length - 1 && url === null) return null;

                return url === null ? (
                    <PageInactive key={label} label={label} />
                ) : (
                    <PageLink
                        key={label}
                        label={label}
                        active={active}
                        url={url}
                    />
                );
            })}
        </div>
    );
};
