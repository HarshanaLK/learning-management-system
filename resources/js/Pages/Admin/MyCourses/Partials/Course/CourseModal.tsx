import React, { useCallback, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';
import { IoPencil } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';



interface FormData {
    title: string;
    author: string;
    lessons: string;
    image: File | null;
    rating: string;
    instructor_role: string;
    instructor_image: File | null;
    price: string;
    description: string;
    what_you_learn: string[];
    materials_included: string[];
    requirements: string[];
    course_tag: string[];
    audience: string;
    course_status: string;
    course_video: File | null;
    course_level: string;
    course_hours: string;
    course_language: string;

}

export default function CourseEdit({
    course,
    onCancel,
    courseTag,

}: {
    course: any;
    onCancel: () => void;
    courseTag: any;

}) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: course.title || '',
        author: course.author || '',
        lessons: course.lessons || '',
        image: course.image || null,
        rating: course.rating || '',
        instructor_role: course.instructor_role || '',
        instructor_image: course.instructor_image||null,
        price: course.price || '',
        description: course.description || '',
        what_you_learn: course.what_you_learn || '',
        materials_included: course.materials_included || '',
        requirements: course.requirements || '',
        course_tag: courseTag.map((tag: any) => tag.course_tag),
        audience: course.audience || '',
        course_status: course.course_status || '',
        course_video: course.course_video || null,
        course_level: course.course_level || '',
        course_hours: course.course_hours || '',
        course_language: course.course_language || '',
    });

    // console.log(courseTag);

    const [previewImage, setPreviewImage] = useState(course.image ? `/storage/${course.image}` : null);
    const [previewInstructorImage, setPreviewInstructorImage] = useState(course.instructor_image ? `/storage/${course.instructor_image}` : null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);



    const handleClearImage = (type: 'image' | 'instructor_image') => {
        const routeName = type === 'image' ? 'courses.clearImage' : 'courses.clearInstructorImage'; // Adjust the backend route
        router.post(route(routeName, { id: course.id }), {}, {
            onSuccess: () => {
                if (type === 'image') {
                    setData('image', null);
                    setPreviewImage(null);
                } else if (type === 'instructor_image') {
                    setData('instructor_image', null);
                    setPreviewInstructorImage(null);
                }
            }
        });
    };

    const handleClearVideo = () => {
        router.post(route('courses.clearVideo', { id: course.id }), {}, {
            onSuccess: () => {
                setData('course_video', null);
                setVideoPreview(null);
            }
        });
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value instanceof File ? value : `${value}`);
            }
        });

        if (!data.image && course.image) {
            formData.append('image', course.image);  // Send the current image if no new image is provided
        }

        if (!data.instructor_image && course.instructor_image) {
            formData.append('current_instructor_image', course.instructor_image);
        }

        if (!data.course_video && course.course_video) {
            formData.append('current_course_video', course.course_video);
        }


        post(route('courses.update', course.id), {
            data: formData,
            forceFormData: true,

            onSuccess: () => {

                onCancel();
            },
        });
    };


    const handleVideoDrop = useCallback((acceptedFiles: File[]) => {
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
        accept: {
            'video/mp4': ['.mp4'],
            'video/x-msvideo': ['.avi'],
            'video/x-matroska': ['.mkv']
        }
    });


    const handleImageDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setData('image', file);
            setPreviewImage(URL.createObjectURL(file)); // Update preview image
        }
    }, [setData]);

    const { getRootProps: getImageDropProps, getInputProps: getImageInputProps } = useDropzone({
        onDrop: handleImageDrop,
        multiple: false,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        }
    });


    const handleInstructorImageDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setData('instructor_image', file);
            setPreviewInstructorImage(URL.createObjectURL(file)); // Update preview image
        }
    }, [setData]);


    const { getRootProps: getInstructorImageDropProps, getInputProps: getInstructorImageInputProps } = useDropzone({
        onDrop: handleInstructorImageDrop,
        multiple: false,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        }
    });


    const [newItem, setNewItem] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [currentField, setCurrentField] = useState<'what_you_learn' | 'materials_included' | 'requirements'>('what_you_learn');

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            const updatedData = { ...data };
            if (editingIndex === null) {

                updatedData[currentField] = [...updatedData[currentField], newItem.trim()];
            } else {

                const updatedItems = [...updatedData[currentField]];
                updatedItems[editingIndex] = newItem.trim();
                updatedData[currentField] = updatedItems;
                setEditingIndex(null);
            }
            setData(updatedData);
            setNewItem('');
        }
    };

    const handleEditItem = (index: number) => {
        setEditingIndex(index);
        setNewItem(data[currentField][index]);
    };

    const handleDeleteItem = (index: number) => {
        const updatedItems = data[currentField].filter((_, idx) => idx !== index);
        const updatedData = { ...data, [currentField]: updatedItems };
        setData(updatedData);
    };




    const [tagInput, setTagInput] = useState('');
      const [errorTagMessage, setErrorTagMessage] = useState('');

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = data.course_tag.filter((tag: string) => tag !== tagToRemove);
        setData('course_tag', updatedTags);
    };

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

    return (
        <div className=" mr-2">
            <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
            <p className="text-sm mb-6">Update your course details</p>


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
                        <div {...getImageDropProps()} className="w-full rounded-[0.625rem] cursor-pointer flex flex-col ">
                            <input {...getImageInputProps()} accept="image/jpeg, image/png" />
                            <div className="flex items-center justify-center border-dashed border-2 border-gray-300 p-2 rounded-lg">
                                {previewImage ? (
                                    <div className='w-full relative'>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent the click from propagating to the dropzone
                                                handleClearImage('image');
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                        <img src={previewImage} alt="Preview" className="w-full h-[138px]  object-cover rounded-[0.625rem]" />
                                    </div>
                                ) : (
                                    <>
                                        <img src="/assets/images/icons/upload.webp" alt="Mission Image" className="w-10 h-10  bg-[#D9D9D9] px-[3px] py-1" />
                                        <div>
                                            <p className="text-xs font-normal px-4 leading-6">
                                                Upload your course thumbnail here. Supported formats: JPG or PNG.
                                            </p>
                                            <p className="text-xs font-light px-4 text-[#0470B0]">
                                                Upload image<span className='text-[#1565C0]'> </span>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                            {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                        </div>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="course_video" className="block font-normal text-base text-black mb-1">
                            Course Trailer<span className="text-red-500"> *</span>
                        </label>
                        <div {...getVideoDropProps()} className="rounded-[0.625rem] cursor-pointer flex flex-col border-dashed border-2 border-gray-300 p-2">
                            <input {...getVideoInputProps()} />
                            {videoPreview ? (
                                <div className='w-full relative '>
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleClearVideo();
                                        }}
                                        className="absolute z-20 top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                    <video controls className=" w-full h-auto max-h-36 rounded-lg">
                                        <source src={videoPreview} />
                                    </video>
                                </div>
                            ) : course.course_video ? (
                                <div className='w-full relative'>
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleClearVideo();
                                        }}
                                        className="absolute top-2 right-2 mt-4 mr-6 z-20 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                    <iframe
                                        src={`https://player.vimeo.com/video/${course.course_video.split('/').pop()}`}
                                        // width="640"
                                        // height="152"
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title={course.video_original_name || 'Course Video'}
                                        className="w-full "
                                    />
                                </div>

                            ) : (
                                <div className="flex justify-items-center">
                                    <img
                                        src="/assets/images/icons/upload.webp"
                                        alt="Upload Image"
                                        className="w-10 h-10 sm:mt-6 bg-[#D9D9D9] px-[3px] py-1"
                                    />
                                    <div>
                                        <p className="text-xs font-normal px-4 leading-6">
                                            Students who watch a promo video are 5X more likely to enroll in your course.
                                        </p>
                                        <p className="text-xs font-light px-4 text-[#0470B0]">
                                            Upload video
                                        </p>
                                    </div>
                                </div>
                            )}
                            {errors.course_video && <div className="text-red-500 text-sm">{errors.course_video}</div>}
                        </div>
                    </div>
                </div>


                {/* Introduction */}
                <div className="mb-4 ">
                    <label className="block text-base font-normal mt-4">Description<span className="text-red-500"> *</span></label>
                    <textarea
                        className="mt-1 p-2 border-[#CCCCCC]  rounded-md w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descriptiion of course..."
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    ></textarea>
                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>


                <div className="mb-8">
                    <h3 className="block font-normal text-base text-black mb-2">Update Course Details</h3>

                    {/* Dropdown to Select Current Field */}
                    <label className="block text-sm font-normal mb-1">Select Field to Edit:</label>
                    <select
                        value={currentField}
                        onChange={(e) => setCurrentField(e.target.value as 'what_you_learn' | 'materials_included' | 'requirements')}
                        className="p-2 border-[#CCCCCC] text-base  rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    >
                        <option value="what_you_learn">What You Learn</option>
                        <option value="materials_included">Materials Included</option>
                        <option value="requirements">Requirements</option>
                    </select>

                    {/* Display Existing Items */}
                    <ul className="list-disc pl-5 mb-4">
                        {Array.isArray(data[currentField]) && data[currentField].map((item, index) => (
                            <li key={index} className="flex items-center justify-between mb-2">
                                <span>{item}</span>
                                <div>
                                    <button
                                        type="button"
                                        className="text-blue-500 hover:underline mr-2"
                                        onClick={() => handleEditItem(index)}
                                    >
                                        <IoPencil className='hover:text-primary text-base' />
                                    </button>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDeleteItem(index)}
                                    >
                                        <BsTrash3 className='hover:text-primary text-base' />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Add/Edit Input */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Add or edit an item"
                            className="p-1 border-[#CCCCCC]  rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleAddItem}
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                            {editingIndex === null ? 'Add' : 'Update'}
                        </button>
                    </div>
                    {errors[currentField] && (
                        <div className="text-red-500 text-sm mt-1">{errors[currentField]}</div>
                    )}
                </div>


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

                        <div className="flex-1 ">
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
                        <label htmlFor="instructor_image" className="block font-normal text-base text-black">
                            Course Instructor Image<span className="text-red-500"> *</span>
                        </label>
                        <div {...getInstructorImageDropProps()} className="w-full h-32 rounded-[0.625rem] cursor-pointer flex flex-col ">
                            <input {...getInstructorImageInputProps()} accept="image/jpeg, image/png" />
                            <div className="flex items-center justify-center border-dashed border-2 border-gray-300 p-2 rounded-lg">
                                {previewInstructorImage ? (
                                    <div className='w-full relative'>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent the click from propagating to the dropzone
                                                handleClearImage('instructor_image');
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                        <img src={previewInstructorImage} alt="Preview" className="w-full h-[138px]    object-cover rounded-[0.625rem]" />
                                    </div>
                                ) : (
                                    <>
                                        <img src="/assets/images/icons/upload.webp" alt="Mission Image" className="w-10 h-10 bg-[#D9D9D9] px-[3px] py-1" />
                                        <div>
                                            <p className="text-xs font-normal px-4 leading-6">
                                                Upload course instructor image here. Supported formats: JPG or PNG.
                                            </p>
                                            <p className="text-xs font-light px-4 text-[#0470B0]">
                                                Upload image
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                            {errors.instructor_image && <div className="text-red-500 text-sm">{errors.instructor_image}</div>}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                <label className="block text-base font-normal">Tags (max 10)<span className="text-red-500"> *</span></label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex flex-wrap gap-2">
                            {data.course_tag.map((tag: string, index: number) => (
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
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="text"
                            className="p-1 border-[#CCCCCC] rounded-md w-full"
                            placeholder="Add a tag (character limit 20)"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                            onClick={handleAddTag}
                        >
                            Add
                        </button>
                    </div>
                    {errors.course_tag && <div className="text-red-500 text-sm">{errors.course_tag}</div>}
                    {errorTagMessage && <p className="text-red-500 text-sm">{errorTagMessage}</p>}
                </div>


                <div className='flex flex-col sm:flex-row gap-4 mb-4'>
                    <div className="flex-1 ">
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
                    <div className="flex-1 ">
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
                    <div className="flex-1">
                        <label className="block text-base font-normal">
                            Course Language<span className="text-red-500"> *</span>
                        </label>
                        <select
                            className="mt-1 p-2 border-[#CCCCCC] rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.course_language}
                            onChange={(e) => setData('course_language', e.target.value)}
                        >
                            <option value="" disabled>Select Language</option>
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


                {/* Buttons */}
                <div className="flex justify-end gap-4 mb-5">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="sm:px-8 px-4 py-[6px] border-2 text-base font-medium border-[#0470B0] text-[#0470B0] rounded-full hover:border-[#004AAD] hover:text-[#004AAD]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="sm:px-8 px-4 py-[6px] border-2 text-base font-medium bg-[#0470B0] border-[#0470B0] rounded-full hover:bg-[#004AAD] hover:border-[#004AAD] text-white"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form >

        </div >



    );
}
