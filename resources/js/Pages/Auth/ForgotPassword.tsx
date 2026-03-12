import { PrimaryButton } from '@/Components/elements/buttons/PrimaryButton';
import InputError from '@/Components/elements/inputs/InputError';
import InputLabel from '@/Components/elements/inputs/InputLabel';
import TextInput from '@/Components/elements/inputs/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Label } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <h1 className='text-xl mb-2 font-medium'>Reset Your Password</h1>
            <div className="mb-4 text-sm text-gray-600">
                Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}


            <form onSubmit={submit}>

                <h1 className="text-base font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                </h1>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    placeholder='Enter your email address'
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <button className="ms-4 bg-primary hover:bg-blue-500 text-lg font-normal text-white rounded-full px-6 py-1" disabled={processing}>
                        Submit
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
