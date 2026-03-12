import { useState } from 'react';
import Section from './Partials/Section';
import Public from '@/Layouts/PublicLayout';
import ProfileEdit from './Partials/PersonalEdit';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdditionalEdit from './Partials/AdditionalEdit';
import EducationEdit from './Partials/EducationEdit';
import WorkEdit from './Partials/WorkEdit';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';
import DeleteModal from '@/Components/elements/alerts/DeleteAlert';
import AlertDelete from '@/Components/elements/alerts/AlertDelete';
import Avatar from 'react-avatar';
import FlashAlerts from '@/Components/elements/alerts/FlashAlerts';




export default function ProfilePage({
    user,
    userProfile,
    educationProfiles,
    workProfiles,
}: {
    user: any;
    userProfile: any;
    educationProfiles: any;
    workProfiles: any;
}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
    const [editEducationProfile, setEditEducationProfile] = useState<any>(null);
    const [editWorkProfile, setEditWorkProfile] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleteWorkModalOpen, setIsDeleteWorkModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSuccessDelete, setIsSuccessDelete] = useState(false);
    const [deleteWorkId, setDeleteWorkId] = useState<number | null>(null);
    const [deleteEducationId, setDeleteEducationId] = useState<number | null>(null);
    const [isAdditionalDeleteModalOpen, setIsAdditionalDeleteModalOpen] = useState(false);
    const pageProps = usePage().props;


    const openModal = () => setIsAdditionalDeleteModalOpen(true);
    const closeModal = () => setIsAdditionalDeleteModalOpen(false);



    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleAdditionalInfoModalOpen = () => setIsAdditionalInfoModalOpen(true);
    const handleAdditionalInfoModalClose = () => setIsAdditionalInfoModalOpen(false);


    const handleEducationModalOpen = () => setIsEducationModalOpen(true);
    const handleEducationModalClose = () => {
        setIsEducationModalOpen(false);
        setEditEducationProfile(null);
    };


    const handleSuccess = () => {
        setIsSuccess(true);
        handleEducationModalClose();
        handleWorkModalClose();
        handleAdditionalInfoModalClose();
        handleModalClose();

        setTimeout(() => {
            setIsSuccess(false);
        }, 5000);
    }


    const handleWorkModalOpen = () => setIsWorkModalOpen(true);
    const handleWorkModalClose = () => setIsWorkModalOpen(false);


    const handleDeleteEducation = (id: number) => {

        if (deleteEducationId !== null) {
            router.delete(route('profile.delete.education', deleteEducationId), {});
            setIsDeleteModalOpen(false);
            setDeleteEducationId(null);
            setIsSuccessDelete(true);

            setIsSuccessDelete(true);
            setTimeout(() => {
                setIsSuccessDelete(false);
            }, 5000);// Reset the ID after delete
        }

    };
    const handleEditEducation = (educationProfile: any) => {
        setEditEducationProfile(educationProfile);
        handleEducationModalOpen();
    };


    const handleDeleteWork = (id: any) => {
        if (deleteWorkId !== null) {
            router.delete(route('profile.delete.work', deleteWorkId), {});
            setIsDeleteWorkModalOpen(false);
            setDeleteWorkId(null);

            setIsSuccessDelete(true);
            setTimeout(() => {
                setIsSuccessDelete(false);
            }, 5000);// Reset the ID after delete
        }
    };


    const handleDeleteAddition = (id: string | number) => {
        closeModal();
        if (!id) return;
        router.delete(route('profile.delete.additional', id), {
            onSuccess: () => {
                setIsSuccessDelete(true);
                setTimeout(() => {
                    setIsSuccessDelete(false);
                }, 5000);
            },
        });
    };

    const handleEditWork = (profile: any) => {
        setEditWorkProfile(profile);
        handleWorkModalOpen();
    };

    return (
        <Public>
            <Head title="Profile" />
            <div className="flex flex-col max-w-7xl mx-auto mt-36 lg:flex-row gap-6 p-6  ">
                {/* Left Sidebar */}
                <div className="flex flex-col gap-6 lg:w-1/3">
                    <div className="bg-[#EFF9FF] p-6 py-9 rounded-[15px] border-[1px] text-center relative">
                        <div className="absolute top-2 right-3 cursor-pointer m-2 text-3xl font-light">
                            <button onClick={handleModalOpen}>
                                <span role="img" aria-label="edit">
                                    <img src={'assets/images/icons/create.svg'} alt="edit" width="30" height="30" />
                                </span>
                            </button>
                        </div>
                        <h1 className="font-medium text-2xl mt-2">Personal Details</h1>


                        <div className="w-[150px] h-[150px] rounded-full mx-auto mt-8 flex items-center justify-center overflow-hidden">
                            {user.profile_avatar ? (
                                <img
                                    src={`/storage/${user.profile_avatar}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <Avatar
                                    name={user.first_name}
                                    size="150"
                                    round={true}
                                    textSizeRatio={2}
                                    className="w-full h-full"
                                />
                            )}
                        </div>

                        <h2 className="font-bold mt-4 text-[2rem]">{user.first_name} {user.last_name}</h2>


                        {(user.address || user.date_of_birth || user.mobile || user.gender) && (
                            <div className="grid grid-cols-2 gap-y-2 gap-x-0 mt-5 pl-10 bg-blue-50 rounded-lg text-left ">
                                {user.first_name && (
                                    <>
                                        <div className="text-base font-medium">Name</div>
                                        <div className="text-base font-normal">{user.first_name} {user.last_name}</div>
                                    </>
                                )}
                                {user.address && (
                                    <>
                                        <div className="text-base font-medium">Address</div>
                                        <div className="text-base font-normal">{user.address}</div>
                                    </>
                                )}
                                {user.email && (
                                    <>
                                        <div className="text-base font-medium">Email</div>
                                        <div className="text-base font-normal break-words">{user.email}</div>
                                    </>
                                )}
                                {user.date_of_birth && (
                                    <>
                                        <div className="text-base font-medium">Date of Birth</div>
                                        <div className="text-base font-normal">
                                            {new Date(user.date_of_birth).toLocaleDateString()}
                                        </div>
                                    </>
                                )}
                                {user.mobile && (
                                    <>
                                        <div className="text-base font-medium">Mobile</div>
                                        <div className="text-base font-normal">{user.mobile}</div>
                                    </>
                                )}
                                {user.gender && (
                                    <>
                                        <div className="text-base font-medium">Gender</div>
                                        <div className="text-base font-normal">{user.gender}</div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>



                    {/* Additional info */}
                    <div className="bg-[#EFF9FF] p-6 rounded-[15px] text-center">
                        <h3 className="font-bold text-xl ">Additional Info</h3>
                        {(userProfile?.interest_fields || userProfile?.levels || userProfile?.about_message) ? (

                            <>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={openModal}
                                        className="hover:underline text-lg mb-1"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-y-2 gap-x-2 px-8 text-left mb-5">
                                    {userProfile?.interest_fields && (
                                        <>
                                            <div className="text-base font-medium">Interest Fields</div>
                                            <div className="text-base font-normal">{userProfile.interest_fields}</div>
                                        </>
                                    )}
                                    {userProfile?.levels && (
                                        <>
                                            <div className="text-base font-medium">Level</div>
                                            <div className="text-base font-normal">{userProfile.levels}</div>
                                        </>
                                    )}
                                    {userProfile?.about_message && (
                                        <>
                                            <div className="text-base font-medium">About</div>
                                            <div className="text-base font-normal break-words">{userProfile.about_message}</div>
                                        </>
                                    )}
                                </div>

                            </>
                        ) : (
                            <p className="my-8 text-base font-normal leading-[1.5]">
                                Help recruiters know you better by describing what makes you a great candidate and sharing news.
                            </p>
                        )}
                        <button
                            onClick={handleAdditionalInfoModalOpen}
                            className="bg-primary hover:bg-btnHov text-white text-sm font-medium px-[30px] py-[6px] rounded-full">
                            {userProfile?.interest_fields || userProfile?.levels || userProfile?.about_message
                                ? "Update additional info"
                                : "Add additional info"}
                        </button>
                    </div>

                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-6 lg:w-2/3">
                    <Section title="Courses">
                        <div className="bg-[#EFF9FF] p-6 rounded-[15px]">
                            <Link href={'/users/completed-courses'}>
                                <h3 className="font-bold text-xl">Completed Courses</h3>
                            </Link>
                            <p className='mt-[10px] text-base font-normal'>Showcase your completed courses with relevant courses.</p>
                        </div>
                        <div className="bg-[#EFF9FF] p-6 rounded-lg mt-4">
                            <Link href={'/users/ongoing-courses'}>
                                <h3 className="font-bold text-xl">Ongoing Courses</h3>
                            </Link>
                            <p className='mt-[10px] text-base font-normal'>Showcase your ongoing courses with relevant content.</p>
                        </div>
                    </Section>
                    <Section title="Education">
                        <div className="bg-[#EFF9FF] p-6 rounded-[15px] flex flex-col md:flex-row justify-between items-center md:items-start">
                            <div className="flex-1 space-y-1">
                                <h3 className="font-bold text-xl">Credential</h3>
                                <p className="mt-[10px] text-base font-normal">
                                    Add your background here to let us know where you are studied or are currently studying.
                                </p>
                            </div>
                            <div className="mt-4 md:mt-[22px] md:flex-shrink-0 md:ml-4 w-full md:w-auto flex md:block justify-center">
                                <button
                                    onClick={handleEducationModalOpen}
                                    className="bg-primary hover:bg-btnHov text-white text-sm py-[6px] px-4 font-medium rounded-full min-w-[160px]">
                                    Add education
                                </button>
                            </div>
                        </div>

                        {educationProfiles.map((educationProfile: any) => (
                            <div key={educationProfile.id} className="p-4 rounded-b-[15px] -mt-2 bg-white border border-gray-200 shadow-sm">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEditEducation(educationProfile)}
                                        className="hover:underline text-lg"
                                    >
                                        <MdOutlineModeEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsDeleteModalOpen(true)
                                            setDeleteEducationId(educationProfile.id);
                                        }}
                                        className="hover:underline text-lg"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                                <DeleteModal
                                    isOpen={isDeleteModalOpen}
                                    onClose={() => setIsDeleteModalOpen(false)}
                                    onConfirmDelete={() => handleDeleteEducation(educationProfile.id)}
                                />

                                <div className="grid grid-cols-2 gap-2 ml-10">
                                    {educationProfile.institute_name && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base">
                                                Name of Institute: <span className="text-base font-normal">{educationProfile.institute_name}</span>
                                            </span>
                                        </div>
                                    )}
                                    {educationProfile.education_start_date && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base">
                                                Start Date: <span className="text-base font-normal">{educationProfile.education_start_date}</span>
                                            </span>
                                        </div>
                                    )}
                                    {educationProfile.degree && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base">
                                                Degree: <span className="text-base font-normal">{educationProfile.degree}</span>
                                            </span>
                                        </div>
                                    )}
                                    {educationProfile.education_end_date && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base">
                                                End Date: <span className="text-base font-normal">{educationProfile.education_end_date}</span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Section>

                    <Section title="Work History">
                        <div className="bg-[#EFF9FF] p-6 rounded-[15px] flex flex-col md:flex-row justify-between items-center md:items-start">
                            <div className="flex-1 space-y-1">
                                <h3 className="font-bold text-xl">Credential</h3>
                                <p className="mt-[10px] text-base font-normal">
                                    Add your past work experience here. If you're just starting out, you can add internships or volunteer experience instead.
                                </p>
                            </div>
                            <div className="mt-4 md:mt-[22px] md:flex-shrink-0 md:ml-4 w-full md:w-auto flex md:block justify-center">
                                <button
                                    onClick={handleWorkModalOpen}
                                    className="bg-primary hover:bg-btnHov text-white text-sm py-[6px] px-4 font-medium rounded-full min-w-[160px]">
                                    Add work experience
                                </button>
                            </div>
                        </div>

                        {workProfiles.map((profile: any) => (
                            <div key={profile.id} className="p-4 rounded-b-[15px] -mt-2 bg-white border border-gray-200 shadow-sm">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEditWork(profile)}
                                        className="hover:underline text-lg"
                                    >
                                        <MdOutlineModeEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsDeleteWorkModalOpen(true);
                                            setDeleteWorkId(profile.id); // Set specific ID
                                        }}
                                        className="hover:underline text-lg"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </div>

                                <DeleteModal
                                    isOpen={isDeleteWorkModalOpen}
                                    onClose={() => setIsDeleteWorkModalOpen(false)}
                                    onConfirmDelete={() => handleDeleteWork(profile.id)}
                                />


                                <div className="grid grid-cols-2 gap-2 ml-10">
                                    {profile.company_name && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base">Name of Company: <span className="text-base font-normal">{profile.company_name}</span></span>
                                        </div>
                                    )}
                                    {profile.work_start_date && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base">Start Date: <span className="text-base font-normal">{profile.work_start_date}</span></span>
                                        </div>
                                    )}
                                    {profile.job_role && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base">Job Role: <span className="text-base font-normal">{profile.job_role}</span></span>
                                        </div>
                                    )}
                                    {profile.work_end_date && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base">End Date: <span className="text-base font-normal">{profile.work_end_date}</span></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Section>
                </div>
            </div>

            {/* Modal for ProfileEdit */}
            {isModalOpen && (
                <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleModalClose}>
                    <div className="relative bg-white rounded-2xl max-w-xl w-full p-6  py-10 " onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleModalClose} className="absolute top-10 right-10 text-xl  hover:text-gray-600">
                            <GrClose />
                        </button>
                        <ProfileEdit user={user} onSuccess={handleSuccess} />
                    </div>
                </div>
            )}

            {/* Modal for Additional Info */}
            {isAdditionalInfoModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleAdditionalInfoModalClose}>
                    <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10 " onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleAdditionalInfoModalClose} className="absolute top-10 right-10 text-xl  hover:text-gray-600">
                            <GrClose />
                        </button>
                        <AdditionalEdit userProfile={userProfile} onSuccess={handleSuccess} />
                    </div>
                </div>
            )}

            {/* Modal for Educational Info */}
            {isEducationModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleEducationModalClose}>
                    <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10" onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleEducationModalClose} className="absolute top-10 right-10 text-xl  hover:text-gray-600">
                            <GrClose />
                        </button>
                        <EducationEdit
                            educationProfiles={educationProfiles}
                            editProfile={editEducationProfile}
                            onSuccess={handleSuccess}
                        />

                    </div>
                </div>
            )}

            {/* Modal for Work Info */}
            {isWorkModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleWorkModalClose}>
                    <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 py-10" onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleWorkModalClose} className="absolute top-10 right-10 text-xl hover:text-gray-600">
                            <GrClose />
                        </button>
                        <WorkEdit workProfiles={workProfiles} editWork={editWorkProfile} onSuccess={handleSuccess} />
                    </div>
                </div>
            )}

            <AlertDelete
                isOpen={isAdditionalDeleteModalOpen}
                onClose={closeModal}
                onConfirmDelete={() => handleDeleteAddition(userProfile.id)}
                title="Are you sure you want to remove this?"
                message="This action cannot be undone and all associated data will be lost."
            />

            <FlashAlerts flash={pageProps.flash} />
        </Public>
    );
}

