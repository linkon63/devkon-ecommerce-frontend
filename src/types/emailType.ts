export type TVerifyOtpPayload = {
  email: string;
  trxnId: string;
  otp: string;
};

export type TSendOtpPayload = {
  email: string;
};
