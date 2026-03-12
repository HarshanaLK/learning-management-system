import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from "react";

export default forwardRef(function TextArea(
    {
        className = "",
        isFocused = false,
        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            ref={localRef}
            className={
                'border-0.5 w-full rounded-md border-gray-300 shadow-sm outline-transparent ring-transparent focus:border-primary-500 focus:outline-transparent focus:ring-transparent' +
                className
            }
        >
            {props.value}
        </textarea>
    );
});
