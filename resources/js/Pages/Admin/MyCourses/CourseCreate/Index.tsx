import React, { useCallback, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useDropzone } from 'react-dropzone';
import DynamicList from './Partials/DynamicList';



const bRoutes = [
    { name: "Dashboard", hasArrow: false, link: "/dashboard" },
    { name: "My Courses", hasArrow: true, link: "/courses/all" },
    { name: "Create Course", hasArrow: true },
];

interface FormData {
    title: string,
    author: string,
    lessons: string,
    image: File | null;
    course_image: File | null;
    course_video: File | null;
    rating: string,
    instructor_role: string,
    instructor_image: File | null,
    price: string,
    description: string,
    what_you_learn: string,
    materials_included: string,
    requirements: string,
    course_tag: string[];
    audience: string,
    course_status: string,
    course_level: string,
    course_language: string;
    course_hours: string;
}


export default function CourseEdit({
    onCancel,
}:
    {
        onCancel: () => void;
    }) {

    const { data, setData, post, processing, errors, progress } = useForm<FormData>({
        title: '',
        author: '',
        lessons: '',
        image: null,
        rating: '',
        instructor_role: '',
        instructor_image: null,
        course_image: null,
        course_video: null,
        price: '',
        description: '',
        what_you_learn: '',
        materials_included: '',
        requirements: '',
        course_tag: [],
        audience: '',
        course_status: '',
        course_level: '',
        course_language: '',
        course_hours: '',
    });


    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [instructorImagePreview, setInstructorImagePreview] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorThubmailMessage, setErrorThubmailMessage] = useState('');
    const [errorInstructorMessage, setErrorInstructorMessage] = useState('');
    const [errorTagMessage, setErrorTagMessage] = useState('');



    // course introduction video upload
    const handleVideoDrop = useCallback((acceptedFiles: File[]) => {
        setErrorMessage('');
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setData('course_video', file);
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }

            setVideoPreview(URL.createObjectURL(file));
        }
    }, [setData, videoPreview]);

    const { getRootProps: getVideoDropProps, getInputProps: getVideoInputProps } = useDropzone({
        onDrop: handleVideoDrop,
        multiple: false,
        maxSize: 500 * 1024 * 1024, // 500MB in bytes
        accept: {
            'video/mp4': ['.mp4'],
            'video/x-msvideo': ['.avi'],
            'video/x-matroska': ['.mkv']
        },
        onDropRejected: (rejectedFiles) => {
            rejectedFiles.forEach(file => {
                if (file.errors.some((err) => err.code === 'file-too-large')) {
                    setErrorMessage('File size must be less than 500MB.');
                } else {
                    setErrorMessage('Invalid file type. Only MP4, AVI and MKV files are allowed.');
                }
            });
        }
    });


    // course thumbmail image upload
    const handleImageDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setData('image', file);
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(URL.createObjectURL(file));
        }
    }, [setData, imagePreview]);


    const { getRootProps: getImageDropProps, getInputProps: getImageInputProps } = useDropzone({
        onDrop: handleImageDrop,
        multiple: false,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        maxSize: 2 * 1024 * 1024, // 2 MB in bytes
        onDropRejected: (fileRejections) => {
            fileRejections.forEach((rejection) => {
                if (rejection.errors.some((err) => err.code === 'file-too-large')) {
                    setErrorThubmailMessage('Image size must be less than 2MB.');
                } else {
                    setErrorThubmailMessage('Invalid file type. Only JPEG and PNG files are allowed.');
                }
            });
        },
    });


    // course instructor image upload
    const handleInstructorImageDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setData('instructor_image', file);
            if (instructorImagePreview) {
                URL.revokeObjectURL(instructorImagePreview);
            }
            setInstructorImagePreview(URL.createObjectURL(file));
        }
    }, [setData, instructorImagePreview]);


    const { getRootProps: getInstructorImageDropProps, getInputProps: getInstructorImageInputProps } = useDropzone({
        onDrop: handleInstructorImageDrop,
        multiple: false,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        maxSize: 2 * 1024 * 1024, // 2 MB in bytes
        onDropRejected: (fileRejections) => {
            fileRejections.forEach((rejection) => {
                if (rejection.errors.some((err) => err.code === 'file-too-large')) {
                    setErrorInstructorMessage('Image size must be less than 2MB.');
                } else {
                    setErrorInstructorMessage('Invalid file type. Only JPEG and PNG files are allowed.');
                }
            });
        }
    });

    const handleClearImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        setData('image', null);
    };

    const handleClearInstructorImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (instructorImagePreview) {
            URL.revokeObjectURL(instructorImagePreview);
        }
        setInstructorImagePreview(null);
        setData('instructor_image', null);
    };


    const handleClearVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }
        setVideoPreview(null);
        setData('course_video', null);
    };


    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('courses.store'), {
            onSuccess: () => {
            },
        });
    };


    const handleWhatYouLearnChange = (updatedList: string[]) => {
        setData('what_you_learn', JSON.stringify(updatedList));
    };

    const handleMaterialsIncludedChange = (updatedList: string[]) => {
        setData('materials_included', JSON.stringify(updatedList));
    };
    const handleRequirementsChange = (updatedList: string[]) => {
        setData('requirements', JSON.stringify(updatedList));
    };


    //Tag section
    const [tagInput, setTagInput] = useState('');
    const TAG_LIMIT = 10;

    const handleAddTag = () => {
        if (data.course_tag.length >= TAG_LIMIT) {
            setErrorTagMessage(`You can only add up to ${TAG_LIMIT} tags.`);
            return;
        }
        if (tagInput.trim() && !data.course_tag.includes(tagInput)) {
            setData((prev) => ({
                ...prev,
                course_tag: [...prev.course_tag, tagInput.trim()],
            }));
            setTagInput('');
            setErrorTagMessage('');
        }
    };
    const handleRemoveTag = (tagToRemove: string) => {
        setData('course_tag', data.course_tag.filter((tag) => tag !== tagToRemove));
    };


    return (
        <AdminLayout bRoutes={bRoutes}>
            <Head title="Create Course" />
            <div className="bg-white  w-full max-w-7xl mx-auto sm:p-6">
                <h2 className="text-xl font-semibold mb-4">New Course</h2>
                <p className="text-sm mb-6">Add your new course details here.</p>

                <form onSubmit={handleSave}>
                    {/* Title and Instructor Role */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block  text-base font-normal">Title<span className="text-red-500"> *</span></label>
                            <input
                                type="text"
                                className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add your course title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                        </div>

                        <div className="flex-1">
                            <label className="block text-base font-normal">Course Status<span className="text-red-500"> *</span></label>
                            <select
                                className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.course_status}
                                onChange={(e) => setData('course_status', e.target.value)}
                            >
                                <option value="" disabled>Select Status</option>
                                <option value="active">Active</option>
                                <option value="close">Close</option>
                            </select>
                            {errors.course_status && <div className="text-red-500 text-sm">{errors.course_status}</div>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row sm:gap-4 ">
                        <div className='flex-1'>
                            <label htmlFor="image" className="block font-normal text-base text-black mb-1">
                                Course Thumbnail<span className="text-red-500"> *</span>
                            </label>
                            <div {...getImageDropProps()} className="rounded-[0.625rem] cursor-pointer flex flex-col border-dashed border-2 border-gray-300 p-2 h-52">
                                <input {...getImageInputProps()} accept="image/jpeg, image/png" />
                                {imagePreview ? (
                                    <div className="flex flex-col items-center ">
                                        <img src={imagePreview} alt="Preview" className="w-32 h-32  object-cover rounded-md mb-2" />
                                        <button
                                            type="button"
                                            onClick={handleClearImage}
                                            className="mt-2 px-4 py-1 bg-red-500 text-white rounded-md"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-items-center mt-16 mx-auto">
                                        <img
                                            src="/assets/images/icons/upload.webp"
                                            alt="Upload Image"
                                            className="w-10 h-10  bg-[#D9D9D9] px-[3px] py-1"
                                        />
                                        <div>
                                            <p className="text-xs font-normal px-4 leading-6">
                                                Upload your course Thumbnali here.Support format JPG or PNG, Maximum File Size: 2MB
                                            </p>
                                            <p className="text-xs font-light px-4 text-[#0470B0]">
                                                Upload image <span className="text-[#1565C0]"></span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                            {errorThubmailMessage && (
                                <p className="text-red-500 text-sm">{errorThubmailMessage}</p>
                            )}
                        </div>

                        <div className="flex-1 mt-4 sm:mt-0">
                            <label htmlFor="course_video" className="block font-normal text-base text-black mb-1">
                                Course Trailer<span className="text-red-500"> *</span>
                            </label>
                            <div {...getVideoDropProps()} className="rounded-[0.625rem] cursor-pointer flex flex-col border-dashed border-2 border-gray-300 p-2 h-52">
                                <input {...getVideoInputProps()} />
                                {videoPreview ? (
                                    <div className="flex flex-col items-center">
                                        <video controls className="w-64 h-36 rounded-lg">
                                            <source src={videoPreview} />
                                        </video>
                                        <button
                                            type="button"
                                            onClick={handleClearVideo}
                                            className="mt-2 px-4 py-1 bg-red-500 text-white rounded-md  bottom-2 right-2"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-items-center mt-16 mx-auto ">
                                        <img
                                            src="/assets/images/icons/upload.webp"
                                            alt="Upload Image"
                                            className="w-10 h-10  bg-[#D9D9D9] px-[3px] py-1"
                                        />
                                        <div>
                                            <p className="text-xs font-normal px-4 leading-6">
                                                Upload your course Trailer video here.Support format mp4,avi,mkv and max size 500MB
                                            </p>
                                            <p className="text-xs font-light px-4 text-[#0470B0]">
                                                Upload video <span className="text-[#1565C0]"></span>
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </div>
                            {errors.course_video && <div className="text-red-500 text-sm">{errors.course_video}</div>}
                            {errorMessage && (
                                <p className="text-red-500 text-sm">{errorMessage}</p>
                            )}
                        </div>
                    </div>


                    {/* Introduction */}
                    <div className="mb-4 ">
                        <label className="block text-base font-normal mt-4">Description<span className="text-red-500"> *</span></label>
                        <textarea
                            className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Description of course..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        ></textarea>
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>

                    {/* What wiil you learn */}
                    <DynamicList
                        label="What You’ll Learn"
                        placeholder="Add your course learning points..."
                        data={JSON.parse(data.what_you_learn || '[]')}
                        onChange={handleWhatYouLearnChange}
                    />


                    <DynamicList
                        label="Materials Included"
                        placeholder="Add your course materials..."
                        data={JSON.parse(data.materials_included || '[]')}
                        onChange={handleMaterialsIncludedChange}
                    />

                    <DynamicList
                        label="Requirements"
                        placeholder="Add your course requirements..."
                        data={JSON.parse(data.requirements || '[]')}
                        onChange={handleRequirementsChange}
                    />

                    <div className='flex sm:flex-row flex-col mb-4 '>
                        <div className='flex-1'>
                            <div className="flex-1 mb-4">
                                <label className="block text-base font-normal">Instructor Name<span className="text-red-500"> *</span></label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add your instructor name"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                />
                                {errors.author && <div className="text-red-500 text-sm">{errors.author}</div>}
                            </div>

                            <div className="flex-1 mb-4">
                                <label className="block text-base font-normal">Instructor Role<span className="text-red-500"> *</span></label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add your instructor role"
                                    value={data.instructor_role}
                                    onChange={(e) => setData('instructor_role', e.target.value)}
                                />
                                {errors.instructor_role && <div className="text-red-500 text-sm">{errors.instructor_role}</div>}
                            </div>
                        </div>


                        <div className='flex-1 sm:ml-8'>
                            <label htmlFor="instructor_image" className="block font-normal text-base text-black mb-1">
                                Course Instructor Image<span className="text-red-500"> *</span>
                            </label>
                            <div {...getInstructorImageDropProps()} className="rounded-[0.625rem] cursor-pointer flex flex-col border-dashed border-2 border-gray-300 p-2 h-44">
                                <input {...getInstructorImageInputProps()} accept="image/jpeg, image/png" />

                                {instructorImagePreview ? (
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={instructorImagePreview}
                                            alt="Instructor Preview"
                                            className="w-24 h-24 object-cover rounded-md mb-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleClearInstructorImage}
                                            className="mt-2 px-4 py-1 bg-red-500 text-white rounded-md"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-items-center mt-12 mx-auto">
                                        <img
                                            src="/assets/images/icons/upload.webp"
                                            alt="Upload Image"
                                            className="w-10 h-10  bg-[#D9D9D9] px-[3px] py-1"
                                        />
                                        <div>
                                            <p className="text-xs font-normal px-4 leading-6">
                                                Upload your course instructor image here.Support format JPG or PNG, Maximum File Size:2MB
                                            </p>
                                            <p className="text-xs font-light px-4 text-[#0470B0]">
                                                Upload image <span className="text-[#1565C0]"></span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.instructor_image && <div className="text-red-500 text-sm">{errors.instructor_image}</div>}
                            {errorInstructorMessage && (
                                <p className="text-red-500 text-sm">{errorInstructorMessage}</p>
                            )}
                        </div>
                    </div>


                    <div className="mb-4">
                        <label className="block text-base font-normal">Tags (max 10)<span className="text-red-500"> *</span></label>
                        <div className="flex flex-wrap gap-2">
                            {data.course_tag.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-sm px-2 py-1 rounded-full flex items-center gap-2"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="text"
                                className="p-2 border-[#CCCCCC] rounded-md w-full"
                                placeholder="Add a tag (character limit 20)"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                maxLength={20}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={handleAddTag}
                            >
                                Add
                            </button>
                        </div>
                        {errors.course_tag && <div className="text-red-500 text-sm">{errors.course_tag}</div>}
                        {errorTagMessage && <p className="text-red-500 text-sm">{errorTagMessage}</p>}
                    </div>

                    {progress && (
                        <progress
                            value={progress.percentage}
                            className="h-2 bg-emerald-500 absolute top-0 left-0"
                            max="100"
                        >
                            {progress.percentage}%
                        </progress>
                    )}


                    <div className='flex flex-col sm:flex-row gap-4 mb-4'>
                        <div className="flex-1  ">
                            <label className="block text-base font-normal">Price (USD)<span className="text-red-500"> *</span></label>
                            <input
                                type="text"
                                className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add your course price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                        </div>


                        <div className="flex-1 ">
                            <label className="block text-base font-normal">Course Level<span className="text-red-500"> *</span></label>
                            <select
                                className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.course_level}
                                onChange={(e) => setData('course_level', e.target.value)}
                            >
                                <option value="" disabled>Select Level</option>
                                <option value="All Level">All Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                            {errors.course_level && <div className="text-red-500 text-sm">{errors.course_level}</div>}
                        </div>

                    </div>

                    <div className='flex flex-col sm:flex-row gap-4 mb-10'>
                        <div className="flex-1  ">
                            <label className="block text-base font-normal">Total Hours<span className="text-red-500"> *</span></label>
                            <input
                                type="text"
                                className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add your course total hours"
                                value={data.course_hours}
                                onChange={(e) => setData('course_hours', e.target.value)}
                            />
                            {errors.course_hours && <div className="text-red-500 text-sm">{errors.course_hours}</div>}
                        </div>


                        <div className="flex-1 ">
                            Course Language<span className="text-red-500"> *</span>
                            <select
                                className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.course_language}
                                onChange={(e) => setData('course_language', e.target.value)}
                            >  <option value="" disabled>Select Language</option>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Mandarin">Mandarin</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Hindi">Hindi</option>
                            </select>
                            {errors.course_language && <div className="text-red-500 text-sm">{errors.course_language}</div>}
                        </div>
                    </div>
                    <p>* After successfully saving your new course, you will be redirected to the Course Modules addition page. </p>


                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mb-20 mt-4">
                        <button
                            type="submit"
                            className="sm:px-8 px-4 py-[6px] border-2 text-base font-medium bg-[#0470B0] border-[#0470B0] rounded-full hover:bg-[#004AAD] hover:border-[#004AAD] text-white"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Course'}
                        </button>
                    </div>
                </form>
            </div >
        </AdminLayout >
    );
}
