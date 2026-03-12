import { LinkIcon } from "@heroicons/react/24/outline";
import CourseCard from "./CourseCard";

export default function PopularCourses({
    courses,
    lessonCount,
}: {
    courses: any;
    lessonCount: any;
}) {

    // Log the courses to see their structure

    // Limit the courses to only the first 6
    const limitedCourses = courses.slice(0, 6);

    return (
        <section className="py-8 md:py-12 md:mt-7">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-left text-center">
                        Our Most <span className="text-primary">Popular Courses</span>
                    </h2>
                    <a href="/courses" className="text-footer font-semibold hover:underline mt-4 md:mt-0 flex items-center">
                        <span className="underline">Explore Courses</span>
                        <LinkIcon className="h-5 w-5 inline-block ml-1" />
                    </a>
                </div>
                <p className="text-gray-500 text-left mt-4 text-sm md:text-base">
                    Let's join our best courses with our famous instructors
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-6 lg:gap-10 mt-8 md:mt-16">
                    {limitedCourses.map((course: any) => (
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
                            isEnrolled={course.is_enrolled}                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
