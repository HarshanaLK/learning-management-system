import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';
import NewCourseModal from '../Partials/Course/CourseModal';
import EditModule from '../Partials/Module/ModuleEdit';
import ModuleAdd from '../Partials/Module/ModuleAdd';
import { GrClose } from 'react-icons/gr';
import CourseModal from '../Partials/Course/CourseModal';
import LessonAdd from '../Partials/Lesson/LessonAdd';
import LessonEdit from '../Partials/Lesson/LessonEdit';
import { IoLayersOutline, IoPencil } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';
import FlashAlerts from '@/Components/elements/alerts/FlashAlerts';
import AlertDelete from '@/Components/elements/alerts/AlertDelete';



const bRoutes = [
    { name: "Dashboard", hasArrow: false, link: "/admins" },
    { name: "My Courses", hasArrow: true, link: "/courses/all" },
    { name: "Course Edit", hasArrow: true },
];

export default function CourseEdit({
    modules = [],
    course,
    courseData,
    courseTag = [],
}: {
    modules: any;
    course: any;
    courseData: any;
    courseTag: any;


}) {
    const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [isAddModuleOpen, setAddModuleOpen] = useState(false);
    const [isAddLessonOpen, setAddLessonOpen] = useState(false);
    const [editModule, setEditModule] = useState<any | null>(null);
    const [isAddCourseOpen, setAddCourseOpen] = useState(false);
    const [isEditModuleOpen, setEditModuleOpen] = useState(false);
    const [isEditLessonOpen, setEditLessonOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isRemoveModuleModalOpen, setIsRemoveModuleModalOpen] = useState(false);



    const openModal = () => setIsRemoveModalOpen(true);
    const closeModal = () => setIsRemoveModalOpen(false);

    const openModuleModal = () => setIsRemoveModuleModalOpen(true);
    const closeModuleModal = () => setIsRemoveModuleModalOpen(false);





    const toggleModule = (moduleId: string) => {
        setExpandedModules(prevState => ({
            ...prevState,
            [moduleId]: !prevState[moduleId],
        }));
    };

    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedModuleName, setSelectedModuleName] = useState<string | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const pageProps = usePage().props;


    const openAddLessonModal = (moduleId: string, moduleName: string) => {
        setSelectedModuleId(moduleId);
        setSelectedModuleName(moduleName); // Set module name
        setAddLessonOpen(true);

    };
    const openEditLessonModal = (lesson: any) => {
        setSelectedLesson(lesson);
        setEditLessonOpen(true);
    };

    const closeEditLessonModal = () => {
        setEditLessonOpen(false);
        setSelectedLesson(null);
    };

    const deleteModule = (moduleId: any) => {
        closeModuleModal();
        router.delete(route('course.modules.destroy', { courseId: course.id, moduleId: moduleId }), {
            onSuccess: () => {
            }
        });
    };



    const deleteLesson = (moduleId: string, lessonId: string) => {
        closeModal();
        router.delete(route('lesson.destroy', { courseId: course.id, moduleId: moduleId, lessonId: lessonId }), {
            onSuccess: () => {

            },
            onError: () => {
                alert("Failed to delete the lesson.");
            }
        });

    };




    return (
        <AdminLayout bRoutes={bRoutes}>
            <Head title="Course Edit" />

            <FlashAlerts flash={pageProps.flash} />
            {/* Course part */}
            <div className='bg-[#EFF9FF]  pb-10'>
                <div className="mt-6 mx-auto max-w-7xl w-full">
                    <h3 className="text-2xl  font-bold mb-6 ">Course</h3>
                    <div className='flex justify-end mb-6'>
                        <button
                            onClick={() => setAddCourseOpen(true)} // Open AddModule modal
                            className="flex bg-[#0470B0] md:px-8 px-2 md:py-[7px] py-1 text-base mt-1 font-medium text-white rounded-full md:order-2 hover:bg-[#004AAD]"
                        >
                            Edit Course
                        </button>
                    </div>

                    <div className="mt-3">
                        <table className="table-auto bg-white w-full rounded-md">
                            <thead>
                                <tr>
                                    <th className="sm:px-4 py-4 text-left sm:text-base sm:font-medium font-normal">Name</th>
                                    <th className="sm:px-4 py-4 text-left sm:text-base sm:font-medium font-normal  ">Course Status</th>
                                    <th className="sm:px-4 py-4 text-left sm:text-base sm:font-medium font-normal ">Created Date</th>
                                    <th className="sm:px-4 py-4 text-left sm:text-base sm:font-medium  font-normal ">Created Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-y-2 sm:px-4 py-3 sm:font-medium  sm:text-base font-normal">{courseData.title}</td>
                                    <td className="border-y-2 sm:px-4 py-3 sm:font-medium  sm:text-base font-normal">
                                        <div className={course.course_status === 'active' ? 'text-[#2F9C58]' : 'text-[#B8AFC0]'}>
                                            {course.course_status.charAt(0).toUpperCase() + course.course_status.slice(1)}
                                        </div>
                                    </td>
                                    <td className="border-y-2 sm:px-4 py-3 sm:font-medium sm:text-base font-normal">{courseData.formatted_date}</td>
                                    <td className="border-y-2 sm:px-4 py-3 sm:font-medium  sm:text-base font-normal">{courseData.formatted_time}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modules part */}
            <div className='bg-[#EFF9FF] mt-6 pb-6'>
                <div className="mt-6 mx-auto max-w-7xl w-full">
                    <h3 className="text-2xl  font-bold mb-6 ">Modules</h3>
                    <div className='flex justify-end mb-6'>
                        <button
                            onClick={() => setAddModuleOpen(true)} // Open AddModule modal
                            className="flex bg-[#0470B0] md:px-8 px-2 md:py-[7px] py-1 text-base mt-1 font-medium text-white rounded-full md:order-2 hover:bg-[#004AAD]"
                        >
                            + Add New Module
                        </button>
                    </div>

                    {modules.map((module: any) => (
                        <div key={module.id}>
                            <div className="flex justify-between items-center border border-[#999999] py-2">
                                <div className='flex justify-start'>
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className="text-2xl pl-2 font-semibold pr-2"
                                    >
                                        {expandedModules[module.id] ? <GoChevronDown /> : <GoChevronRight />}
                                    </button>
                                    <p className="text-base font-semibold break-all py-2 px-4">{module.module_title}</p>
                                </div>
                                <div className="flex items-center sm:flex-row flex-col space-x-5 sm:pr-3 pr-1 sm:space-y-0 space-y-2 ">
                                    <button
                                        onClick={() => openAddLessonModal(module.id, module.module_title)} // Pass moduleId and moduleTitle
                                        className="flex bg-[#2BAFFC] md:px-8 px-2 py-[5px] sm:w-52 w-[140px]  sm:text-base  sm:font-medium text-sm font-normal text-white rounded-full hover:bg-[#004AAD]"
                                    >
                                        + Add New Lesson
                                    </button>
                                    <div className='flex bg-[#00000040] sm:px-4 px-2 rounded-full items-center py-[5px] space-x-3 '>
                                        <button
                                            onClick={() => setEditModule(module)}
                                        >
                                            <IoPencil className='hover:text-primary text-xl' />
                                        </button>

                                        <button
                                            onClick={openModuleModal}
                                        >
                                            <BsTrash3 className='hover:text-primary text-xl' />
                                        </button>
                                        <AlertDelete
                                            isOpen={isRemoveModuleModalOpen}
                                            onClose={closeModuleModal}
                                            onConfirmDelete={() => deleteModule(module.id)}
                                            title="Are you sure you want to remove this Module?"
                                            message="This action cannot be undone and all associated data will be lost."
                                        />
                                    </div>
                                </div>

                            </div>

                            {expandedModules[module.id] && (
                                <div className="bg-white w-full">
                                    {module.lessons.map((lesson: any) => (
                                        <div key={lesson.id} className="bg-white p-2 pl-4 border border-[#00000040]">
                                            <div className='flex justify-between items-center'>
                                                <div className="flex items-center justify-start ml-1">
                                                    <IoLayersOutline className="text-xl mr-2 min-w-5" />
                                                    <p className="text-[0.938] font-medium break-all ml-2">{lesson.lesson_title}</p>
                                                </div>

                                                <div className='pr-1'>
                                                    <div className='flex bg-[#00000040] sm:px-4 px-2 rounded-full items-center py-[6px] space-x-3'>
                                                        <button
                                                            onClick={() => openEditLessonModal(lesson)}
                                                        >
                                                            <IoPencil className='hover:text-primary text-lg' />
                                                        </button>
                                                        <button
                                                            onClick={openModal}// Pass module.id along with lesson.id
                                                        >
                                                            <BsTrash3 className='hover:text-primary text-lg' />
                                                        </button>
                                                        <AlertDelete
                                                            isOpen={isRemoveModalOpen}
                                                            onClose={closeModal}
                                                            onConfirmDelete={() => deleteLesson(module.id, lesson.id)}
                                                            title="Are you sure you want to remove this Lesson?"
                                                            message="This action cannot be undone and all associated data will be lost."
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            {isAddModuleOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-10 right-10 text-xl hover:text-gray-600"
                            onClick={() => setAddModuleOpen(false)} // Close the modal when clicked
                        >
                            <GrClose />
                        </button>
                        <ModuleAdd course={course} onClose={() => setAddModuleOpen(false)} />
                    </div>
                </div>
            )}


            {isAddCourseOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-xl hover:text-gray-600"
                            onClick={() => setAddCourseOpen(false)} // Close the modal when clicked
                        >
                            <GrClose />
                        </button>
                        {/* Inner scrollable container */}
                        <div className="max-h-[80vh] overflow-y-auto">
                            <CourseModal course={course} onCancel={() => setAddCourseOpen(false)} courseTag={courseTag} />
                        </div>
                    </div>
                </div>
            )}


            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
                    <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setAddCourseOpen(false)}
                            className="absolute top-10 right-10 text-xl hover:text-gray-600">

                            <GrClose />
                        </button>
                        <NewCourseModal course={course} onCancel={() => setModalOpen(false)} courseTag={courseTag} />
                    </div>
                </div>
            )}



            {isAddLessonOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-10 right-10 text-xl hover:text-gray-600"
                            onClick={() => setAddLessonOpen(false)}
                        >
                            <GrClose />
                        </button>
                        <LessonAdd
                            onClose={() => setAddLessonOpen(false)}
                            modules={modules}
                            selectedModuleId={selectedModuleId}
                            module_name={selectedModuleName}
                        />
                    </div>
                </div>
            )}


            {editModule && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setEditModule(null);
                                setEditModuleOpen(false);
                            }}
                            className="absolute top-10 right-10 text-xl hover:text-gray-600"
                        >
                            <GrClose />
                        </button>
                        <EditModule

                            course={course} module={editModule}
                            onCancel={() => {
                                setEditModule(null);
                                setEditModuleOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}


            {isEditLessonOpen && selectedLesson && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <LessonEdit
                        lesson={selectedLesson}
                        onCancel={closeEditLessonModal}
                        selectedModuleId={selectedModuleId}
                        module_name={selectedModuleName}
                        onSuccess={() => {
                            closeEditLessonModal();
                        }}
                    />
                </div>
            )}
        </AdminLayout>
    );
}
