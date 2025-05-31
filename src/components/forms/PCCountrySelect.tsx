/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select"; // import react-select
import CountryList from "react-select-country-list";

type TProps = {
  label: string;
  name: string;
  required?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  showSearch?: boolean;
  type?: "text" | "number" | "tel" | "email";
};

const PCCountrySelect = ({
  label,
  name,
  required = false,
  isDisabled = false,
  defaultValue,
  showSearch,
}: TProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [countryOptions, setCountryOptions] = useState<any>([]);

  useEffect(() => {
    const options = CountryList().getData();
    setCountryOptions(options);
  }, []);

  // Watch the selected value in the form
  const selectedCountry = watch(name);

  // Find the selected country option from the country options
  const selectedOption = countryOptions.find(
    (option: any) => option.value === selectedCountry
  );

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-lg font-medium text-darkGray lg:py-2"
      >
        {label} {required && <span className="text-coral">*</span>}{" "}
        <span>:</span>
      </label>

      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? "Country is required" : false,
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <div>
                <Select
                  {...field}
                  id={name}
                  isDisabled={isDisabled}
                  defaultValue={countryOptions.find(
                    (option: any) => option.value === defaultValue
                  )}
                  value={selectedOption} // Bind the selected option to the input
                  options={countryOptions}
                  placeholder="Select a country"
                  isSearchable={showSearch}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption?.value);
                    setValue(name, selectedOption?.value); // Update the form value when country is selected
                  }}
                  className= "text-gray-600 mt-1 lg:w-[80%] w-full block px-3 py-2 bg-lightCream border border-coral rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                />
              </div>
              {error && <p className="text-xs text-red-500">{error.message}</p>}
            </>
          );
        }}
      />
    </div>
  );
};

export default PCCountrySelect;
