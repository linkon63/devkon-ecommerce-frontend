"use client";
import PCForm from "@/components/forms/PCForm";
import PCInput from "@/components/forms/PCInput";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetOwnProfileQuery,
  useUpdateOwnProfileMutation,
} from "@/redux/api/user/userApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import { profileValidationSchema } from "./validation-schema/validations";
import PCCountrySelect from "@/components/forms/PCCountrySelect";
import { toast } from "sonner";
import PCPhoneInput from "@/components/forms/PCPhoneInput";

const ProfileFormSection = () => {
  const { data, isLoading } = useGetOwnProfileQuery("");
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateOwnProfileMutation();
  const profile_data = data?.data;
  const shipping_data = profile_data?.shipping_info;

  const buyer_data = {
    name: profile_data?.name,
    email: profile_data?.email,
    phone: profile_data?.phone,
  };

  const shipping_info_data = {
    countryId: shipping_data?.countryId,
    state: shipping_data?.state,
    city: shipping_data?.city,
    address_line: shipping_data?.address_line,
  };

  const default_values = {
    buyer: filterUndefinedValues(buyer_data),
    ...(shipping_data && {
      shipping_info: filterUndefinedValues(shipping_info_data),
    }),
  };

  console.log(default_values);

  const submitHandler: SubmitHandler<FieldValues> = async (values) => {
    const { buyer, shipping_info } = values;

    const payload = {
      buyer: filterUndefinedValues(buyer),
      shipping_info: filterUndefinedValues(shipping_info),
    };
    console.log({ payload });
    const toastId = toast.loading("Please wait...");
    try {
      const response = await updateProfile(payload).unwrap();

      if (!!response?.success) {
        toast.success(response?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(response?.message, { id: toastId, duration: 3000 });
        console.log("Update Profile Response:", response);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: toastId, duration: 3000 });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 mt-10 w-[50%]">
        {/* Skeleton Loader */}
        <div className=" w-24 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className=" w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
        <div className=" w-24 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className=" w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
        <div className=" w-24 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
        <div className=" w-24 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className=" w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
        <div className=" w-24 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
        <div className=" w-24 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div>
      {/* className="lg:space-y-6 space-y-2" */}
      <PCForm
        onSubmit={submitHandler}
        resolver={zodResolver(profileValidationSchema)}
        defaultValues={default_values}
      >
        <div className="lg:w-[70%] overflow-hidden lg:p-5 space-y-3">
          <PCInput
            label="Name"
            name="buyer.name"
            placeholder="Enter your name"
            required
          />
          <PCInput
            label="Email"
            type="email"
            name="buyer.email"
            placeholder="Enter your valid email"
            required
            readonly
          />

          <PCPhoneInput
            name="buyer.phone"
            label="Phone"
            type="text"
            required
          />

          <PCCountrySelect
            label="Country"
            name="shipping_info.countryId"
            required
          />
          <PCInput
            label="State"
            type="text"
            name="shipping_info.state"
            placeholder="Enter your state"
            required
          />

          <PCInput
            label="City"
            type="text"
            name="shipping_info.city"
            placeholder="Enter your city"
            required
          />

          <PCInput
            label="Address Line"
            type="text"
            name="shipping_info.address_line"
            placeholder="Enter your address line 1"
            required
          />
        </div>

        <div className="flex justify-end lg:py-0 py-10">
          <button
            type="submit"
            className="w-28 py-2  bg-coral text-white rounded-md hover:bg-lightCream hover:text-coral hover:font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={isUpdateProfileLoading}
          >
            Save
          </button>
        </div>
      </PCForm>
    </div>
  );
};

export default ProfileFormSection;
