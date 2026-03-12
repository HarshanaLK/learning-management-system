import React, { useCallback, useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/elements/inputs/InputError';
import { useDropzone } from 'react-dropzone';

interface LessonEditProps {
    lesson: any;
    onCancel: () => void;
    onSuccess: () => void;
    selectedModuleId: string | null;
    module_name: string | null;
}

const LessonEdit = ({ lesson, onCancel, onSuccess, selectedModuleId, module_name }: LessonEditProps) => {
    const { data, setData, processing, post, errors } = useForm({
        lesson_title: lesson.lesson_title || '',
        lesson_duration: lesson.lesson_duration || '',
        lesson_video: lesson.lesson_video || null,
        lesson_note: lesson.lesson_note || '',
        lesson_files: lesson.lesson_files || [] as File[],
        lesson_description: lesson.lesson_description || '',
        lesson_introduction: lesson.lesson_introduction || '',
        module_id: selectedModuleId || '',
        lesson_order: lesson.lesson_order || '',
    });


    const [videoPreview, setVideoPreview] = useState<string | null>(null);


    useEffect(() => {
        if (selectedModuleId) {
            setData('module_id', selectedModuleId);
        }
    }, [selectedModuleId, setData]);



    console.log(lesson.leson_video);



    // const handleVideoDrop = useCallback((acceptedFiles: File[]) => {
    //     if (acceptedFiles.length > 0) {
    //         setData('lesson_video', acceptedFiles[0]);
    //     }
    // }, [setData]);

    const handleVideoDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setData('lesson_video', file);
            setVideoPreview(URL.createObjectURL(file));
        }
    }, [setData]);


    const handleClearVideo = () => {
        setVideoPreview(null);
    };



    const { getRootProps: getVideoDropProps, getInputProps: getVideoInputProps } = useDropzone({
        onDrop: handleVideoDrop,
        multiple: false,
        accept: {
            'video/mp4': ['.mp4'],
            'video/x-msvideo': ['.avi'],
            'video/x-matroska': ['.mkv']
        },
        maxSize: 1 * 1024 * 1024 * 1024, // 1GB
        onDropRejected: (fileRejections) => {
            fileRejections.forEach((rejection) => {
                rejection.errors.forEach((error) => {
                    if (error.code === 'file-too-large') {
                        alert('File size must be less than 1GB.');
                    }
                });
            });
        }
    });

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        setData('lesson_files', acceptedFiles);
    }, [setData]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
        },
        maxSize: 5 * 1024 * 1024, // 2GB in bytes
        onDropRejected: (fileRejections) => {
            fileRejections.forEach((rejection) => {
                rejection.errors.forEach((error) => {
                    if (error.code === 'file-too-large') {
                        alert('File size must be less than 5MB.');
                    }
                });
            });
        }
    });



    const handleClearNotes = () => {
        setData('lesson_files', null);
        
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...data,
            lesson_video: data.lesson_video || lesson.lesson_video,
        };

        post(route('lesson.update', lesson.id), {
            data: payload,
            onSuccess: () => onSuccess(),
        });
    };

    return (
        <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10 overflow-y-auto max-h-[90vh]">
            <button
                className="absolute top-10 right-10 text-xl hover:text-gray-600"
                onClick={onCancel}
            >
                <GrClose />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Lesson</h2>
            <p className="pb-6 text-base font-normal">{module_name}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between space-x-4">
                    <div className="w-1/2">
                        <label className="font-normal text-base">Title<span className="text-red-500"> *</span></label>
                        <input
                            type="text"
                            placeholder="Add your lesson title"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                            value={data.lesson_title}
                            onChange={(e) => setData('lesson_title', e.target.value)}
                        />
                        {errors.lesson_title && <div className="text-red-500">{errors.lesson_title}</div>}
                    </div>

                    <div className="w-1/2">
                        <label className="font-normal text-base">Lesson Video Duration<span className="text-red-500"> *</span></label>
                        <input
                            type="text"
                            className="w-full px-4 mt-1 py-2 border border-gray-300 rounded-md"
                            placeholder="Set the lesson time duration by minutes"
                            value={data.lesson_duration}
                            onChange={(e) => setData('lesson_duration', e.target.value)}
                        />
                        {errors.lesson_duration && <div className="text-red-500">{errors.lesson_duration}</div>}
                    </div>
                </div>

                <div>
                    <label htmlFor="lesson_video" className="block font-normal text-base">
                        Lesson Video<span className="text-red-500"> *</span>
                    </label>
                    <div
                        {...getVideoDropProps()}
                        className="border w-full border-[#CCCCCC] rounded-[0.625rem] mt-1 cursor-pointer flex flex-col items-center p-2"
                    >
                        <input {...getVideoInputProps()} />
                        {videoPreview ? (
                            <div className="w-full relative">
                                <video controls className="w-full h-auto rounded-lg">
                                    <source src={videoPreview} />
                                </video>
                                <button
                                    type="button"
                                    onClick={handleClearVideo}
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Clear Video
                                </button>
                            </div>
                        ) : lesson.lesson_video ? (
                            <div className="w-full relative">
                                <iframe
                                    src={`https://player.vimeo.com/video/${lesson.lesson_video.split('/').pop()}`}
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title={lesson.video_original_name || 'Lesson Video'}
                                    className="w-full"
                                />
                                <button
                                    type="button"
                                    onClick={handleClearVideo}
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Clear Video
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-items-center">
                                <p className="text-xs font-medium">Upload Lesson Video</p>
                                <p className="text-xs font-light">Drag and drop a video file or <span className="text-[#1565C0]">browse files</span></p>
                            </div>
                        )}
                    </div>
                    <InputError message={errors.lesson_video} />
                </div>




                <div className="flex justify-between space-x-4">
                    <div className="w-1/2 ">
                        <label htmlFor="lesson_note" className="block font-normal text-base">
                            Lesson Note
                        </label>
                        <textarea
                            id="lesson_note"
                            name="lesson_note"
                            placeholder="Add your lesson notes"
                            value={data.lesson_note}
                            onChange={(e) => setData('lesson_note', e.target.value)}
                            className="mt-1 w-full h-[90px] rounded-[0.625rem] text-sm border-[#CCCCCC] focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <InputError message={errors.lesson_note} />
                    </div>


                    <div className='w-1/2'>
                        <div
                            {...getRootProps()}
                            className="border h-12 border-[#CCCCCC] rounded-[0.625rem] mt-12 cursor-pointer flex flex-col items-center justify-center"
                        >
                            <input {...getInputProps()} multiple />
                            {isDragActive ? (
                                <p className="text-xs font-medium">Upload</p>
                            ) : (
                                <>
                                    {/* show the file names */}
                                    {Array.isArray(data.lesson_files) && data.lesson_files?.length > 0 ? (
                                        // Show the new file names
                                        <p className="text-green-500 mt-2">
                                            {data.lesson_files.map((file: { name: any; }) => file.name).join(', ')}
                                        </p>
                                    ) : (
                                        <>
                                            {/* Show original lesson files */}
                                            {lesson.files_original_names && (
                                                <p className="text-green-500 mt-2">
                                                    {lesson.files_original_names.replace(/[\[\]"]/g, '')}
                                                </p>
                                            )}
                                            <div className="mt-auto text-center my-auto">
                                                <p className="text-xs font-medium">Upload Notes</p>
                                                <p className="text-xs font-light">
                                                    Drag and drop files or <span className='text-[#1565C0]'>browse files</span>
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        {data.lesson_files?.length > 0 && (
                            <button
                                type="button"
                                onClick={handleClearNotes}
                                className="mt-2 text-sm text-red-500 hover:text-red-700"
                            >
                                Clear Notes
                            </button>
                        )}
                        <InputError message={errors.lesson_files} />
                    </div>
                </div>



                <div>
                    <label htmlFor="lesson_description" className="block font-normal text-base">
                        Description<span className="text-red-500"> *</span>
                    </label>
                    <textarea
                        id="lesson_description"
                        name="lesson_description"
                        placeholder="Description of the lesson here..."
                        value={data.lesson_description}
                        onChange={(e) => setData('lesson_description', e.target.value)}
                        className="mt-1 w-full h-[5.625rem] rounded-[0.625rem] text-sm border-[#CCCCCC] focus:border-indigo-500 focus:ring-indigo-500 mb-3"
                    />
                    <InputError message={errors.lesson_description} />
                </div>

                <div className="flex items-center justify-end space-x-4 ">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="sm:px-8 px-4 py-[6px] border-2 text-base font-medium border-[#0470B0] text-[#0470B0] rounded-full hover:border-[#004AAD] hover:text-[#004AAD]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`sm:px-8 px-4 py-[6px] border-2 text-base font-medium bg-[#0470B0] border-[#0470B0] rounded-full hover:bg-[#004AAD] hover:border-[#004AAD] text-white ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {processing ? 'Saving...' : 'Save Lesson'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LessonEdit;
