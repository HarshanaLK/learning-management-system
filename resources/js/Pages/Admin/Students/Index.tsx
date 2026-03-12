import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SearchInput from '@/Components/elements/inputs/SearchInput';
import { useDebouncedCallback } from 'use-debounce';
import { IoPencil } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';
import AlertDelete from '@/Components/elements/alerts/AlertDelete';
import { GrClose } from 'react-icons/gr';
import InputError from '@/Components/elements/inputs/InputError';
import MasterTable, { TableBody, TableTd } from './Partials/StudentTable';
import AdminFlashAlerts from '@/Components/elements/alerts/AdminFlashAlerts';




const bRoutes = [
    { name: "Dashboard", hasArrow: false, link: "/dashboard" },
    { name: "Student Management", hasArrow: true, link: "/students" },

];

export default function Dashboard({
    students,
    filters,
}: {
    students: any;
    filters: any;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const pageProps = usePage().props;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSuccessDelete, setIsSuccessDelete] = useState(false);
    const [isSuccessAdd, setIsSuccessAdd] = useState(false);
    const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);


    const openModal = (student: any) => {
        setSelectedStudent(student);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setSelectedStudent({ first_name: '', last_name: '', email: '', password: '' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setIsModalOpen(false);
        setErrors({});

    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        if (!selectedStudent) {
            console.error("No student selected for deletion.");
            return;
        }

        router.delete(route('students.destroy', { id: selectedStudent.id }), {
            onSuccess: () => {
                setSelectedStudent(null);
                setIsSuccessDelete(true);
                setTimeout(() => {
                    setIsSuccessDelete(false);
                }, 5000);
            },
        });
        setIsDeleteModalOpen(false);
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();

        if (isEditing) {
            router.patch(route("students.update", { id: selectedStudent.id }), selectedStudent, {
                onSuccess: () => {
                    closeModal();
                    setIsSuccessUpdate(true);
                    setTimeout(() => {
                        setIsSuccessDelete(false);
                    }, 5000);
                },
                onError: (error) => {
                    setErrors(error); // Set errors when there's a validation failure
                }
            });
        } else {
            router.post(route("students.store"), selectedStudent, {
                onSuccess: () => {
                    closeModal();
                    setIsSuccessAdd(true);
                    setTimeout(() => {
                        setIsSuccessDelete(false);
                    }, 5000);
                },
                onError: (error) => {
                    setErrors(error); // Set errors when there's a validation failure
                }
            });
        }
    };


    const tableColumns = [
        {
            label: "",
            sortable: false,
        },
        {
            label: "Name",
            sortField: "first_name",
            sortable: true,
        },
        {
            label: "Email",
            sortField: "email",
            sortable: true,
        },
        {
            label: "Course Count",
            sortField: "course_count",
            sortable: true,
        },
        {
            label: "Action",

        },

    ];

    const createLink = {
        url: "#",
        label: "Add New Student",
        onClick: openAddModal,
    };

    // search function for search bar
    const [searchParam, setSearchParam] = useState("");

    const debouncedHandleSearch = useDebouncedCallback(
        (value) => {
            setSearchParam(value);
            router.get("/students", { searchParam: value }, { replace: true, preserveState: true });
        },
        1000
    );

    const resetSearch = () => {
        setSearchParam("");
        router.get("/students", { searchParam: "" }, { replace: true, preserveState: true });
    };



    return (
        <AdminLayout bRoutes={bRoutes}>
            <Head title="Student Management" />
            <AdminFlashAlerts flash={pageProps.flash} />
            <div className="max-w-7xl w-full mx-auto overflow-hidden mt-6 mb-20  ">
                <div className=" items-center  bg-[#EFF9FF] pb-10 pt-4 md:pr-5 md:pl-10">
                    <div className="flex justify-between">
                        <h2 className="sm:text-2xl  sm:font-bold text-lg font-semibold ">Student Management</h2>
                        <button
                            onClick={openAddModal}
                            className="bg-[#0470B0] md:px-8 px-1 md:py-[6px] py-1 md:hidden text-sm mt-1 font-medium text-white rounded-full md:order-2 hover:bg-primary"
                        >
                            + Add New Student
                        </button>
                    </div>
                    <div className='flex justify-between mt-10'>
                        <SearchInput
                            id="search"
                            defaultValue={searchParam}
                            placeholder="Search students..."
                            resetSearch={resetSearch}
                            autoComplete="search"
                            onChange={(e) => debouncedHandleSearch(e.target.value)}
                            searchLoader={false}
                            className="md:order-1"
                        />
                        <button onClick={openAddModal}
                            className="bg-[#0470B0] md:px-8 px-4 py-[6px] hidden md:block hover:bg-primary text-base font-medium text-white rounded-full md:order-2"
                        >
                            + Add New Student
                        </button>
                    </div>
                </div>

                <div className="">
                    {students.data.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-lg font-semibold mt-36">
                                <span className='text-3xl'>🤷‍♂️</span> No student found matching your search.
                            </p>
                        </div>
                    ) : (
                        <MasterTable
                            tableColumns={tableColumns}
                            filters={[filters]}
                            url={route("students.index")}
                            createLink={createLink}
                            links={students.meta.links}
                        >
                            {students.data.map((student: any) => (
                                <TableBody
                                    buttons={
                                        <>
                                        </>
                                    }
                                    key={student.id}
                                >
                                    <TableTd>
                                        {student.first_name} {student.last_name}
                                    </TableTd>
                                    <TableTd>
                                        {student.email}
                                    </TableTd>
                                    <TableTd>
                                        {student.course_count}
                                    </TableTd>
                                    <TableTd>
                                        <div className="flex items-center flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
                                            <button
                                                onClick={() => openModal(student)}
                                            >
                                                <IoPencil className='hover:text-primary' />
                                            </button>

                                            <div>
                                                <button
                                                    onClick={() => {
                                                        setSelectedStudent(student);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                >
                                                    <BsTrash3 className="hover:text-primary" />
                                                </button>
                                                <AlertDelete
                                                    isOpen={isDeleteModalOpen}
                                                    onClose={() => setIsDeleteModalOpen(false)}
                                                    onConfirmDelete={handleDelete}
                                                    title="Are you sure you want to delete this student?"
                                                    message="This action cannot be undone and all associated data will be lost."
                                                />
                                            </div>
                                        </div>
                                    </TableTd>
                                </TableBody>
                            ))}
                        </MasterTable>
                    )}
                </div>

            </div>



            {/* Modal for editing or adding student details */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="relative bg-white rounded-2xl max-w-xl  w-full p-6 py-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-xl hover:text-gray-600"
                            onClick={closeModal} // Close the modal when clicked
                        >
                            <GrClose />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Student" : "Add Student"}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-6 mt-6">
                                <label className="block text-base font-normal ">First Name<span className="text-red-500"> *</span></label>
                                <input
                                    type="text"
                                    value={selectedStudent.first_name}
                                    placeholder='Add student first name'
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, first_name: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-[#999999] rounded-md"
                                />
                                <InputError message={errors.first_name} />
                            </div>

                            <div className="mb-6">
                                <label className="block text-base font-normal">Last Name<span className="text-red-500"> *</span></label>
                                <input
                                    type="text"
                                    value={selectedStudent.last_name}
                                    placeholder='Add student last name'
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, last_name: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-[#999999] rounded-md"
                                />
                                <InputError message={errors.last_name} />
                            </div>
                            <div className="mb-6">
                                <label className="block text-base font-normal">Email<span className="text-red-500"> *</span></label>
                                <input
                                    type="text"
                                    value={selectedStudent.email}
                                    placeholder='Add student email address'
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-[#999999] rounded-md"
                                    autoComplete="new-email"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="mb-6">
                                <label className="block text-base font-normal">Password {!isEditing && <span className="text-red-500"> *</span>}</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={selectedStudent.password}
                                        placeholder='Add student new password'
                                        onChange={(e) =>
                                            setSelectedStudent({ ...selectedStudent, password: e.target.value })
                                        }
                                        className="mt-1 block w-full px-3 py-2 border border-[#999999] rounded-md pr-12"
                                        autoComplete="off"
                           
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600 "
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>
                            <div className="flex justify-end space-x-3 mt-9">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="sm:px-8 px-4 py-1 border-2 text-base font-medium border-[#0470B0] text-[#0470B0] rounded-full hover:border-[#004AAD] hover:text-[#004AAD]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="sm:px-8 px-4 py-1 border-2 text-base font-medium bg-[#0470B0] border-[#0470B0] rounded-full hover:bg-[#004AAD] hover:border-[#004AAD] text-white"
                                >
                                    {isEditing ? "Save" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </AdminLayout>
    );
}
