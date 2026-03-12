import React, { useState } from 'react';
import { IoAddCircleSharp, IoRemoveCircleSharp } from 'react-icons/io5';

interface DynamicListProps {
    label: string;
    placeholder: string;
    data: string[];
    onChange: (updatedList: string[]) => void;
}

const DynamicList: React.FC<DynamicListProps> = ({ label, placeholder, data, onChange }) => {
    const [items, setItems] = useState(data);
    const [errors, setErrors] = useState<string[]>([]); // For storing error messages for each item

    const MAX_LENGTH = 255; // Character limit

    const handleAddItem = () => {
        setItems([...items, ""]);
        setErrors([...errors, ""]); // Add an empty error message for the new item
    };

    const handleUpdateItem = (index: number, value: string) => {
        const updatedItems = [...items];
        const updatedErrors = [...errors];

        // Update the item value
        updatedItems[index] = value;

        // Check for character limit violation
        if (value.length > MAX_LENGTH) {
            updatedErrors[index] = `Maximum length of ${MAX_LENGTH} characters exceeded.`;
        } else {
            updatedErrors[index] = ""; // Clear error if within limit
        }

        setItems(updatedItems);
        setErrors(updatedErrors);
        onChange(updatedItems); // Pass the updated list to the parent
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        const updatedErrors = errors.filter((_, i) => i !== index);
        setItems(updatedItems);
        setErrors(updatedErrors); // Remove the corresponding error message
        onChange(updatedItems); // Pass the updated list to the parent
    };

    return (
        <div className="mb-4">
            <label className="block text-base font-normal">{label}</label>
            {items.map((item, index) => (
                <div key={index} className="mb-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className={`mt-1 p-2 border-[#CCCCCC] rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors[index] ? "border-red-500" : ""
                            }`}
                            placeholder={placeholder}
                            value={item}
                            onChange={(e) => handleUpdateItem(index, e.target.value)}
                        />
                        <button
                            type="button"
                            className="text-red-500 text-sm hover:text-red-600"
                            onClick={() => handleRemoveItem(index)}
                        >
                            <div className="flex items-center">
                                <IoRemoveCircleSharp className="pr-1 text-2xl" />
                                Remove
                            </div>
                        </button>
                    </div>
                    {errors[index] && (
                        <p className="text-sm text-red-500">{errors[index]}</p>
                    )}
                </div>
            ))}

            <button
                type="button"
                className="mt-2 px-2 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                onClick={handleAddItem}
            >
                <div className="flex items-center">
                    <IoAddCircleSharp className="pr-1 text-xl" />
                    Add Item
                </div>
            </button>
        </div>
    );
};

export default DynamicList;
