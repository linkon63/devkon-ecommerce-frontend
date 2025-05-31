"use server";

import { cookies } from "next/headers";

export const deleteCookie = async (key: string) => {
  return (await cookies()).delete(key);
};
