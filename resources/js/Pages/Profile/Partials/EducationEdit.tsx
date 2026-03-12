import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/elements/inputs/InputError';

// Define the interface
interface FormData {
    institute_name: string;
    degree: string;
    education_start_date: string;
    education_end_date: string;

}

export default function EducationEdit({
    educationProfiles,
    editProfile,
    onSuccess,

}: {
    educationProfiles: any;
    editProfile: any;
    onSuccess?: () => void;
}) {
    // Initialize form data
    const { data, setData, patch, post, progress, processing, errors, wasSuccessful } = useForm<FormData>({
        institute_name: editProfile?.institute_name || educationProfiles?.institute_name || '',
        degree: editProfile?.degree || educationProfiles?.degree || '',
        education_start_date: editProfile?.education_start_date || educationProfiles?.education_start_date || '',
        education_end_date: editProfile?.education_end_date || educationProfiles?.education_end_date || '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof FormData, value);
    };

    const [minEndDate, setMinEndDate] = React.useState<string>('');
    const todayDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (editProfile) {
            setData({
                institute_name: editProfile.institute_name || '',
                degree: editProfile.degree || '',
                education_start_date: editProfile.education_start_date || '',
                education_end_date: editProfile.education_end_date || '',
            });
        }
    }, [editProfile]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const routeName = editProfile ? 'profile.update.education' : 'profile.store.education';
        const educationProfileId = editProfile?.id;

        if (editProfile) {
            patch(route(routeName, educationProfileId), {
                onSuccess,
            });
        } else {
            post(route(routeName), {
                onSuccess,
            });
        }
    };

    useEffect(() => {
        // Set the minimum end date when the start date changes
        if (data.education_start_date) {
            setMinEndDate(data.education_start_date);
            if (data.education_end_date && data.education_end_date < data.education_start_date) {
                setData('education_end_date', ''); // Clear end date if it’s before the new start date
            }
        }
    }, [data.education_start_date]);



    return (
        <div className="mx-auto bg-white rounded-2xl">
            <h2 className="text-2xl font-semibold mb-8">Education</h2>
            <p className="mb-6">
                Add your educational background to let employers know where you studied or are currently studying.
                Even if you didn’t finish, it’s important to include it here.
                And if you’ve earned a college degree, you don’t need to add your high school/GED. All fields are optional.
            </p>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div>
                    <label className="block text-base font-medium">
                        Name of your Institute <span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        name="institute_name"
                        value={data.institute_name}
                        onChange={handleInputChange}
                        placeholder='Name of your Instititute'
                        className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"
                    />
                    <InputError message={errors.institute_name} />
                </div>

                <div>
                    <label className="block text-base font-medium">
                        Degree<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        name="degree"
                        value={data.degree}
                        onChange={handleInputChange}
                        placeholder='Your highest level of education'
                        className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"
                    />
                    <InputError message={errors.degree} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-medium">Start date</label>
                        <input
                            type="date"
                            name="education_start_date"
                            value={data.education_start_date}
                            max={todayDate}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"
                        />
                        <InputError message={errors.education_start_date} />
                    </div>

                    <div>
                        <label className="block text-base font-medium">End date</label>
                        <input
                            type="date"
                            name="education_end_date"
                            value={data.education_end_date}
                            min={minEndDate}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px] mb-5"
                        />
                        <InputError message={errors.education_end_date} />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#0470B0] hover:bg-[#0450B0] text-white text-base mb-6 font-medium px-[32px] py-[8px] rounded-full float-right"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Save'}
                </button>


            </form>

            {/* Display progress */}
            {progress && <progress value={progress.percentage} max="100">{progress.percentage}%</progress>}
        </div>
    );
}


