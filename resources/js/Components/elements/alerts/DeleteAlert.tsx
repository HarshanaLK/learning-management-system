import React from 'react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirmDelete }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-10 w-[450px] shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center mb-4 -mt-16">
                    <svg width="50"
                        onClick={onClose}
                        height="50"
                        className='cursor-pointer'
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="50" fill="#EB001B" />
                        <path d="M54.6374 49.9979L67.6257 37.0096C68.2421 36.3943 68.5888 35.5593 68.5896 34.6883C68.5904 33.8173 68.2451 32.9817 67.6298 32.3653C67.0144 31.7488 66.1794 31.4021 65.3085 31.4013C64.4375 31.4006 63.6019 31.7458 62.9854 32.3612L49.9972 45.3494L37.0089 32.3612C36.3924 31.7447 35.5564 31.3984 34.6846 31.3984C33.8129 31.3984 32.9768 31.7447 32.3604 32.3612C31.744 32.9776 31.3977 33.8136 31.3977 34.6854C31.3977 35.5571 31.744 36.3932 32.3604 37.0096L45.3487 49.9979L32.3604 62.9862C31.744 63.6026 31.3977 64.4386 31.3977 65.3104C31.3977 66.1821 31.744 67.0182 32.3604 67.6346C32.9768 68.251 33.8129 68.5973 34.6846 68.5973C35.5564 68.5973 36.3924 68.251 37.0089 67.6346L49.9972 54.6463L62.9854 67.6346C63.6019 68.251 64.4379 68.5973 65.3097 68.5973C66.1814 68.5973 67.0175 68.251 67.6339 67.6346C68.2503 67.0182 68.5966 66.1821 68.5966 65.3104C68.5966 64.4386 68.2503 63.6026 67.6339 62.9862L54.6374 49.9979Z" fill="white" />
                    </svg>
                </div>
                <h2 className="text-center text-xl font-semibold mb-2">Are you sure you want to remove this?</h2>
                <p className="text-center text-gray-600 mb-8 mt-6">
                    This action cannot be undone and all associated data will be lost.
                </p>
                <div className="flex justify-center space-x-2 mb-2 ">
                    <button
                        onClick={onClose}
                        className="px-5 py-1 bg-white text-base font-medium border border-red-500 text-red-500 rounded-full hover:bg-red-50"
                    >
                        No, Keep it
                    </button>
                    <button
                        onClick={onConfirmDelete}
                        className="px-5 py-1 bg-red-500 text-base font-medium text-white rounded-full hover:bg-red-600"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
