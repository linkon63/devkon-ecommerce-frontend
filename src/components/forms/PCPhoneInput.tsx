/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

type TProps = {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultCountry?: string | any;
  readonly?: boolean;
  isDisable?: boolean;
  type?: "text" | "number" | "tel" | "email";
};

const PCPhoneInput = ({
  label,
  name,
  placeholder = "Enter phone number",
  required = false,
  defaultCountry = "US",
  readonly = false,
  isDisable = false,
  type = "text",
}: TProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) => {
          if (!value) return required ? "Phone number is required" : true;
          if (!isValidPhoneNumber(value)) return "Invalid phone number";
          return true;
        },
      }}
      render={({ field, fieldState: { error } }) => {
        // console.log({ error });
        return (
          <>
            <div>
              <label
                htmlFor={name}
                className="block text-lg font-medium text-darkGray lg:py-2"
              >
                {label} {required && <span className="text-coral">*</span>}{" "}
                <span>:</span>
              </label>
              <PhoneInput
                {...field}
                id={name}
                type={type}
                defaultCountry={defaultCountry}
                disabled={isDisable}
                placeholder={placeholder}
                readOnly={readonly}
                international
                countryCallingCodeEditable={false}
                className={`${
                  readonly && "text-gray-600"
                } mt-1 lg:w-[80%] w-full block px-3 py-2 bg-lightCream border border-coral rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent`}
              />
              {error && <p className="text-xs text-red-500">{error.message}</p>}
            </div>
          </>
        );
      }}
    />
  );
};

export default PCPhoneInput;
