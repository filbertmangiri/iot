import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { ComponentProps, forwardRef, LegacyRef } from "react";
import { twMerge } from "tailwind-merge";

type FloatingInputProps = ComponentProps<"div"> & {
    error?: string[];
};

function FloatingInput({
    children,
    className,
    error,
    ...props
}: FloatingInputProps) {
    return (
        <div>
            <div
                className={twMerge(
                    "transparent relative rounded-md border border-slate-400 px-3 py-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 dark:border-slate-600 dark:focus-within:border-indigo-500 dark:focus-within:ring-indigo-500",
                    error && "border-red-500 dark:border-red-400",
                    className
                )}
                {...props}
            >
                {children}

                {error && (
                    <div className="pointer-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500 dark:text-red-400"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

type FloatingInputFieldProps = ComponentProps<"input"> & {
    id: string;
};

function Field(
    {
        type = "text",
        className,
        id,
        autoComplete = "off",
        ...props
    }: FloatingInputFieldProps,
    ref?: LegacyRef<HTMLInputElement>
) {
    return (
        <input
            id={id}
            ref={ref}
            type={type}
            autoComplete={autoComplete}
            className={twMerge(
                "peer block w-full border-0 bg-transparent p-0 text-sm placeholder-transparent focus:ring-0",
                className
            )}
            placeholder=" " // This is a hack to make the label appear on top of the input
            {...props}
        />
    );
}

type FloatingInputLabelProps = ComponentProps<"label"> & {
    htmlFor: string;
    backgroundClassName: string;
};

function Label({
    children,
    className,
    backgroundClassName,
    htmlFor,
    ...props
}: FloatingInputLabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge(
                "absolute left-0 -top-0.5 mx-2 block w-fit -translate-y-1/2 text-black peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-500 cursor-text px-1 text-xs font-medium transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-black",
                className,
                backgroundClassName
            )}
            {...props}
        >
            {children}
        </label>
    );
}

FloatingInput.Field = forwardRef(Field);
FloatingInput.Label = Label;

export default FloatingInput;
