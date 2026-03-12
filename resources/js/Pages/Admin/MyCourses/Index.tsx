import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import MasterTable, {
    TableBody,
    TableTd,
} from "@/Components/elements/tables/masterTable";
import DeleteModal from '@/Components/elements/alerts/DeleteAlert';
import { useDebouncedCallback } from "use-debounce";
import SearchInput from '@/Components/elements/inputs/SearchInput';
import { IoPencil } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';
import { MdOutlinePreview } from 'react-icons/md';
import AdminFlashAlerts from '@/Components/elements/alerts/AdminFlashAlerts';


const bRoutes = [
    { name: "Dashboard", hasArrow: false, link: "/dashboard" },
    { name: "My Courses", hasArrow: true, link: "/courses/all" },
];

export default function MyCourses({
    courses,
    filters,
    links,
    id,
}: {
    courses: any;
    filters: any;
    links: any;
    id: any;
}) {
    const [, setIsModalOpen] = useState(false);
    const [setSelectedCourse] = useState<any>(null);
    const [, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<any>(null);
    const [isSuccessDelete, setIsSuccessDelete] = useState(false);
    const pageProps = usePage().props;

    const openModal = (course: any) => {
        setSelectedCourse(course);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openDeleteModal = (course: any) => {
        setCourseToDelete(course);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCourseToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = () => {
        if (courseToDelete) {
            router.delete(route("courses.destroy", { id: courseToDelete.id }), {
                onSuccess: () => {
                    closeDeleteModal();
                    setIsSuccessDelete(true);
                    setTimeout(() => {
                        setIsSuccessDelete(false);
                    }, 5000);
                },
            });
        }
    };


    // search function for search bar
    const [searchParam, setSearchParam] = useState("");

    const debouncedHandleSearch = useDebouncedCallback(
        (value) => {
            setSearchParam(value);
            router.get("/courses/all", { searchParam: value }, { replace: true, preserveState: true });
        },
        1000
    );

    const resetSearch = () => {
        setSearchParam("");
        router.get("/courses/all", { searchParam: "" }, { replace: true, preserveState: true });
    };



    const tableColumns = [
        { label: "" },
        { label: "Name", sortField: "title", sortable: true },
        { label: "Course Status", sortField: "course_status", sortable: true },
        { label: "Created Date", sortField: "created_date", sortable: true },
        { label: "Time", sortField: "created_time", sortable: true },
        { label: "Action" },
    ];



    const handleShow = (id: number) => {
        router.get(route('courses.edit', id));
    };



    const handlePreview = (id: number) => {
        router.get(route('courses.preview', id));
    };


    return (
        <AdminLayout bRoutes={bRoutes}>
            <Head title="My Courses" />
            <AdminFlashAlerts flash={pageProps.flash} />
            <div className="max-w-7xl w-full mt-4 mx-auto overflow-hidden mb-44">
                <div className="bg-[#EFF9FF] pb-10 pt-4 md:pr-5 md:pl-10">
                    <div className="flex items-center md:space-y-0 px-2 mt-2 md:ml-0 justify-between w-full">
                        <h2 className='sm:text-2xl  sm:font-bold text-lg font-semibold'>My Courses</h2>
                        <button
                            onClick={() => router.get(route('courses.create'))}
                            className="bg-[#0470B0] md:px-8 px-2 md:py-[6px] py-1 md:hidden text-sm mt-1 font-medium text-white rounded-full md:order-2 hover:bg-primary"
                        >
                            + Add New Course
                        </button>
                    </div>

                    {/* Search bar */}
                    <div className="flex flex-col px-2 md:flex-row items-center md:space-y-0 space-y-12 md:mt-10 md:ml-0 justify-between w-full">
                        <button
                            onClick={() => router.get(route('courses.create'))}
                            className="bg-[#0470B0] md:px-8 px-4 py-[6px] hidden md:block hover:bg-primary text-base font-medium text-white rounded-full md:order-2"
                        >
                            + Add New Course
                        </button>

                        <SearchInput
                            id="search"
                            defaultValue={searchParam}
                            placeholder="Search my courses..."
                            resetSearch={resetSearch}
                            autoComplete="search"
                            onChange={(e) => debouncedHandleSearch(e.target.value)}
                            searchLoader={false}
                            className="md:order-1"
                        />
                    </div>
                </div>

                <div className="px-4">
                    {courses.data.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-lg font-semibold mt-36">
                                <span className='text-3xl'>🤷‍♂️</span> No courses found matching your search.
                            </p>
                        </div>
                    ) : (
                        <MasterTable
                            tableColumns={tableColumns}
                            filters={[filters]}
                            url={route("courses.all")}
                            links={courses.meta.links}
                        >
                            {courses.data.map((course: any) => (
                                <TableBody key={course.id} buttons={undefined}>
                                    <TableTd>{course.title}</TableTd>
                                    <TableTd>
                                        <div className={course.course_status === 'active' ? 'text-[#2F9C58]' : 'text-[#B8AFC0]'}>
                                            {course.course_status.charAt(0).toUpperCase() + course.course_status.slice(1)}
                                        </div>
                                    </TableTd>
                                    <TableTd>{course.formatted_date}</TableTd>
                                    <TableTd>{course.formatted_time}</TableTd>
                                    <TableTd>
                                        <button className='pr-2'
                                            onClick={() => handleShow(course.id)}>
                                            <IoPencil className='hover:text-primary' />
                                        </button>
                                        <button className='pr-2'
                                            onClick={() => handlePreview(course.id)}
                                        >
                                            <MdOutlinePreview className='hover:text-primary' />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(course)}
                                        >
                                            <BsTrash3 className='hover:text-primary' />
                                        </button>
                                    </TableTd>
                                </TableBody>
                            ))}
                        </MasterTable>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirmDelete={confirmDelete}
            />
        </AdminLayout>
    );
}
