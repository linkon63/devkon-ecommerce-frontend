/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { AuthKey } from "./constants";

const commonPrivateRoutes = ["/my-account"];

export async function middleware(request: NextRequest) {
  const { pathname } = request?.nextUrl;

  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/", request?.url));
  }

  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", request?.url));
  }

  const accessToken = (await cookies()).get(AuthKey.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request?.url));
  }

  let decodedData = null;

  if (!!accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  if (!decodedData) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    accessToken &&
    decodedData &&
    pathname?.includes(commonPrivateRoutes[0])
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// matcher
export const config = {
  matcher: ["/home", "/dashboard/:page*", "/my-account/:page*"],
};
