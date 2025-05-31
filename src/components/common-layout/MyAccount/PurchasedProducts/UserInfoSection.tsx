"use client";
import {
  useDeleteOwnProfileMutation,
  useGetOwnProfileQuery,
} from "@/redux/api/user/userApi";
import React from "react";
import { HiUserCircle } from "react-icons/hi";
import ShippingInfo from "./ShippingInfo";
import Link from "next/link";
import { toast } from "sonner";
import { logOutUser } from "@/services/actions/logoutUser";

const UserInfoSection = () => {
  const { data, isLoading } = useGetOwnProfileQuery("");
  const [deleteProfile, { isLoading: isDeleteLoading }] =
    useDeleteOwnProfileMutation();
  const profileInfo = data?.data;
  const name = profileInfo?.name || "N/A";
  const phone = profileInfo?.phone || "+1571XXXXXXX";
  const email = profileInfo?.email || "example@gmail.com";
  const shippingInfo = profileInfo?.shipping_info;

  // for shipping info props
  const shipping_info = {
    address_line: shippingInfo?.address_line,
    city: shippingInfo?.city,
    state: shippingInfo?.state,
    country: shippingInfo?.country?.name,
  };

  const deleteHandler = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const confirm_res = confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );

      if (!!confirm_res) {
        const response = await deleteProfile(null).unwrap();
        if (!!response?.success) {
          toast.success(response?.message, { id: toastId, duration: 3000 });
          logOutUser();
        } else {
          toast.error(response?.message, { id: toastId, duration: 3000 });
          console.log("Delete Profile Response:", response);
        }
      } else {
        toast.error("Action canceled", { id: toastId, duration: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: toastId, duration: 3000 });
    }
  };

  if (!!isLoading) {
    return (
      <div className="lg:w-[300px]  h-[55vh] p-4 lg:border-r border-r-coral animate-pulse ">
        <div className="mt-6 w-full mb-12">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-8"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4  mb-6"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-6"></div>
        </div>
        <div className="h-3 bg-gray-300 rounded mx-auto w-1/2 mb-6"></div>
        <div className="h-3 bg-gray-300 rounded mx-auto w-1/2 mb-6"></div>
      </div>
    );
  }
  return (
    <div className="lg:w-[300px] p-4 lg:border-r border-r-coral">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="mt-6 w-full space-y-4 mb-12">
          <div>
            <div className="flex justify-center">
              <HiUserCircle className="w-24 h-24 text-darkGray" />
            </div>
            <p className="text-sm text-darkGray">Name:</p>
            <p className="font-medium">{name}</p>
          </div>

          <div>
            <p className="text-sm text-darkGray">Phone:</p>
            <p className="font-medium text-xs">{phone}</p>
          </div>

          <div className="">
            <p className="text-sm text-darkGray">Email:</p>
            <p className="font-medium text-sm break-words">{email}</p>
          </div>
        </div>

        {!!shippingInfo && (
          <ShippingInfo name={name} shippingInfo={shipping_info} />
        )}

        <div>
          <Link href={`/my-account/profile`}>
            <button className="w-full mt-8 bg-lightCream border border-coral text-darkGray py-2 rounded">
              Edit
            </button>
          </Link>

          <button
            onClick={() => deleteHandler()}
            disabled={isDeleteLoading}
            className="w-full mt-4 border border-coral text-coral py-2 rounded hover:bg-coral hover:text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;
