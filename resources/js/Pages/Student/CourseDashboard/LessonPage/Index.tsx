import React, { useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Player from '@vimeo/player';
import axios from 'axios';
import './player.css';
import SidebarLayout from '@/Layouts/CourseProgressLayout';

interface LessonPageProps {
    course: {
        id: number;
        title: string;
        modules: Array<{
            id: number;
            module_title: string;
            lessons: Array<{
                id: number;
                lesson_title: string;
                lesson_video: string;
                completion: number;
                lesson_description: string;
                lesson_files: string;

                progress: Array<{
                    id: number;
                    progress: number;
                    completed: boolean;
                    status: string;
                    created_at: string;
                }>;
            }>;
        }>;
    };
    module: {
        id: number;
        module_title: string;
    };
    lesson: {
        progress: any;
        id: number;
        lesson_title: string;
        lesson_video: string;
        lesson_files: string | string[];
        files_original_names: string;
        lesson_description: string;
    };
    progress: {
        id: number;
        progress: number;
        completed: boolean;
        status: string;
    } | null;
    certificateIssued: any;
}



const LessonPage: React.FC<LessonPageProps> = ({ course, module, lesson, progress, certificateIssued }) => {
    const vimeoRef = useRef<HTMLDivElement>(null);
    const [videoProgress, setVideoProgress] = useState(0);
    const [maxProgress, setMaxProgress] = useState(0);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [activeModule, setActiveModule] = useState<number | null>(module.id);
    const [activeLesson, setActiveLesson] = useState(lesson);
    const [isExpanded, setIsExpanded] = useState(false);



    useEffect(() => {
        // Initialize progress from backend
        const initialProgress = lesson?.progress?.length > 0 ? lesson.progress[0].progress : 0;
        setVideoProgress(initialProgress);
        setMaxProgress(initialProgress);
    }, [lesson]);

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const toggleModule = (moduleId: number) => {
        setActiveModule(activeModule === moduleId ? null : moduleId);
    };

    const handleLessonClick = (lesson: typeof activeLesson) => {
        setActiveLesson(lesson);
    };

    const saveProgress = async () => {
        if (maxProgress > 0) {
            try {
                await axios.post(`/lessons/${activeLesson.id}/progress`, { progress: maxProgress });
                console.log('Progress saved successfully!');
            } catch (error) {
                console.error('Error saving progress:', error);
            }
        }
    };

    useEffect(() => {
        if (vimeoRef.current && activeLesson?.lesson_video) {
            const videoId = activeLesson.lesson_video.split('/').pop();
            if (videoId) {
                const player = new Player(vimeoRef.current, {
                    id: parseInt(videoId),
                    width: vimeoRef.current.clientWidth,
                });

                // Get the initial progress from the lesson
                const initialProgress = lesson?.progress?.length > 0 ? lesson.progress[0].progress : 0;

                player.on('timeupdate', (data) => {
                    const currentProgress = Math.round(data.percent * 100);

                    // Ensure progress does not decrease (only increase or stay the same)
                    const adjustedProgress = Math.max(currentProgress, maxProgress, initialProgress);

                    setVideoProgress(adjustedProgress);
                    setMaxProgress((prevMax) => Math.max(prevMax, adjustedProgress));
                });

                return () => {
                    player.destroy();
                };
            }
        }
    }, [activeLesson?.lesson_video]);



    useEffect(() => {
        const intervalId = setInterval(() => {
            saveProgress();
        }, 5000); // Save progress every 5 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, [maxProgress]);




    useEffect(() => {
        const handlePageUnload = () => {
            saveProgress();
        };

        window.addEventListener('beforeunload', handlePageUnload);
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                saveProgress();
            }
        });

        return () => {
            window.removeEventListener('beforeunload', handlePageUnload);
            window.removeEventListener('visibilitychange', handlePageUnload);
        };
    }, [maxProgress]);


    const handleDownloadFiles = (lessonFiles: string | string[], originalFileNames: string) => {
        const files = Array.isArray(lessonFiles) ? lessonFiles : JSON.parse(lessonFiles || '[]');
        const fileNames = Array.isArray(originalFileNames)
            ? originalFileNames
            : JSON.parse(originalFileNames || '[]');

        files.forEach((fileUrl: any, index: any) => {
            const fullUrl = `/storage/${fileUrl}`;

            const a = document.createElement('a');
            a.href = fullUrl;
            a.download = fileNames[index] || fileUrl.split('/').pop();
            a.target = '_blank';
            a.click(); // Trigger the download
        });
    };



    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };


    const renderDescription = () => {
        const maxLength = 200;
        if (activeLesson.lesson_description.length <= maxLength || isExpanded) {
            return activeLesson.lesson_description;
        }
        return `${activeLesson.lesson_description.slice(0, maxLength)}...`;
    };




    // useEffect(() => {
    //     const fetchProgress = async () => {
    //         try {
    //             const response = await axios.get(`/my-courses/{id}/modulesa/{module_id}/lessons/{lesson_id}`);
    //             const progressData = response.data.course;

    //             console.log(progressData);
    //             // Set the video progress dynamically
    //             setVideoProgress(progressData ? progressData.progress : 0);
    //             setMaxProgress(progressData ? progressData.progress : 0);
    //         } catch (error) {
    //             console.error('Error fetching lesson progress:', error);
    //         }
    //     };

    //     if (lesson?.id) {
    //         fetchProgress();
    //     }
    // }, [lesson.id]);




    return (
        <SidebarLayout
            course={course}
            sidebarVisible={sidebarVisible}
            toggleSidebar={toggleSidebar}
            activeModule={activeModule}
            toggleModule={toggleModule}
            isExpanded={false}
            handleToggle={() => { }}
            certificateIssued={certificateIssued}
            videoProgress={videoProgress}
        >
            <Head title="Lesson" />
            <div className="flex-1 ">
                {activeLesson ? (
                    <>
                        <nav className="text-xl text-[#0470B0] font-medium mb-4">
                            <span className="">Dashboard</span>
                            {' > '}
                            <span className="">{module.module_title}</span>
                            {' > '}
                            <span className="">{activeLesson.lesson_title}</span>
                        </nav>

                        <h1 className="text-2xl font-bold">{activeLesson.lesson_title}</h1>

                        {/* <div className="mt-6">
                            <div ref={vimeoRef}></div>
                        </div> */}
                        {/*
                        <div
                            className="relative rounded-lg mb-9"
                            style={{ paddingBottom: '56.25%', height: 0 }}
                        >
                            <div ref={vimeoRef}></div>
                        </div> */}


                        <div className="responsive-video-wrapper mt-10">
                            <div ref={vimeoRef}></div>
                        </div>

                        <div className="flex sm:flex-row flex-col justify-between items-center mb-4 mt-8 ">
                            <div className='sm:order-1 order-2 sm:mt-0 mt-4'>
                                {/* Check if lesson_files is a string, and parse it if necessary */}
                                {Array.isArray(activeLesson.lesson_files) || (typeof activeLesson.lesson_files === 'string' && activeLesson.lesson_files ? JSON.parse(activeLesson.lesson_files) : []).length > 0 ? (
                                    <button
                                        onClick={() =>
                                            handleDownloadFiles(
                                                Array.isArray(activeLesson.lesson_files)
                                                    ? activeLesson.lesson_files
                                                    : JSON.parse(activeLesson.lesson_files),
                                                activeLesson.files_original_names
                                            )
                                        }
                                        className="bg-[#2BAFFC] sm:text-xl text-lg sm:font-medium font-normal rounded-full sm:py-1 py-[2px] sm:px-6 px-3 text-black"
                                    >
                                        Download Lesson
                                    </button>
                                ) : null}
                            </div>

                            <div className='flex items-center sm:order-2 order-1'>
                                <span className="text-xl font-semibold mr-2">Completion</span>
                                <div className="sm:w-44 w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-[#2BAFFC] h-full"
                                        style={{ width: `${videoProgress}%` }}
                                    ></div>
                                </div>
                                <span className="text-xl font-semibold  ml-2">{videoProgress}%</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-2 mt-12">About this Lesson</h2>

                        {/* <p className="text-xl font-normal">{activeLesson.lesson_description}</p> */}

                        <p className="text-xl font-normal">
                            {renderDescription()}
                            {activeLesson.lesson_description.length > 400 && (
                                <button
                                    onClick={handleToggle}
                                    className="text-[#0470B0] hover:underline ml-2"
                                >
                                    {isExpanded ? 'See Less' : 'See More'}
                                </button>
                            )}
                        </p>
                    </>
                ) : (
                    <p>No lesson selected. Please choose a lesson from the sidebar.</p>
                )}
            </div>
        </SidebarLayout>
    );
};

export default LessonPage;

