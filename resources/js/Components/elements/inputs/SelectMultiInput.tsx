import React, {useEffect} from 'react';
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface SelectMultiInputProps {
    options: { label: string; value: string }[];
    isFocused?: boolean;
    className?: string;
    selectedOption?:any;
    setData?:any;
}

const SelectMultiInput = ({
    options,
    selectedOption,
    className = "",
    isFocused = false,
    setData,
    ...props
}: SelectMultiInputProps) => {
    const animatedComponents = makeAnimated();

    const handleChange = (selectedOption: any) => {
        const array: any = [];
        selectedOption.map((item: any) => {
            array.push(item.value);
        });

        setData(array);
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            components={animatedComponents}
            isMulti
        />
    );
};

export default SelectMultiInput;
