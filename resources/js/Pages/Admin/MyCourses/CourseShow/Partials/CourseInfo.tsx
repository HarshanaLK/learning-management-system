import { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { IoDocumentAttach, IoLockClosedOutline, IoLogoYoutube } from "react-icons/io5";

export default function CourseInfo({
    modules = [],
    course,
}: {
    modules: any;
    course: any;
}) {
    const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({});


    const toggleModule = (moduleId: string) => {
        setExpandedModules(prevState => ({
            ...prevState,
            [moduleId]: !prevState[moduleId],
        }));
    };


    const getVimeoId = (url: string) => {
        try {
            return url.split('/').pop() || '';
        } catch {
            return '';
        }
    };

    return (
        <main className="container mx-auto ">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full">
                    <div
                        className="relative rounded-lg mb-9"
                        style={{ paddingBottom: '56.25%', height: 0 }}
                    >
                        {course?.course_video ? (
                            <iframe
                                src={`https://player.vimeo.com/video/${getVimeoId(course.course_video)}`}
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title={course.video_original_name || 'Course Video'}
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        ) : (
                            <p className="text-center">No video available</p>
                        )}
                    </div>
                    <h2 className="text-[2rem] font-bold mb-2">{course.title}</h2>

                    <div className="flex items-center">
                        <img
                            src={`/storage/${course.instructor_image}`}
                            alt={course.author}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3"
                        />
                        <div className="flex flex-col">
                            <div className="font-semibold text-sm mb-1">{course.author}</div>
                            <div className="text-[#999999] font-semibold text-xs">{course.instructor_role}</div>
                        </div>
                    </div>

                    <h2 className="sm:text-2xl text-xl  font-semibold py-2">Course Description</h2>
                    <p className="text-sm font-normal mt-3">{course.description}</p>

                    <h3 className="sm:text-2xl text-xl  font-semibold mt-4 mb-5">Course Content</h3>
                    <div className="space-y-6">
                        {modules.map((module: any) => (
                            <div key={module.id} className="bg-[#EFF9FF]">
                                <div className="flex justify-between items-center">
                                    <p className="text-join text-xl font-semibold py-2 px-4">{module.module_title}</p>
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className=" text-2xl font-semibold pr-2 "
                                    >
                                        {expandedModules[module.id] ? <GoChevronDown /> : <GoChevronRight />}
                                    </button>
                                </div>


                                {expandedModules[module.id] && (
                                    <div className=" -mb-3   bg-white  w-full">
                                        {module.lessons.map((lesson: any) => (
                                            <div key={lesson.id} className="bg-white p-2 pl-4 border-b last:border-b-0">
                                                <div className="flex justify-between items-center mt-2 -mb-2  ">
                                                    <p className="text-lg font-normal flex items-center">
                                                        <IoLogoYoutube className="mr-4" />
                                                        {lesson.lesson_title}
                                                    </p>
                                                    <p className="text-lg font-normal flex item-center ">
                                                        {lesson.lesson_duration}
                                                        <IoLockClosedOutline className="text-xl  mt-1 ml-3  font-thin" />
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center mt-2 -mb-2 ">
                                                    <p className="text-lg font-normal flex items-center">
                                                        <IoDocumentAttach className="mr-4" />
                                                        {/* {lesson.files_original_names.replace(/[\[\]"]/g, '')} */}
                                                        Practice file
                                                    </p>
                                                    <p className="text-lg font-normal flex item-center ">
                                                        <IoLockClosedOutline className="text-xl  mt-1 ml-3  font-thin" />
                                                    </p>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                )}

                            </div>

                        ))}
                    </div>

                </div>
            </div>


        </main>
    );
}

