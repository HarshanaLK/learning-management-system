import CourseCard from "../../Home/Partials/CourseCard";

export default function PopularCourses({
    courses,

}: {
    courses: any;
}) {


    console.log(courses);
    const limitedCourses = courses.slice(0, 3);

    return (
        <section className="py-8 mt-7 bg-[#EFF9FF] pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row lg:ml-0 md:ml-6 justify-between items-center">
                    <h2 className="text-2xl md:text-4xl font-semibold text-join mt-2 text-left">
                        Our Latest Courses
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:gap-y-11 gap-y-14 lg:gap-23 lg:gap-y-14 mt-8 md:mt-16">
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
                            isEnrolled={course.isEnrolled}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
