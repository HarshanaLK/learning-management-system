import SearchInput from "@/Components/elements/inputs/SearchInput";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/Components/shared/Pagination";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function TableBody({
    key,
    children,
    buttons,

}: {
    key: any;
    children: any;
    buttons: any;

}) {
    return (
        <Disclosure as="tbody" className="w-full bg-white " key={key}>
            {({ open }) => (
                <>
                    <tr key={key + "p"}  >
                        <TableTd width={20} children={undefined}  >
                            {/* <Disclosure.Button className="w-12 text-gray-900">
                                <span className="flex items-center">
                                    {open ? (
                                        <ChevronDownIcon
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ChevronRightIcon
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>
                            </Disclosure.Button> */}
                        </TableTd>
                        {children}
                    </tr>
                    {/* <tr key={key + "c"}>
                        <Disclosure.Panel
                            as="td"
                            colSpan={100}
                            className="py-4 pl-4 pr-3 whitespace-nowrap bg-gray-50 sm:pl-6 "
                        >
                            <span className="flex items-center space-x-4">
                                {buttons}
                            </span>
                        </Disclosure.Panel>
                    </tr> */}
                </>
            )}
        </Disclosure>
    );
}

export function TableTd({
    children,
    width,

}: {
    children: any;
    width?: number;

}) {
    return (
        <td
            width={width}
            color="blue"
            className="py-5 border-b  pl-4 pr-3  bg-[#F9FAFC] text-sm font-normal text-[#222222] whitespace-wrap sm:pl-6"
        >
            {children}
        </td>
    );
}

export default function MasterTable({
    tableColumns,
    filters,
    url,
    createLink,
    importLink,
    exportLink,
    filterBar = true,
    search,
    links,
    children,
}: {
    tableColumns: any;
    filters: any;
    url: string;
    createLink?: {
        label: string;
        url: string;
    };
    importLink?: {
        label: string;
        url: string;
    };
    exportLink?: {
        label: string;
        url: string;
    };
    search?: {
        placeholder: string;
    };
    filterBar?: boolean;
    links: any;
    children: any;
}) {
    const [searchParam, setSearchParam] = useState(filters.searchParam ?? "");
    const [page, setPage] = useState(filters.page ?? 1);
    const [rowPerPage, setRowPerPage] = useState(filters.perPage ?? 5);
    const [sortBy, setSortBy] = useState(filters.sortBy ?? "title");
    const [sortDirection, setSortDirection] = useState(
        filters.sortDirection ?? "desc"
    );



    function revisitPage() {
        router.get(
            url,
            {
                page: page,
                rowPerPage: rowPerPage,
                sortBy: sortBy,
                sortDirection: sortDirection,
                searchParam: searchParam,
            },
            {
                replace: true,
                preserveState: true,
            }
        );
    }

    const handleOnSort = (column: any, direction: any) => {
        if (column && direction) {
            setSortBy(column);
            setSortDirection(direction);
            revisitPage();
        }
    };

    const debouncedHandleSearch = useDebouncedCallback(
        // function
        (value) => {
            setSearchParam(value);
            setPage(1);
            revisitPage();
        },
        // delay in ms
        1000
    );

    const resetSearch = () => {
        setSearchParam("");
        setPage(1);
        revisitPage();
    };

    function tableTh({
        label,
        sortField,
        sortable,
    }: {
        label: string;
        sortField: string;
        sortable: boolean;
    }) {
        return (
            <th
                key={sortField}
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-base font-medium sm:pl-6"
            >
                <div className="flex items-center space-x-1">
                    {sortable ? (
                        <>
                            <span
                                className="text-base font-medium cursor-pointer"
                                onClick={() =>
                                    handleOnSort(
                                        sortField,
                                        sortDirection === "asc" ? "desc" : "asc"
                                    )
                                }
                            >
                                {label}
                            </span>
                            {sortBy === sortField && (
                                <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                        handleOnSort(
                                            sortField,
                                            sortDirection === "asc" ? "desc" : "asc"
                                        )
                                    }
                                >
                                    {sortDirection === "asc" ? (
                                        <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                    )}
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-base font-medium cursor-default">
                            {label}
                        </span>
                    )}
                </div>
            </th>
        );
    }

    return (
        <>
            <div className=" md:flex md:items-center md:justify-between">
                <div className="flex self-center w-2/8">
                    {search && (
                        <SearchInput
                            id="search"
                            className="self-center block w-full"
                            isFocused
                            defaultValue={searchParam}
                            placeholder={search.placeholder}
                            resetSearch={resetSearch}
                            autoComplete="search"
                            onChange={(e) => debouncedHandleSearch(e.target.value)} searchLoader={false} />
                    )}
                </div>
            </div>
            <div className="flow-root mt-2 bg-white rounded-lg">
                <div className=" overflow-x-auto  -mx-8">
                    <div className="inline-block min-w-full  align-middle ">
                        <div className="overflow-hidden sm:rounded-lg  ">
                            <table className="min-w-full divide-y  divide-[#DFDFDF]">
                                <thead className="bg-[#EFF9FF] ">
                                    <tr >
                                        {tableColumns.map((column: any) =>
                                            tableTh({
                                                label: column.label,
                                                sortField: column.sortField,
                                                sortable: column.sortable,
                                            })
                                        )}
                                    </tr>
                                </thead>
                                {children}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex lg:justify-end justify-center">
            <Pagination links={links} />
            </div>
        </>
    );
}
