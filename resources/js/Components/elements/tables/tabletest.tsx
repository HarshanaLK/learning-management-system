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
                    <tr key={key + "p"}>
                        <TableTd width={10} children={undefined} >
                        </TableTd>
                        {children}
                    </tr>
                    <tr key={key + "c"}>
                        <Disclosure.Panel
                            as="td"
                            colSpan={100}
                            className="py-4 pl-4 pr-3 whitespace-nowrap bg-gray-50 sm:pl-6 "
                        >
                            <span className="flex items-center space-x-4">
                                {buttons}
                            </span>
                        </Disclosure.Panel>
                    </tr>
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
            className="py-5 pl-4 border-b pr-3 text-base font-medium text-[#737373] whitespace-wrap sm:pl-6"
        >
            {children}
        </td>
    );
}

export default function MasterTable({
    tableColumns,
    filters,
    url,
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
    const [rowPerPage, setRowPerPage] = useState(filters.perPage ?? 10);
    const [sortBy, setSortBy] = useState(filters.sortBy ?? "");
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
                onClick={() =>
                    sortable &&
                    handleOnSort(
                        sortField,
                        sortDirection == "asc" ? "desc" : "asc"
                    )
                }
                scope="col"
                className={
                    (sortable ? " cursor-pointer " : " cursor-default ") +
                    " py-3.5 pl-4 pr-3 text-left text-base font-medium  sm:pl-6"
                }
            >
                <div className="flex">
                    {label}
                    {sortBy == sortField && sortDirection == "asc" && (
                        <ChevronUpIcon className="w-5 h-5" aria-hidden="true" />
                    )}
                    {sortBy == sortField && sortDirection == "desc" && (
                        <ChevronDownIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                        />
                    )}
                </div>
            </th>
        );
    }

    return (
        <>
            <div className="mt-8 md:flex md:items-center md:justify-between">
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
                            onChange={(e) => debouncedHandleSearch(e.target.value)} searchLoader={false}                        />
                    )}
                </div>
            </div>
            <div className="flow-root mt-2 bg-white rounded-lg">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden sm:rounded-lg ">
                            <table className="min-w-full divide-y  divide-[#DFDFDF]">
                                <thead className="bg-white border-b-[3px] border-[#DFDFDF]">
                                    <tr>
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
            <Pagination links={links} />
        </>
    );
}
