import {
    MagnifyingGlassCircleIcon,
    XMarkIcon
} from "@heroicons/react/20/solid";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

export default forwardRef(function SearchInput(
    {
        className = "",
        isFocused = false,
        resetSearch,
        searchLoader,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean;
        resetSearch: any;
        searchLoader: boolean;
    },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
        clear: () => {
            if (localRef.current) {
                localRef.current.value = "";
            }
        }
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const handleResetSearch = () => {
        resetSearch();
        if (localRef.current) {
            localRef.current.value = "";
        }
    };

    return (
        <>
            <div className={`relative md:w-3/5 w-full rounded-l-full flex items-stretch focus-within:z-10 ${className}`}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassCircleIcon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                    />
                </div>
                <input
                    {...props}
                    ref={localRef}
                    className="focus:ring-primary block w-full rounded-l-full border border-[#0470B0] py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
                <button
                    type="button"
                    onClick={handleResetSearch}
                    className="relative bg-primary hover:bg-[#0470B0] -ml-px inline-flex items-center border border-[#0470B0] gap-x-1.5 rounded-r-full px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
                >
                    {!searchLoader && (
                        <XMarkIcon
                            className="-ml-0.5 h-5 w-5 text-white"
                            aria-hidden="true"
                        />
                    )}
                    {searchLoader && (
                        <div className="loader ease-linear animate-spin rounded-r-full border-2 border-t-4 border-[#0470B0] h-5 w-5" />
                    )}
                    <span className="text-white">{searchLoader ? 'Loading...' : 'Clear'}</span>
                </button>
            </div>
        </>
    );
});
