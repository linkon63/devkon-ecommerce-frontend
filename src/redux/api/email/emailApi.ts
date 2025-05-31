import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { TSendOtpPayload, TVerifyOtpPayload } from "@/types/emailType";

const emailApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendOtp: build.mutation({
      query: (data: TSendOtpPayload) => ({
        url: `/email-service/send-otp`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes?.send_otp],
    }),
    verifyOtp: build.mutation({
      query: (data: TVerifyOtpPayload) => ({
        url: `/email-service/verify-otp`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes?.send_otp],
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = emailApi;
