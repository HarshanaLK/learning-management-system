import Public from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";
import CompleteCourseCard from "./Prtials/CompleteCourseCard";

export default function CompletedCourse({
    completedCourses,
}: {
    completedCourses: any;
}) {

    const coursesArray = Object.values(completedCourses);

    console.log(completedCourses);

    return (
        <Public>
            <Head title="Complete Courses" />
            <section className="py-8 md:py-12 mt-28 mb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h2 className="text-2xl md:text-4xl font-semibold text-join text-left">
                            My Completed Courses
                        </h2>
                    </div>
                    {/* Check if there are completed courses */}
                    {coursesArray.length === 0 ? (
                        <div className="text-center text-lg mb-96 text-gray-500 mt-8 md:mt-16">
                            <p>No completed courses</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-6 lg:gap-10 mt-8 md:mt-16">
                            {coursesArray.map((completedCourse: any) => (
                                <CompleteCourseCard
                                    id={completedCourse.id}
                                    key={completedCourse.id}
                                    imageUrl={completedCourse.image}
                                    lessonsCount={completedCourse.lesson_count}
                                    courseTitle={completedCourse.title}
                                    rating={completedCourse.rating}
                                    instructorName={completedCourse.author}
                                    instructorRole={completedCourse.instructor_role}
                                    instructorImage={completedCourse.instructor_image}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Public>
    );
}
