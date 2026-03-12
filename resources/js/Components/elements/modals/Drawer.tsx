import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren } from 'react';

export default function Drawer({
    children,
    open = false,
    setOpen,
    title = 'Panel Title',
    maxWidth = '2xl',
}: PropsWithChildren<{
    open: boolean;
    setOpen: (open: boolean) => void;
    title?: any;
    maxWidth?:
        | 'xs'
        | 'sm'
        | 'md'
        | 'lg'
        | 'xl'
        | '2xl'
        | '3xl'
        | '4xl'
        | '5xl'
        | '6xl'
        | '7xl'
        | 'full';
}>) {
    const maxWidthClass = {
        xs: 'sm:max-w-xs',
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '5xl': 'sm:max-w-5xl',
        '6xl': 'sm:max-w-6xl',
        '7xl': 'sm:max-w-7xl',
        'full': 'sm:max-w-screen',
    }[maxWidth];
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <div className="fixed inset-0 bg-gray-900/20" />

            <div className="fixed left-0 right-0 bottom-0 top-2 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className={`pointer-events-auto w-screen ${maxWidthClass} transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700`}
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
                                <div className="px-4 sm:px-6 bg-gray-900 py-4">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-2xl font-semibold leading-6 text-gray-100">
                                            {title}
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="relative rounded-md  text-gray-200 hover:text-red-500 focus:outline-none focus:ring-0"
                                            >
                                                <XMarkIcon
                                                    aria-hidden="true"
                                                    className="h-8 w-8"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mt-6 flex-1">
                                    {children}
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
