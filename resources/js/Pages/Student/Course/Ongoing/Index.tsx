import Public from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";
import OngoingCourseCard from "./Partials/OngoingCourseCard";

interface OngoingCourse {
    course: {
        id: number;
        title: string;
        author: string;
        course_status: string;
        lessons: number;
        image: string;
        rating: number;
        instructor_role: string;
        instructor_image: string;
    };
    progressPercentage: number;
    lessonCount:number;
}


interface Props {
    ongoingCourses: Record<string, OngoingCourse>;
}

export default function OngoingCourse({ ongoingCourses }: Props) {
    // Convert `ongoingCourses` object into an array for mapping
    const coursesArray = Object.entries(ongoingCourses).map(([key, value]) => {
        const { course, progressPercentage,lessonCount } = value;
        return {
            id: course.id,
            title: course.title,
            author: course.author,
            course_status: course.course_status,
            lessons: course.lessons,
            image: course.image,
            rating: course.rating,
            instructor_role: course.instructor_role,
            instructor_image: course.instructor_image,
            progressPercentage,
            lessonCount,
        };
    });

console.log(ongoingCourses);
    return (
        <Public>
            <Head title="Ongoing Courses" />
            <section className="py-8 md:py-12 mt-28 mb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h2 className="text-2xl md:text-4xl font-semibold text-join text-left">
                            My Ongoing Courses
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-6 lg:gap-10 mt-8 md:mt-16">
                        {coursesArray.length > 0 ? (
                            coursesArray.map((ongoingCourse) => (
                                <OngoingCourseCard
                                    key={ongoingCourse.id}
                                    id={ongoingCourse.id}
                                    imageUrl={ongoingCourse.image}
                                    lessonsCount={ongoingCourse.lessonCount}
                                    courseTitle={ongoingCourse.title}
                                    rating={ongoingCourse.rating}
                                    instructorName={ongoingCourse.author}
                                    instructorRole={ongoingCourse.instructor_role}
                                    instructorImage={ongoingCourse.instructor_image}
                                    progressPercentage={ongoingCourse.progressPercentage}
                                />
                            ))
                        ) : (
                            <p className="col-span-full text-center mb-96 text-lg font-semibold text-gray-600">
                                No ongoing courses available.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </Public>
    );
}
