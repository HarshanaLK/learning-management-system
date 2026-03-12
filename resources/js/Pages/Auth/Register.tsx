import Checkbox from '@/Components/elements/inputs/Checkbox';
import InputError from '@/Components/elements/inputs/InputError';
import InputLabel from '@/Components/elements/inputs/InputLabel';
import TextInput from '@/Components/elements/inputs/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleGoogleLogin = () => {
        window.location.href = '/auth/google';
    };

    const [isChecked, setIsChecked] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };


    useEffect(() => {
        const termsAccepted = localStorage.getItem('termsAccepted') === 'true';
        if (termsAccepted) {
            setIsChecked(true);
        }
    }, []);




    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Head title="Register" />
            <div className='mt-2 sm:ml-16 flex sm:justify-start justify-center'> {/* Add flex and justify-center */}
                <Link href={route('home')}>
                    <img
                        src="/assets/images/login/logo.webp"
                        alt="Logo"
                        className='h-18'
                    />
                </Link>
            </div>
            <div className="mt-7 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center px-4 md:px-48 sm:px-20 lg:px-8">
                <div className="flex flex-col lg:flex-row w-full overflow-hidden">

                    {/* Left side: Image */}
                    <div className="w-full lg:w-1/2 hidden lg:block mb-4 rounded-2xl">
                        <img
                            src="/assets/images/register/register.webp"
                            alt="Register Illustration"
                            className="object-cover h-full w-full rounded-[15px]"
                        />
                    </div>
                    {/* Right side: Register Form */}
                    <div className="w-full lg:w-1/2 p-7 bg-[#EFF9FF] lg:ml-5 px-8 rounded-[15px]">
                        <h2
                            className="font-medium text-center leading-[40px] mt-2 sm:text-[40px] text-[30px]"
                            style={{ fontFamily: 'var(--Buttonfont)' }}
                        >
                            Sign up to LMS
                        </h2>

                        {/* google signup */}
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center pl-4 bg-white text-base font-normal border py-2 rounded-full hover:bg-gray-100 transition duration-300"
                            >
                                <img
                                    src="/assets/images/login/google.webp"
                                    alt="Google"
                                    className="h-6 mr-2"
                                />
                                <span className="flex-1 text-center mr-4">Continue with Google</span>
                            </button>
                        </div>


                        {/* Divider */}
                        <div className="flex items-center py-3">
                            <hr className="w-full border-[#737373]" />
                            <span className="px-4 py-2 text-gray-500 font-normal text-sm lg:text-xl">or</span>
                            <hr className="w-full border-[#737373]" />
                        </div>



                        <form onSubmit={submit} className="  pr-0 ">
                            <div className="flex text-lg lg:text-xl  flex-wrap gap-12">
                                <div className="flex-1">
                                    <InputLabel htmlFor="first_name">
                                        First Name<span className="text-red-500"> *</span>
                                    </InputLabel>
                                    <TextInput
                                        id="first_name"
                                        name="first_name"
                                        placeholder='Enter Your First Name'
                                        value={data.first_name}
                                        className="block w-full border-[#999999] mt-2 border-2 bg-[#EFF9FF] rounded-[10px]"
                                        autoComplete="first_name"
                                        isFocused={true}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.first_name} className="mt-2" />
                                </div>

                                <div className="flex-1">
                                    <InputLabel htmlFor="last_name" >
                                        Last Name<span className="text-red-500"> *</span>
                                    </InputLabel>
                                    <TextInput
                                        id="last_name"
                                        name="last_name"
                                        placeholder='Enter Your Last Name'
                                        value={data.last_name}
                                        className="block w-full border-[#999999] mt-2 border-2 bg-[#EFF9FF] rounded-[10px]"
                                        autoComplete="last_name"
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>
                            </div>

                            <div className="mt-6 lg:mt-4 text-lg lg:text-xl ">
                                <InputLabel htmlFor="email">
                                    Email<span className="text-red-500"> *</span>
                                </InputLabel>

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder='Enter Your Email Address'
                                    value={data.email}
                                    className="block w-full border-[#999999] mt-2 border-2 bg-[#EFF9FF] rounded-[10px]"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-6 lg:mt-4 text-lg lg:text-xl ">
                                <InputLabel htmlFor="password">
                                    Password<span className="text-red-500"> *</span>
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder='Enter Your Password'
                                        value={data.password}
                                        className="block w-full border-[#999999] mt-2 border-2 bg-[#EFF9FF] rounded-[10px] pr-10"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
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

                            <div className="mt-6 lg:mt-4 text-lg lg:text-xl ">
                                <InputLabel htmlFor="password_confirmation" >
                                    Confirm Password<span className="text-red-500"> *</span>
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        id="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder='Re-enter Your Password'
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="block w-full border-[#999999] mt-2 border-2 bg-[#EFF9FF] rounded-[10px] pr-10"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
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


                            {/* check box */}
                            <div className='mt-4'>
                                <label className="flex items-center pr-10.">
                                    <Checkbox
                                        name="terms"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                        className="form-checkbox h-5 w-3 text-blue-600 bg-[#EFF9FF] border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ms-2 text-sm lg:text-xl font-normal -mr-3">
                                        Yes, I understand and agree to the{" "}
                                        <a href={route('privacy-policy.show')} className="text-primary underline">
                                            Terms & Conditions
                                        </a>{" "}
                                        including the user agreement and privacy policy.
                                    </span>
                                </label>
                            </div>

                            <div className="mt-8 lg:mt-6 flex justify-center items-center">
                                <button
                                    className="w-full lg:w-60 py-2 text-white text-base font-medium rounded-full bg-primary hover:bg-[#004AAD] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={processing || !isChecked} // Disable if processing or checkbox not checked
                                    type="submit"
                                >
                                    Create Account
                                </button>
                            </div>

                            <div className="mt-6 lg:mt-5 text-center">
                                <p className="text-sm lg:text-xl text-[#737373]">
                                    Already have an account?{' '}
                                    <Link href={route('login')} className="text-join hover:underline">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </>
    );
}
