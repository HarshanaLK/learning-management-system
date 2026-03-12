import React from 'react';
import { useForm } from '@inertiajs/react';

const EditModule = ({
    course,
    module,
    onCancel
}:
    {
        course: any;
        module: any;
        onCancel: () => void;

    }) => {
    const { data, setData, put, processing, errors } = useForm({
        module_title: module.module_title,
        order: module.order,
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('course.modules.update', [course.id, module.id]),{
            onSuccess: () => {
                onCancel();
            },
        });;

    };


    return (
        <div className="px-2">
            <h2 className="text-xl font-semibold mb-4">
                Edit Module
            </h2>
            <p className='pb-6 text-base font-normal'>Add your module name here</p>
            <form onSubmit={handleSubmit}>
                <div className='mb-20 '>
                    <label htmlFor="module_title" className="block font-medium text-base">
                        Name
                    </label>
                    <input
                        type="text"
                        id="module_title"
                        name="module_title"
                        value={data.module_title}
                        onChange={(e) => setData('module_title', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.module_title && <p className="text-red-500 text-xs mt-1">{errors.module_title}</p>}
                </div>

                <div className="flex items-center justify-end space-x-4 pb-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="sm:px-8 px-4 py-2 border-2 text-base font-medium border-[#0470B0] text-[#0470B0] rounded-full hover:border-[#004AAD] hover:text-[#004AAD]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`sm:px-8 px-4 py-2 border-2 text-base font-medium bg-[#0470B0] border-[#0470B0] rounded-full hover:bg-[#004AAD] hover:border-[#004AAD] text-white  ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {processing ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditModule;
