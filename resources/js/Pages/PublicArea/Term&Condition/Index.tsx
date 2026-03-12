// Term.tsx

import { Head, Link, usePage } from '@inertiajs/react';
import Public from '@/Layouts/PublicLayout';
import { useEffect, useState } from 'react';
import BackgroundIcon from '@/Components/shared/BackgroundIcon/BackgroundIcon';

const Term = ({ privacyPolicy }: { privacyPolicy: any }) => {
    const { props } = usePage();
    const user = props.auth.user;
    const [isAccepted, setIsAccepted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCheckboxChange = () => {
        setIsAccepted((prev) => !prev);
    };



    useEffect(() => {
        // Check local storage for previous acceptance status
        const previouslyAccepted = localStorage.getItem('termsAccepted') === 'true';
        setIsAccepted(previouslyAccepted);
    }, []);


    const handleAccept = () => {
        if (isAccepted) {
            setShowModal(true);
            localStorage.setItem('termsAccepted', 'true');
        }
    };

    const handleCancel = () => {
        setIsAccepted(false);
        localStorage.removeItem('termsAccepted');
    };

    return (
        <Public>
            <Head title="Terms & Conditions" />

            {/* Hero Section */}
            <section className="relative mt-30">
                <div
                    className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center"
                    style={{ backgroundImage: 'url(/assets/images/term_condition/term_condition.webp)' }}
                >
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <h1 className="text-white text-3xl mt-20 sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            TERMS & CONDITIONS
                        </h1>
                    </div>
                </div>
                <div className="absolute inset-0" style={{ background: '#00000080' }}></div>
            </section>

            {/* Background Icons */}
            <div className='absolute ml-20 mt-24 hidden lg:block'><BackgroundIcon /></div>
            <div className='absolute ml-28 mt-[400px] hidden lg:block'><BackgroundIcon fillColor='#BBE7C0' /></div>
            <div className='absolute left-1/2 mt-16 hidden lg:block'><BackgroundIcon fillColor='#AAE0FE' /></div>
            <div className='absolute right-28 mt-20 hidden lg:block'><BackgroundIcon fillColor='#BBE7C0' /></div>

            {/* Terms and Conditions Content */}
            <section className='sm:mt-28 sm:mb-24'>
                <div className="flex justify-center items-center px-4 py-16 bg-[#EFF9FF]">
                    <div className="bg-white z-10 sm:p-10 py-10 px-5 rounded-2xl max-w-5xl w-full">
                        <h2 className="text-2xl font-bold text-[#2BAFFC] mb-4">Terms and Conditions</h2>
                        <h2 className="text-lg font-bold mb-4">Your Agreement</h2>
                        <div className=" mt-2  text-[#6B6B6B] overflow-y-auto max-h-[409px] mb-4">
                            {privacyPolicy.content ? (
                                <p
                                    className="text-[#6B6B6B] mt-12  mb-6"
                                    dangerouslySetInnerHTML={{ __html: privacyPolicy.content }}
                                ></p>
                            ) : (
                                <p className="text-[#6B6B6B] mt-12 text-lg font-medium mb-6">
                                    No privacy policy available at this time.
                                </p>
                            )}
                        </div>
                        {user ? (
                            <div className="text-lg text-green-600 flex justify-end mr-3 mt-4">
                                You have already accepted this.
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        checked={isAccepted}
                                        onChange={handleCheckboxChange}
                                        className="mr-4 w-[19px] border-[#E0E0E0] h-[19px] mt-3 rounded-[5px] text-primary focus:ring-0"
                                    />
                                    <label className="mt-3 text-[1.063rem] font-medium">
                                        I confirm that I have read and accept the terms and conditions and privacy policy.
                                    </label>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleCancel}
                                        disabled={!isAccepted}
                                        className={`pr-9 px-4 py-2 text-[1.063rem] font-medium ${isAccepted ? 'text-[#54BFFD] hover:text-blue-600' : 'text-gray-400 cursor-not-allowed'}`}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleAccept}
                                        disabled={!isAccepted}
                                        className={`px-12 py-2 rounded-lg ${isAccepted ? 'bg-primary text-white hover:bg-blue-600' : 'bg-[#2BAFFC] opacity-30 text-white cursor-not-allowed'
                                            }`}
                                    >
                                        Accept
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-10 max-w-lg w-full text-center shadow-lg">
                        <div className="flex justify-center items-center mb-4">
                            <div className="rounded-full bg-green-500 flex items-center justify-center">
                                <svg width="90" height="89" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50.5" cy="50" r="50" fill="#4CAF50" />
                                    <path d="M75.6743 34.1417L47.014 69.977L24.5 51.2131L28.7479 46.1156L46.0582 60.5386L70.4971 30L75.6743 34.1417Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-14">Form Submitted Successfully! Thank you for your submission.</h2>
                        <Link
                            className="bg-[#2BAFFC] text-white  py-2 px-16 rounded-md hover:bg-blue-600 transition"
                            href="/register"
                        >
                            Got It! Thanks!
                        </Link>
                    </div>
                </div>
            )}
        </Public>
    );
};

export default Term;
