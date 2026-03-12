import { Link } from "@inertiajs/react";
import { ButtonHTMLAttributes, useState } from "react";

export default function ConfirmButton({
    className = "",
    disabled,
    label,
    url,
    message,
    yesText,
    noText,
    ...props
}: {
    className?: string;
    disabled?: boolean;
    url: string;
    label: string;
    message?: string;
    yesText?: string;
    noText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {

    const [collapse, setCollapse] = useState(false);

    return (
        <div
            className={
                (collapse == true ? " pl-4 " : " w-[auto] !bg-white") +
                " duration-300 ease-in-out transition-all inline-flex bg-red-100 rounded-lg"
            }
        >
            {collapse && (
                <span className="self-center text-red-900 mr-4">
                    Are you sure?
                </span>
            )}
            <div className="ml-auto ">
                {collapse && (
                    <Link
                        method="delete"
                        href={url}
                        as="button"
                        className="inline-flex items-center px-4 py-2  bg-red-600 border border-transparent rounded-l-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Yes
                    </Link>
                )}
                <span
                    onClick={() => setCollapse(!collapse)}
                    className={
                        `${
                            collapse
                                ? " bg-slate-600 hover:bg-slate-500 active:bg-slate-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-slate-500 "
                                : " bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 "
                        } inline-flex cursor-pointer items-center px-6 py-2 border border-transparent font-semibold text-xs text-white uppercase tracking-widest  focus:ring-offset-2 transition ease-in-out duration-150 ${
                            disabled && "opacity-25"
                        } ` + className
                    }
                >
                    <span>
                        {collapse ? "No" : label}
                    </span>
                </span>
            </div>
        </div>
    );
}
