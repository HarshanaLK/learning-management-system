import InputError from '@/Components/elements/inputs/InputError';
import InputLabel from '@/Components/elements/inputs/InputLabel';
import TextInput from '@/Components/elements/inputs/TextInput';
import { router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

export default function Register({ course }: { course: any }) {
    const { props } = usePage();
    const isAuthenticated = Boolean(props.auth?.user); // Check if user is authenticated

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register.enroll'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    const handleEnrollment = () => {
        router.post(`/courses/${course.id}/checkout`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };


    return (
        <>
            <div className="lg:px-10">
                <div className="w-full sm:p-6 p-3 border lg:ml-5 lg:px-8 rounded-[15px] sm:pb-32 pb-12">
                    {/* Check if user is already authenticated */}
                    {isAuthenticated ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-green-600 mt-16">You are Successfully Registered!</h2>
                            <p className="mt-2 text-lg">Proceed to your course enroll now.</p>
                            <div className="mt-8 lg:mt-6 flex justify-center items-center">
                                <button
                                    onClick={handleEnrollment}
                                    className="w-full lg:w-60 py-2 text-white text-base font-medium rounded-full bg-[#33E569] hover:bg-[#3AF774] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Pay For Course
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Registration Form */}
                            <form onSubmit={submit} className="pr-0">
                                <p className="text-lg font-semibold text-center text-gray-800 mb-2 mt-10">
                                    You must be logged in to access billing info
                                </p>
                                <p className="text-sm text-center text-gray-600 mb-10">
                                    Please register to continue to your checkout.
                                </p>
                                <div className="flex gap-4 sm:flex-row flex-col">
                                    <div className="flex-1">
                                        <InputLabel htmlFor="first_name">
                                            First Name<span className="text-red-500"> *</span>
                                        </InputLabel>
                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            placeholder="Enter Your First Name"
                                            value={data.first_name}
                                            className="block w-full border-[#00000040] mt-2 border rounded-[10px]"
                                            autoComplete="first_name"
                                            isFocused={true}
                                            onChange={(e) => setData('first_name', e.target.value)}

                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>

                                    <div className="flex-1">
                                        <InputLabel htmlFor="last_name">
                                            Last Name<span className="text-red-500"> *</span>
                                        </InputLabel>
                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            placeholder="Enter Your Last Name"
                                            value={data.last_name}
                                            className="block w-full border-[#00000040] mt-2 border rounded-[10px]"
                                            autoComplete="last_name"
                                            onChange={(e) => setData('last_name', e.target.value)}

                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mt-6 lg:mt-4 text-lg lg:text-xl">
                                    <InputLabel htmlFor="email">
                                        Email<span className="text-red-500"> *</span>
                                    </InputLabel>
                                    <TextInput
                                        id="email"
                                        type="text"
                                        name="text"
                                        placeholder="Enter Your Email Address"
                                        value={data.email}
                                        className="block w-full border-[#00000040] mt-2 border rounded-[10px]"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}

                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-6 lg:mt-4 text-lg lg:text-xl">
                                    <InputLabel htmlFor="password">
                                        Password<span className="text-red-500"> *</span>
                                    </InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Enter Your Password"
                                            value={data.password}
                                            className="block w-full border-[#00000040] mt-2 border rounded-[10px] pr-10"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}

                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-2xl text-gray-600 mt-2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VscEye /> : <VscEyeClosed />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-6 lg:mt-4 text-lg lg:text-xl">
                                    <InputLabel htmlFor="password_confirmation">
                                        Confirm Password<span className="text-red-500"> *</span>
                                    </InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            id="password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Re-enter Your Password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="block w-full border-[#00000040] mt-2 border-2 rounded-[10px] pr-10"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}

                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-2xl text-gray-600 mt-2"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <VscEye /> : <VscEyeClosed />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="mt-8 lg:mt-6 flex justify-center items-center">
                                    <button
                                        className="w-60 lg:w-60 py-2 text-white text-base font-medium rounded-full bg-primary hover:bg-[#004AAD] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="submit"
                                    >
                                        Create Account
                                    </button>
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <button
                                        disabled
                                        className="w-60 lg:w-60 py-2 text-white text-base font-medium rounded-full bg-[#33E569] hover:bg-[#3AF774] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        Pay For Course
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
