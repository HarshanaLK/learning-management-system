import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import InputError from '@/Components/elements/inputs/InputError';
import { BsTrash3 } from 'react-icons/bs';
import AlertDelete from '@/Components/elements/alerts/AlertDelete';
import Avatar from 'react-avatar';


// Define the interface
interface FormData {
    first_name: string;
    last_name: string;
    address: string;
    date_of_birth: string;
    mobile: string;
    email: string;
    gender: string;
    profile_photo: File | null;
}

export default function ProfileEdit({
    user,
    onSuccess,
}: {
    user: any;
    onSuccess?: () => void;
}) {
    const { data, setData, post, progress, processing, errors, wasSuccessful } = useForm<FormData>({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        address: user.address || '',
        date_of_birth: user.date_of_birth || '',
        mobile: user.mobile || '',
        email: user.email || '',
        gender: user.gender || '',
        profile_photo: null,
    });


    const todayDate = new Date().toISOString().split('T')[0];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wasDeletedSuccessfully, setWasDeletedSuccessfully] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;


        if (type === 'file') {
            const target = e.target as HTMLInputElement;
            if (target.files) {

                setData(name as keyof FormData, target.files[0]);
            }
        } else {

            setData(name as keyof FormData, value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('profile.update'), {
            onSuccess,
        });
    };

    const handleDelete = () => {
        closeModal();
        router.post(route('profile.deleteIcon'), {}, {
            onSuccess: () => {
                setData('profile_photo', null);
                setWasDeletedSuccessfully(true);
                setTimeout(() => {
                    setWasDeletedSuccessfully(false);
                }, 5000);//
            }
        });
    };

    return (

        <div className=" mx-auto   bg-white rounded-2xl max-h-[90vh]  overflow-y-auto pr-5">
            <h2 className="text-2xl font-semibold mb-8">Personal Details</h2>
            <p className="mb-6">Add your personal details as you would like to appear on your profile</p>

            {/* Profile Photo Upload */}
            <h2 className="text-base font-semibold mb-5">Profile Photo</h2>
            <div className="mb-4 ml-2">
                <div className="relative w-[100px] h-[100px] ml-5 mb-3">
                    <div className="w-full h-full rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
                        {data.profile_photo ? (
                            <img
                                src={URL.createObjectURL(data.profile_photo)}
                                alt="Profile Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : user.profile_avatar ? (
                            <img
                                src={`/storage/${user.profile_avatar || 'profileupload.webp'}`}
                                alt="Profile Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Avatar
                                name={`${user.first_name}`}
                                size="100%" // Ensures the avatar fills the container
                                round={true}
                                textSizeRatio={2}
                                className="w-full h-full"
                            />
                        )}
                    </div>

                    {/* Only show the delete button if there's a profile photo to delete */}
                    {data.profile_photo || user.profile_avatar ? (
                        <button
                            type="button"
                            onClick={openModal}
                            className="absolute top-0 right-0 -mt-3 text-sm font-medium rounded-full flex items-center justify-center"
                        >
                            <BsTrash3 className="text-primary hover:text-red-500 text-xl " />
                        </button>
                    ) : null}
                </div>

                <input
                    type="file"
                    className="hidden"
                    id="profile_photo"
                    name="profile_photo"
                    accept="image/jpeg, image/png"
                    onChange={handleInputChange}
                />

                <label htmlFor="profile_photo" className="bg-primary hover:bg-blue-500 cursor-pointer text-white text-sm mb-5 font-medium px-[30px] py-[6px] rounded-full">
                    Upload photo
                </label>

                <p className="text-sm font-light -ml-2 mt-2">Maximum size: 1MB. Supported formats: JPG or PNG</p>
                <InputError message={errors.profile_photo} />
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-medium ">
                            First Name<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            placeholder='Your first name'
                            value={data.first_name}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                        />
                        <InputError message={errors.first_name} />
                    </div>
                    <div>
                        <label className="block text-base font-medium">
                            Last Name<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={data.last_name}
                            placeholder='Your last name'
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                        />
                        <InputError message={errors.last_name} />
                    </div>
                </div>

                <div>
                    <label className="block text-base font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder='Your address'
                        value={data.address}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                    />
                    <InputError message={errors.address} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            max={todayDate}
                            value={data.date_of_birth}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                        />
                        <InputError message={errors.date_of_birth} />
                    </div>
                    <div>
                        <label className="block text-base font-medium">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            placeholder='Your contact number'
                            value={data.mobile}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                        />
                        <InputError message={errors.mobile} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-medium">
                            Email<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder='Your email address'
                            value={data.email}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                        />
                        <InputError message={errors.email} />
                    </div>
                    <div>
                        <label className="block text-base font-medium">Gender</label>
                        <select
                            name="gender"
                            value={data.gender}
                            onChange={handleInputChange} // This now works correctly
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px] mb-5"
                        >
                            <option value="" disabled >
                                Select Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="">Clear Selection</option>
                        </select>
                        <InputError message={errors.gender} />
                    </div>
                </div>


                <button
                    type="submit"
                    className="bg-[#0470B0] hover:bg-[#0450B0] text-white text-base mb-6 font-medium px-[32px] py-[8px] rounded-full float-right"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Save changes'}
                </button>

            </form>
            <AlertDelete
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirmDelete={handleDelete}
                title="Are you sure you want to remove this Image?"
                message="This action cannot be undone and all associated data will be lost."
            />

            {/* Display progress */}
            {progress && <progress value={progress.percentage} max="100">{progress.percentage}%</progress>}
        </div>

    );
}
