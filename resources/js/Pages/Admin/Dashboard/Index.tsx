import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { useDebouncedCallback } from "use-debounce";
import { IoPeopleCircle, IoSchool } from 'react-icons/io5';
import { PlayIcon } from '@heroicons/react/16/solid';
import DashboardTable, { TableBody, TableTd } from './Partials/DashboardTable';
import Calendar from 'react-calendar';
import './Calendar.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const bRoutes = [
    { name: "Dashboard", hasArrow: false, link: "/dashboard" },
];



export default function Dashboard({
    courses,
    filters,
    links,
    id,
    firstName,
    userCountByCourse,
}: {
    courses: any;
    filters: any;
    links: any;
    id: any;
    firstName: any,
    userCountByCourse: any;
}) {







    const tableColumns = [
        {},
        { label: "Course", sortField: "title", sortable: true },
        { label: "Created Date", sortField: "created_at", sortable: true },
        { label: "Amount", sortField: "purchased_income", sortable: true },
        { label: "Status", sortField: "course_status", sortable: true },
    ];

    const [value, onChange] = useState<Value>(new Date());

    const [isCalendarVisible, setIsCalendarVisible] = useState(false); // New state for calendar visibility

    const toggleCalendarVisibility = () => {
        setIsCalendarVisible((prev) => !prev);
    };





    return (
        <AdminLayout bRoutes={bRoutes}>
            <Head title="Dashboard" />
            <div className=" mb-44">
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-bold'>Hello {firstName}</h1>
                </div>
                <div className="xlm:hidden flex justify-end ">
                    <button
                        className="bg-customGreen text-white px-4 py-[2px] mt-1 rounded-full shadow-md"
                        onClick={toggleCalendarVisibility}
                    >
                        {isCalendarVisible ? "Hide Calendar" : "Show Calendar"}
                    </button>
                </div>

                <div className='flex justify-between'>
                    <div className='lg:max-w-[750px] w-full mt-12 '>
                        <div className="flex lg:justify-start justify-center sm:flex-row sm:space-x-10 space-x-4">
                            {/* Dashboard Info Cards */}
                            <div className="bg-white  sm:w-[240px] sm:h-[71px] rounded-2xl shadow-iconBox sm:px-6 sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customYellow text-left flex items-center space-x-0 hover:text-white group">
                                <IoPeopleCircle className="h-7 w-7 sm:h-12 text-customYellow sm:w-12 group-hover:text-white" />
                                <div className='pl-'>
                                    <p className="text-sm sm:text-base font-semibold group-hover:text-white">30,000+</p>
                                    <p className="text-gray-500 text-xs group-hover:text-white">Students</p>
                                </div>
                            </div>

                            <div className="bg-white sm:w-[240px] sm:h-[71px] rounded-2xl shadow-iconBox sm:px-7 sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customPurple text-left flex items-center space-x-0 hover:text-white group">
                                <div className="bg-customPurple p-1 sm:p-2 rounded-full group-hover:bg-white">
                                    <IoSchool className="h-4 w-4 sm:h-7 sm:w-7 text-white group-hover:text-customPurple" />
                                </div>
                                <div className='pl-2'>
                                    <p className="text-sm sm:text-base font-semibold group-hover:text-white">200</p>
                                    <p className="text-gray-500 text-xs group-hover:text-white">Instructors</p>
                                </div>
                            </div>

                            <div className="bg-white sm:w-[240px] sm:h-[71px] rounded-2xl shadow-iconBox sm:px-7 sm:py-2 xsm:px-3 xsm:py-1 px-1 py-1 hover:bg-customGreen text-left flex items-center space-x-0 hover:text-white group">
                                <div className="bg-customGreen p-1 sm:p-2 rounded-full group-hover:bg-white">
                                    <PlayIcon className="h-4 w-4 sm:h-7 sm:w-7 text-white group-hover:text-customGreen" />
                                </div>
                                <div className='pl-2'>
                                    <p className="text-sm sm:text-base font-semibold group-hover:text-white">10,000+</p>
                                    <p className="text-gray-500 text-xs group-hover:text-white">Videos</p>
                                </div>
                            </div>
                        </div>




                        {isCalendarVisible && (
                            <div className="xlm:hidden mt-8 flex justify-center items-center">
                                <div className="px-2 max-w-72 shadow-iconBox rounded-2xl border-[#E4E4E4] border">
                                    <Calendar onChange={onChange} value={value} />
                                </div>
                            </div>
                        )}


                        <div className='bg-[#EFF9FF] mt-16 p-5 rounded-2xl'>
                            <h2 className='text-base font-bold'>Course Summary</h2>
                            <div className="px-4 mt-10">
                                <DashboardTable
                                    tableColumns={tableColumns}
                                    filters={[filters]}
                                    url={route("dashboard.index")}
                                    links={courses.meta.links}
                                >
                                    {courses.data.map((course: any) => (
                                        <TableBody key={course.id} buttons={undefined}>
                                            <TableTd>{course.title}</TableTd>
                                            <TableTd>{course.formatted_date}</TableTd>
                                            <TableTd>${course.purchased_income}</TableTd>
                                            <TableTd>
                                                {/* <div className='px-3'>
                                                    <div className={course.course_status === 'active' ? 'text-[#2F9C58] text-center font-normal rounded-3xl py-1 text-xs bg-[#E9FAF4]' : 'text-[#FF6A54] bg-[#FFF1E0] font-normal rounded-3xl py-1 text-center text-xs'}>
                                                        {course.course_status.charAt(0).toUpperCase() + course.course_status.slice(1)}
                                                    </div>
                                                </div> */}
                                                <div className={course.course_status === 'active' ? 'text-[#2F9C58]' : 'text-[#B8AFC0]'}>
                                                    {course.course_status.charAt(0).toUpperCase() + course.course_status.slice(1)}
                                                </div>
                                            </TableTd>
                                        </TableBody>
                                    ))}
                                </DashboardTable>
                            </div>
                        </div>
                    </div>

                    <div className="xlm:block hidden mt-14">
                        <main className="px-2 shadow-iconBox rounded-2xl border-[#E4E4E4] border">
                            <Calendar onChange={onChange} value={value} minDetail='year' />
                        </main>
                    </div>
                    
                    <div className='right-1/4'>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
