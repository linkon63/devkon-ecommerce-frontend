/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import { AuthKey } from "@/constants";
import { useSendOtpMutation } from "@/redux/api/email/emailApi";
// import { setToLocalStorage } from "@/services/local-storage/local-storage";
import { TSendOtpPayload } from "@/types/emailType";
import React, { Dispatch, SetStateAction } from "react";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";

type TProps = {
  setStep: Dispatch<SetStateAction<number>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
  setTrxnId: Dispatch<SetStateAction<string | null>>;
  email: string | null;
};

const Step1 = ({ setStep, setEmail, setTrxnId, email }: TProps) => {
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    if (!email) {
      return toast.error("Please provide your email.", {
        id: toastId,
        duration: 3000,
      });
    }

    const data: TSendOtpPayload = {
      email,
    };

    try {
      const res = await sendOtp(data).unwrap();

      if (res?.success) {
        console.log(res);
        const trxnId = res?.data?.trxnId;
        setTrxnId(trxnId);
        toast.success(res?.message, { id: toastId, duration: 2000 });
        // setToLocalStorage(AuthKey?.ACCESS_TOKEN, access_token);
        setStep(2);
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9E7]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#FBE4D4] rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-coral">Join Us</h2>
          <p className="mt-2 text-gray-600">
            Enter your email to receive an OTP
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-coral" />
            </div>
            <input
              type="email"
              // value={email}
              onChange={(e) => setEmail(e?.target?.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-coral hover:bg-coral text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step1;
