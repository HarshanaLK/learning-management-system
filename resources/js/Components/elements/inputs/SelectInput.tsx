import Select from "react-select";
import makeAnimated from "react-select/animated";

interface SelectInputProps {
    options: { label: string; value: string }[];
    isFocused?: boolean;
    className?: string;
    selectedOption?: any;
    setData?: any;
    isClearable?: boolean;
    isSearchable?: boolean;
    isDisabled?: boolean;
    placeholder?: string;
}

const SelectInput = ({
    options,
    selectedOption,
    className = "",
    isFocused = false,
    isDisabled,
    setData,
    isClearable=true,
    isSearchable=true,
    placeholder,
    ...props
}: SelectInputProps) => {
    const animatedComponents = makeAnimated();

    const handleChange = (selectedOption: any) => {
        setData(selectedOption.value);
    };

    return (
        <Select
            className={` ${className} rounded !border-2 !border-transparent !outline-transparent !ring-transparent`}
            value={selectedOption}
            onChange={handleChange}
            options={options}
            isDisabled={isDisabled}
            isSearchable={isSearchable}
            placeholder={placeholder}
            isClearable={isClearable}
            components={animatedComponents}
        />
    );
};

export default SelectInput;


