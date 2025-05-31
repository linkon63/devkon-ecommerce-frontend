/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AuthKey } from "@/constants";
import { useVerifyOtpMutation } from "@/redux/api/email/emailApi";
import { userSignIn } from "@/services/actions/userSignIn";
import { setToLocalStorage } from "@/services/local-storage/local-storage";
import { TVerifyOtpPayload } from "@/types/emailType";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

type TProps = {
  setStep: Dispatch<SetStateAction<number>>;
  email: string | null;
  trxnId: string | null;
};

const Step2 = ({ setStep, email, trxnId }: TProps) => {
  const [timer, setTimer] = useState(300); // Timer for 60 seconds
  const [progressLines, setProgressLines] = useState([0, 0, 0, 0, 0, 0]);
  const [otp, setOtp] = useState<number | null>(null);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    if (!email) {
      return toast.error("Email couldn't found!", {
        id: toastId,
        duration: 3000,
      });
    }

    if (!trxnId) {
      return toast.error("Transaction id couldn't found!", {
        id: toastId,
        duration: 3000,
      });
    }
    if (!otp) {
      return toast.error("Please provide Valid OTP.", {
        id: toastId,
        duration: 3000,
      });
    }

    const data: TVerifyOtpPayload = {
      email,
      trxnId,
      otp: otp.toString(),
    };

    const loginPayload = {
      email,
      trxnId,
    };

    try {
      const res = await verifyOtp(data).unwrap();
      console.log({ otp_verify_res: res }); // OK

      if (res?.success) {
        const login_info = await userSignIn(loginPayload);
        console.log({ login_res: login_info });
        if (login_info?.success) {
          const access_token = login_info?.data?.accessToken;
          toast.success(login_info?.message, { id: toastId, duration: 2000 });
          setToLocalStorage(AuthKey.ACCESS_TOKEN, access_token);
          setStep(1);
        } else {
          toast.error(login_info?.message, { id: toastId, duration: 3000 });
        }
      } else {
        console.log(res);
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, { id: toastId, duration: 3000 });
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Decrease timer every second

      // Fill one line every 10 seconds, starting from the left
      if (timer % 10 === 0 && timer !== 0) {
        setProgressLines((prev) => {
          const newProgress = [...prev];
          const index = Math.floor(timer / 10) - 6; // Corrected index to fill lines from left to right
          const absIndex = Math.abs(index);
          if (absIndex >= 0 && absIndex < 6) {
            newProgress[absIndex] = 1; // Fill this line
          }
          return newProgress;
        });
      }

      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [timer]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9E7]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#FBE4D4] rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-coral">Enter OTP</h2>
          <p className="mt-2 text-darkGray">OTP timer: {timer}s</p>
        </div>

        <div className="flex justify-between mt-8">
          {progressLines.map((line, index) => (
            <div
              key={index}
              className={`w-8 h-2 rounded-lg border border-gray-300 ${
                line === 1
                  ? "transition-all bg-coral duration-[15000ms] "
                  : "bg-white"
              }`}
            ></div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative">
            <input
              type="number"
              onChange={(e) => setOtp(Number(e?.target?.value))}
              className="block text-center w-full pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47458] focus:border-transparent"
              placeholder="Enter OTP"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#F47458] text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            Submit OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step2;
