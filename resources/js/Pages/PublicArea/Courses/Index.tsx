import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Public from '@/Layouts/PublicLayout';
import CourseCard from '../Home/Partials/CourseCard';
import { Head } from '@inertiajs/react';

export default function AllCourse({
    allCourses,
}: {
    allCourses: any[];
}) {

    console.log(allCourses);

    const [currentPage, setCurrentPage] = useState(0);
    const coursesPerPage = 12;

    const offset = currentPage * coursesPerPage;
    const currentCourses = allCourses.slice(offset, offset + coursesPerPage);
    const pageCount = Math.ceil(allCourses.length / coursesPerPage);

    // Handle page change
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    // Scroll to top after page change
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [currentPage]);




    return (
        <Public>
            <Head title="Courses" />
            <section className="py-8 md:py-12 mt-28 mb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h2 className="text-2xl md:text-4xl font-semibold text-join text-left">
                            Our All Courses
                        </h2>
                    </div>
                    {allCourses && allCourses.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-6 lg:gap-10 mt-8 md:mt-16">
                                {currentCourses.map((course: any) => (
                                    <CourseCard
                                        id={course.id}
                                        key={course.id}
                                        imageUrl={course.image}
                                        lessonsCount={course.lesson_count}
                                        courseTitle={course.title}
                                        rating={course.rating}
                                        instructorName={course.author}
                                        instructorRole={course.instructor_role}
                                        instructorImage={course.instructor_image}
                                        isEnrolled={course.is_enrolled}                                    />
                                ))}
                            </div>
                            {pageCount > 1 && (
                                <div className="mt-24 flex text-2xl justify-center items-center">
                                    <ReactPaginate
                                        previousLabel={currentPage === 0 ? null : '←'}
                                        nextLabel={currentPage === pageCount - 1 ? null : '→'}
                                        pageCount={pageCount}
                                        onPageChange={handlePageChange}
                                        containerClassName="pagination flex space-x-2 justify-center items-center"
                                        pageClassName="page-item"
                                        pageLinkClassName="px-3 py-1 border rounded-full hover:bg-gray-100 transition-colors"
                                        previousClassName="page-item"
                                        previousLinkClassName={`px-3 py-1 border rounded-full hover:bg-gray-100 transition-colors ${currentPage === 0 ? 'invisible' : ''}`}
                                        nextClassName="page-item"
                                        nextLinkClassName={`px-3 py-1 border rounded-full hover:bg-gray-100 transition-colors ${currentPage === pageCount - 1 ? 'invisible' : ''}`}
                                        activeClassName="bg-[#2BAFFC] py-1 text-white rounded-full pointer-events-none " // Added pointer-events-none
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="mt-12 flex justify-center items-center min-h-96">
                            <p className="text-lg font-medium text-gray-600">
                                Oops! We couldn't find any courses that match your search. Try using different keywords
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </Public>
    );
}
