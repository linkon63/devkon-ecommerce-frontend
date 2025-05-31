/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AuthKey } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessTokenIntoCookie = async (token: string, option?: any) => {
  if (!token) {
    return null;
  }

  (await cookies()).set(AuthKey?.ACCESS_TOKEN, token);

  if (option && option?.redirect) {
    redirect(option?.redirect);
  }
};

export default setAccessTokenIntoCookie;
