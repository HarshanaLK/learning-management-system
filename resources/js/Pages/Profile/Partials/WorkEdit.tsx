import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/elements/inputs/InputError';

// Define the interface
interface FormData {
    company_name: string;
    job_role: string;
    work_start_date: string;
    work_end_date: string;

}

export default function WorkEdit({
    workProfiles,
    editWork,
    onSuccess,
}: {
    workProfiles: any;
    editWork: any;
    onSuccess?: () => void;
}
) {
    const { data, setData, post, patch, progress, processing, errors, wasSuccessful } = useForm<FormData>({
        company_name: editWork?.company_name || workProfiles?.company_name || '',
        job_role: editWork?.job_role || workProfiles?.job_role || '',
        work_start_date: editWork?.work_start_date || workProfiles?.work_start_date || '',
        work_end_date: editWork?.work_end_date || workProfiles?.work_end_date || '',

    });

    const [minEndDate, setMinEndDate] = React.useState<string>('');
    const todayDate = new Date().toISOString().split('T')[0];


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof FormData, value); // Assert name as keyof FormData
    };

    useEffect(() => {
        if (editWork) {
            setData({
                company_name: editWork?.company_name || '',
                job_role: editWork?.job_role || '',
                work_start_date: editWork?.work_start_date || '',
                work_end_date: editWork?.work_end_date || '',
            });
        }
    }, [editWork]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const routeName = editWork ? 'profile.update.work' : 'profile.store.work';
        const workProfileId = editWork?.id;


        if (routeName === 'profile.store.work') {
            post(route(routeName, workProfileId), {
                onSuccess,
            });
        } else {
            patch(route(routeName, workProfileId), {
                onSuccess,
            });
        }

    };


    useEffect(() => {

        if (data.work_start_date) {
            setMinEndDate(data.work_start_date);
            if (data.work_end_date && data.work_end_date < data.work_start_date) {
                setData('work_end_date', '');
            }
        }
    }, [data.work_start_date]);

    return (
        <div className="mx-auto bg-white rounded-2xl">
            <h2 className="text-2xl font-semibold mb-8">Work experience</h2>
            <p className="mb-6">Add your past work experience. If you're just starting out, you can add internships or volunteer experience instead.</p>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div>
                    <label className="block text-base font-medium">
                        Company name<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        name="company_name"
                        value={data.company_name}
                        onChange={handleInputChange}
                        placeholder='Your company name'
                        className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                    />
                    <InputError message={errors.company_name} />
                </div>

                <div>
                    <label className="block text-base font-medium">
                        Job title/ Role<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        name="job_role"
                        value={data.job_role}
                        onChange={handleInputChange}
                        placeholder='Your job role'
                        className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                    />
                    <InputError message={errors.job_role} />
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-medium">
                            Start date<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="date"
                            name="work_start_date"
                            value={data.work_start_date}
                            max={todayDate}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px]"

                        />
                        <InputError message={errors.work_start_date} />
                    </div>

                    <div>
                        <label className="block text-base font-medium">End date</label>
                        <input
                            type="date"
                            name="work_end_date"
                            value={data.work_end_date}
                            min={minEndDate}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px] mb-5"

                        />
                        <InputError message={errors.work_end_date} />
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
