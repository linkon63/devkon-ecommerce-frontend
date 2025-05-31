"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  label: string;
  type?: "text" | "number" | "tel" | "email";
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  readonly?: boolean;
};

const PCInput = ({
  label,
  type = "text",
  name,
  placeholder,
  defaultValue,
  required = false,
  readonly = false,
}: TProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label
            htmlFor={name}
            className="block text-lg font-medium text-darkGray lg:py-2"
          >
            {label} {required && <span className="text-coral">*</span>}{" "}
            <span>:</span>
          </label>

          <input
            {...field}
            className={`${
              readonly && "text-gray-600"
            } mt-1 lg:w-[80%] w-full block px-3 py-2 bg-lightCream border border-coral rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent`}
            type={type}
            id={name}   
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            readOnly={readonly}
          />
          {error && <p className="text-xs text-red-500">{error?.message}</p>}
        </div>
      )}
    />
  );
};

export default PCInput;
