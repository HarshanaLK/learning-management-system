import { CircleStackIcon } from "@heroicons/react/24/outline";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import { ButtonHTMLAttributes } from "react";

const classes =
    "inline-flex items-center text-sm px-6 py-2 bg-primary border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 transition ease-in-out duration-150";

const disabledClasses = "opacity-75 cursor-not-allowed";

export function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={` ${classes} ${
                disabled && disabledClasses
            } ${className}`}
            disabled={disabled}
        >
            {!disabled && children}
            {disabled && (
                <div className="loader h-5 w-5 bg-primary animate-spin rounded-full border-2 border-t-4 border-gray-700 ease-linear" />
            )}
        </button>
    );
}

export function PrimaryLink({
    className = "",
    disabled,
    children,
    href,
    ...props
}: InertiaLinkProps & {
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            {...props}
            className={` ${classes} ${
                disabled && disabledClasses
            } ${className}`}
            disabled={disabled}
        >
            {disabled ? <span className="animate-ping">...</span> : children}
        </Link>
    );
}
