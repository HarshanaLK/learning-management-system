import { PrimaryButton } from '@/Components/elements/buttons/PrimaryButton';
import Checkbox from '@/Components/elements/inputs/Checkbox';
import InputError from '@/Components/elements/inputs/InputError';
import InputLabel from '@/Components/elements/inputs/InputLabel';
import TextInput from '@/Components/elements/inputs/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = '/auth/google';
    };

    const [showPassword, setShowPassword] = useState(false);


    return (
        <>
            <Head title="Log in" />

            <div className='mt-2 sm:ml-16 flex sm:justify-start justify-center'> {/* Add flex and justify-center */}
                <Link href={route('home')}>
                    <img
                        src="/assets/images/login/logo.webp"
                        alt="Logo"
                        className='h-18'
                    />
                </Link>
            </div>
            <div className="mt-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center px-4 md:px-48 sm:px-20  lg:px-8">
                <div className="flex flex-col lg:flex-row w-full overflow-hidden">
                    {/* Left side: Login Form */}
                    <div className="w-full lg:w-1/2 p-8 bg-[#EFF9FF] lg:mr-5 mb-6 lg:mb-3 rounded-[15px]">
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                        <h2
                            className="font-medium text-center leading-[40px] mt-8 sm:text-[40px] text-[30px]"
                            style={{ fontFamily: 'var(--Buttonfont)' }}
                        >
                            Log in to LMS
                        </h2>
                        <form onSubmit={submit} className="mt-8 lg:mt-16 pr-0 lg:pr-6">
                            <div>
                                <InputLabel htmlFor="email"  className="text-lg lg:text-xl font-medium mb-2" >
                                Email<span className="text-red-500"> *</span>
                                </InputLabel>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder='Enter Your Email Address'
                                    className="block w-full border-[#999999] border-2 bg-[#EFF9FF] rounded-[10px]"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-6 lg:mt-9">
                                <InputLabel htmlFor="password"  className="text-lg lg:text-xl font-medium mb-2">
                                Password<span className="text-red-500"> *</span>
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder='Enter Your Password'
                                        value={data.password}
                                        className="block w-full border-[#999999] border-2 bg-[#EFF9FF] rounded-[10px] pr-10"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-2xl text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VscEye /> : <VscEyeClosed />}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-6 lg:mt-8 flex items-center justify-between">
                                <label className="flex items-center pr-10.">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="form-checkbox h-5 w-3 text-blue-600 bg-[#EFF9FF] border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ms-2 text-sm lg:text-xl font-normal">
                                        Keep me logged in
                                    </span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm lg:text-xl font-normal text-join hover:underline pr-2 lg:pr-14"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <div className="mt-8 lg:mt-10 flex justify-center items-center">
                                <button
                                    className="w-full lg:w-60 py-2 text-white text-base font-medium rounded-full bg-primary hover:bg-[#004AAD] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={processing}
                                >
                                    Log in
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center my-4">
                                <hr className="w-full border-[#737373]" />
                                <span className="px-4 py-2 text-gray-500 font-normal text-sm lg:text-xl">or</span>
                                <hr className="w-full border-[#737373]" />
                            </div>

                            <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full lg:w-60 flex items-center lg:pl-2 pl-4 bg-white text-base font-normal border py-2 rounded-full hover:bg-gray-100 transition duration-300"
                            >
                                <img
                                    src="/assets/images/login/google.webp"
                                    alt="Google"
                                    className="h-6 mr-2"
                                />
                                <span className="flex-1 text-center lg:-mr-3 mr-4">Continue with Google</span>
                            </button>
                        </div>
                            <div className="mt-6 lg:mt-10 text-center">
                                <p className="text-sm lg:text-xl text-[#737373]">
                                    You don’t have an LMS account?{' '}
                                    <Link href={route('register')} className="text-join hover:underline">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Right side: Image */}
                    <div className="w-full lg:w-1/2 hidden lg:block rounded-2xl">
                        <img
                            src="/assets/images/login/login.webp"
                            alt="Login Illustration"
                            className="object-cover h-full w-full rounded-[15px]"
                        />
                    </div>
                </div>
            </div>

        </>
    );
}
