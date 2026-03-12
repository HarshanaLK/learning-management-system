import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/elements/inputs/InputError';

// Define the interface
interface FormData {
    interest_fields: string;
    levels: string;
    about_message: string;
}

export default function AdditionalEdit(
    {
        userProfile,
        onSuccess,
    }:
        {
            userProfile: any;
            onSuccess?: () => void;
        }) {
    const { data, setData, post, progress, processing, errors, wasSuccessful } = useForm<FormData>({
        interest_fields: userProfile?.interest_fields || '',
        levels: userProfile?.levels || '',
        about_message: userProfile?.about_message || '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof FormData, value); // Assert name as keyof FormData
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('profile.update.additional'), {
            onSuccess,
        });
    };



    return (
        <div className="mx-auto bg-white rounded-2xl">
            <h2 className="text-2xl font-semibold mb-8">Additional Info</h2>
            <p className="mb-6">What are your most interested fields to study</p>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div>
                    <label className="block text-base font-medium">Interest Fields</label>
                    <select
                        name="interest_fields"
                        value={data.interest_fields}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px] mb-5"
                    >
                        <option value="" disabled>Select Interest Field</option>
                        <option value="Web development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Graphic Design">Graphic Design</option>
                    </select>
                    <InputError message={errors.interest_fields} className='-mt-5'/>
                </div>

                <div>
                    <label className="block text-base font-medium">Level</label>
                    <select
                        name="levels"
                        value={data.levels}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-2 border-2 border-[#A4A5A4] rounded-[10px] mb-5"
                    >
                        <option value="" disabled>Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                        <option value="All Levels">All Levels</option>
                    </select>
                    <InputError message={errors.levels} className='-mt-5'/>
                </div>

                <div>
                    <label className="block text-base font-medium">About You</label>
                    <p className="font-medium text-sm">A personal summary can help recruiters understand your unique strengths.</p>
                    <textarea
                        name="about_message"
                        value={data.about_message}
                        onChange={handleInputChange}
                        placeholder='Tell us a bit about yourself'
                        className="w-full mt-2 px-4 max-h-28 min-h-20 text-black rounded-[10px] border-[#A4A5A4] border-2 mb-3"
                    ></textarea>
                    <InputError message={errors.about_message} className='-mt-4' />
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
