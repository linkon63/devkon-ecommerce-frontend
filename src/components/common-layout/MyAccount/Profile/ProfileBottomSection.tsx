"use client";

import { useDeleteOwnProfileMutation } from "@/redux/api/user/userApi";
import { logOutUser } from "@/services/actions/logoutUser";
import { toast } from "sonner";

const ProfileBottomSection = () => {
  const [deleteProfile, { isLoading }] = useDeleteOwnProfileMutation();

  const deleteHandler = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const confirm_res = confirm(
        "Are you sure you want to delete your account?"
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
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:justify-between justify-between items-end pt-4">
      <div className="lg:mt-0 mt-6 text-center lg:text-left">
        <div className="mb-6 md:mb-8 lg:mb-10">
          <h1 className="font-bold">Delete your account</h1>
          <p>
            Permanently delete your account and all of your data will be
            removed.
          </p>
        </div>
        <button
          type="button"
          disabled={isLoading}
          className="w-44 py-2 border border-gray-300 text-coral font-bold rounded-md hover:bg-darkGray hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          onClick={() => deleteHandler()}
        >
          Delete Account
        </button>
      </div>
      <div>
        <button
          type="button"
          className="w-44 py-2 border border-gray-300 text-coral font-bold rounded-md hover:bg-darkGray hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          onClick={() => logOutUser()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileBottomSection;
