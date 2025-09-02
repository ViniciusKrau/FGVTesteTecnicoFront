export default function FormInput({
    label,
    id,
    type,
    required,
    step,
    min,
    max,
}: {
    label: string;
    id: string;
    type: string;
    required?: boolean;
    step?: string;
    min?: string;
    max?: number;
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={id}
                    type={type}
                    required={required}
                    step={step}
                    min={min}
                    max={max}
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                />
            </div>
        </div>
    );
}
