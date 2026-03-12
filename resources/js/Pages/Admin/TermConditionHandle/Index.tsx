import FlashAlerts from '@/Components/elements/alerts/FlashAlerts';
import InputError from '@/Components/elements/inputs/InputError';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const bRoutes = [
    { name: "Dashboard", hasArrow: false, link: "/dashboard" },
    { name: "Policy Editor", hasArrow: true, link: "/privacy-policy/edit" },
];

export default function PrivacySetting({
    privacyPolicy,
}: {
    privacyPolicy: any;
}) {
    const { data, setData, post, processing, errors, wasSuccessful, clearErrors } = useForm({
        privacy_policy: privacyPolicy?.content || '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post('/privacy-policy', {
            onSuccess: () => {
                setIsModalOpen(false);
            },
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setData('privacy_policy', privacyPolicy?.content || '');
        clearErrors();
    };

    const pageProps = usePage().props;

    return (
        <AdminLayout bRoutes={bRoutes}>
            <Head title="Policy Editor" />
            <div className="flex flex-col items-center min-h-screen mt-2">
                <div className="w-full bg-white lg:pr-6 sm:mx-0 px-4">
                    <h1 className="text-2xl font-bold mb-4">Privacy Editor</h1>

                    <p
                        className="text-[#6B6B6B] mt-12 mb-6"
                        dangerouslySetInnerHTML={{ __html: privacyPolicy.content }}
                    ></p>

                    <div className="flex flex-col sm:flex-row justify-left items-center mt-16 mb-16">
                        <p className="text-base font-medium mt-1 mr-0 sm:mr-20 mb-4 sm:mb-[6px]">Create a new privacy policy page</p>
                        <button
                            onClick={openModal}
                            className="bg-primary rounded-full max-w-52 text-sm font-medium text-white py-2 px-10 hover:bg-blue-600"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>

            <FlashAlerts flash={pageProps.flash} />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="bg-white p-6 rounded-2xl shadow-lg w-[533px] relative"
                        style={{ maxHeight: '90vh', overflowY: 'auto' }} // Ensures scrolling
                    >
                        <h2 className="text-xl font-bold mb-4">New Privacy Policy</h2>
                        <button
                            onClick={closeModal}
                            className="absolute top-7 right-8 text-lg text-black hover:text-gray-800"
                            aria-label="Close"
                        >
                            <GrClose />
                        </button>
                        <p className="mb-4">Add your privacy policy here</p>
                        <form onSubmit={handleSubmit} className="privacy-policy-form">
                            <div className='mb-16  max-h-96'>
                                <ReactQuill
                                    value={data.privacy_policy}
                                    onChange={(value) => setData('privacy_policy', value)}
                                    theme="snow"
                                    placeholder="Type your privacy policy..."
                                    className="h-96"
                                />
                            </div>
                            <div className=''>
                            <InputError message={errors.privacy_policy} className='' />
                            </div>
                            <div className="flex justify-end space-x-4 mt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-[#0470B0] py-1 px-5 border-2 border-[#0470B0] hover:border-blue-600 rounded-full hover:text-blue-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#0470B0] text-white py-1 px-4 rounded-full hover:bg-blue-600"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
