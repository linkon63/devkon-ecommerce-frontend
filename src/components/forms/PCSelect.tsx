"use client";

import { Controller, useFormContext } from "react-hook-form";

type TItems = {
  value: string;
  label: string;
};

type TSelectProps = {
  name: string;
  label?: string;
  options: TItems[];
  required?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  readonly?: boolean;
};

const PCSelect = ({
  name,
  label,
  options = [],
  required,
  isDisabled,
  defaultValue,
  readonly = false,
}: TSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name} // Ensure this is a unique field name
      // defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label
            htmlFor={name}
            className="block text-lg font-medium text-darkGray lg:py-2"
          >
            {label} {required && <span className="text-coral">*</span>}{" "}
            <span>:</span>
          </label>

          <select
            className={`${
              readonly && "text-gray-600"
            } mt-1 lg:w-[80%] w-full block px-3 py-2 bg-lightCream border border-coral rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent`}
            {...field}
            id={name}
            value={field?.value || defaultValue}
            name={name}
            disabled={isDisabled}
          >
            <option value="">Select One</option>
            {options.map((item) => (
              <option id={name} key={item?.value} value={item.value}>
                {item?.label}
              </option>
            ))}
          </select>
          {error && <p className="text-xs text-red-500">{error?.message}</p>}
        </div>
      )}
    />
  );
};

export default PCSelect;
