import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';
import InputError from '@/Components/elements/inputs/InputError';
import { IoDocumentText, IoTrash } from 'react-icons/io5';

type Module = {
    id: number;
    module_title: string;
    order: number;
    lessons: any[];
    lesson_order: number;
};

type AddLessonProps = {
    modules: Module[];
    selectedModuleId: string | null;
    module_name: string | null;
    onClose: () => void;
};



const AddLesson: React.FC<AddLessonProps> = ({ selectedModuleId, onClose, module_name }) => {
    const { data, setData, post, processing, errors } = useForm({
        lesson_title: '',
        lesson_duration: '',
        lesson_video: null as File | null,
        lesson_note: '',
        lesson_files: [] as File[],
        lesson_description: '',
        lesson_introduction: '',
        module_id: selectedModuleId || '',
        lesson_order: '',
    });

    useEffect(() => {
        if (selectedModuleId) {
            setData('module_id', selectedModuleId);
        }
    }, [selectedModuleId]);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('lesson_title', data.lesson_title);
        formData.append('lesson_duration', data.lesson_duration);
        formData.append('lesson_note', data.lesson_note);
        formData.append('lesson_description', data.lesson_description);
        formData.append('lesson_introduction', data.lesson_introduction);
        formData.append('module_id', data.module_id);
        formData.append('lesson_order', data.lesson_order);
        formData.append('lesson_video', data.lesson_video as File);


        data.lesson_files.forEach((file, index) => {
            formData.append(`lesson_files[${index}]`, file);
        });


        post(route('course.lessons.store', { moduleId: data.module_id }), {
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            onSuccess: () => {
                onClose();
            },
        });
    };

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
                    } else if (error.code === 'file-invalid-type') {
                        alert('Unsupported file type. Please upload a valid file.');
                    }
                });
            });
        }
    });

    const [videoPreviewURL, setVideoPreviewURL] = useState<string | null>(null);
    useEffect(() => {
        if (data.lesson_video) {
            const objectURL = URL.createObjectURL(data.lesson_video);
            setVideoPreviewURL(objectURL);

            return () => {
                // Clean up the object URL when the video changes or component unmounts
                URL.revokeObjectURL(objectURL);
            };
        } else {
            setVideoPreviewURL(null);
        }
    }, [data.lesson_video]);


    const [videoPreview, setVideoPreview] = useState<File | null>(data.lesson_video);

    // Update the preview only when the video is dropped
    const handleVideoDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setData('lesson_video', acceptedFiles[0]); // Keep this for form submission
            setVideoPreview(acceptedFiles[0]); // Update the preview separately
        }
    }, [setData]);

    const handleClearVideo = () => {
        setData('lesson_video', null); // Reset form state
        setVideoPreview(null); // Reset preview
    };

    const { getRootProps: getVideoDropProps, getInputProps: getVideoInputProps } = useDropzone({
        onDrop: handleVideoDrop,
        multiple: false,
        accept: {
            'video/mp4': ['.mp4'],
            'video/x-msvideo': ['.avi'],
            'video/x-matroska': ['.mkv']
        },
        maxSize: 1 * 1024 * 1024 * 1024, // 2GB in bytes
        onDropRejected: (fileRejections) => {
            fileRejections.forEach((rejection) => {
                rejection.errors.forEach((error) => {
                    if (error.code === 'file-too-large') {
                        alert('File size must be less than 1GB.');
                    } else if (error.code === 'file-invalid-type') {
                        alert('Unsupported file type. Please upload a valid file.');
                    }
                });
            });
        }
    });




    return (
        <div className="pr-2 overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-semibold mb-4">
                New Lesson
            </h2>
            <p className="pb-6 text-base font-normal">{module_name}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">
                    <div className="sm:w-1/2 ">
                        <label htmlFor="lesson_title" className="font-normal text-base">
                            Title<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            id="lesson_title"
                            name="lesson_title"
                            placeholder="Add your lesson title"
                            value={data.lesson_title}
                            onChange={(e) => setData('lesson_title', e.target.value)}
                            className="mt-1 w-full rounded-[0.625rem] text-sm border-[#CCCCCC] focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <InputError message={errors.lesson_title} />
                    </div>

                    <div className="sm:w-1/2 sm:mt-0 mt-4">
                        <label htmlFor="lesson_duration" className="font-normal text-base ">
                            Lesson Video Time<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            id="lesson_duration"
                            name="lesson_duration"
                            placeholder="Minutes"
                            value={data.lesson_duration}
                            onChange={(e) => setData('lesson_duration', e.target.value)}
                            className="mt-1 w-full rounded-[0.625rem] text-sm border-[#CCCCCC] focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <InputError message={errors.lesson_duration} />
                    </div>
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="sm:w-1/2">
                        <label htmlFor="lesson_video" className="block font-normal text-base">
                            Lesson Video<span className="text-red-500"> *</span>
                        </label>
                        <div
                            {...getVideoDropProps()}
                            className={`border-2 w-full h-48 border-[#CCCCCC] border-dashed rounded-[0.625rem] mt-1 cursor-pointer flex items-center justify-center ${data.lesson_video ? "flex-col" : "flex-col"}`}
                        >
                            <input {...getVideoInputProps()} />
                            {videoPreviewURL ? (
                                <>
                                    <video
                                        className="w-full h-40"
                                        controls
                                        src={videoPreviewURL}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClearVideo();
                                        }}
                                        className="mt-2 text-sm text-red-500 hover:text-red-700 flex items-center"
                                    >
                                        <IoTrash className="mr-1" /> Clear Video
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="text-xs font-medium">Upload Lesson Video</p>
                                    <p className="text-xs font-light">
                                        Drag and drop a video file or <span className="text-[#1565C0]">browse files</span>
                                    </p>
                                    <p className="text-xs font-light px-2 text-center">
                                        Support format mp4,avi,mkv and max size 1GB</p>
                                </>
                            )}
                        </div>
                        <InputError message={errors.lesson_video} />
                    </div>

                    {/* Lesson Notes Upload */}
                    <div className="sm:w-1/2">
                        <label htmlFor="lesson_files" className="block font-medium text-base text-gray-700">
                            Lesson Documents
                        </label>
                        <div
                            {...getRootProps()}
                            className="border-2 border-dashed border-gray-300 w-full h-48 rounded-lg mt-2 cursor-pointer flex flex-col items-center justify-center "
                        >
                            <input {...getInputProps()} multiple />
                            {isDragActive ? (
                                <p className="text-sm font-medium text-blue-600">Drop your files here...</p>
                            ) : (
                                <>
                                    {data.lesson_files.length > 0 ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="flex flex-wrap gap-4 justify-center">
                                                {data.lesson_files.map((file, index) => (
                                                    <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md shadow-sm">
                                                        <IoDocumentText className="text-blue-500 text-lg text-center" />
                                                        <p className="text-sm text-gray-700 text-center ">{file.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setData('lesson_files', []);
                                                }}
                                                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                                            >
                                                <IoTrash className="text-base" /> Clear Documents
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-xs font-medium text-gray-600">Drag and drop files or</p>
                                            <p className=" text-[#1565C0] text-xs font-light cursor-pointer ">browse files</p>
                                            <p className="text-xs font-light mt-1">
                                                Supported formats: PDF, DOC, DOCX, TXT. Max size: 5MB
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {errors.lesson_files && (
                            <p className="text-sm text-red-500 mt-2">{errors.lesson_files}</p>
                        )}
                    </div>

                </div>


                <div className="flex justify-between space-x-4">
                    <div className="w-full ">
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
                        className="mt-1 w-full h-[5.625rem] rounded-[0.625rem] text-sm border-[#CCCCCC] focus:border-indigo-500 focus:ring-indigo-500 "
                    />
                    <InputError message={errors.lesson_description} />
                </div>


                <div className="flex items-center justify-end space-x-4 ">
                    <button
                        type="button"
                        onClick={onClose}
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

export default AddLesson;
