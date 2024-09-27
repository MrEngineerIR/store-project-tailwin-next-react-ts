"use server";

import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(
  "1bb3cd940c69c8a1d5cce35b6979f944c5c75aa5819f504c5c63444211f87d80"
);

const protectRout = async (jwt: string, path: string) => {
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);

    if (path === "/login") {
      return NextResponse.redirect("http://localhost:3000");
    }
    if (path === "/dashboard") {
      if (!payload.isAdmin) {
        return NextResponse.redirect("http://localhost:3000");
      }
    }
    return NextResponse.next();
  } catch (error: any) {
    console.log(error.message);
    const response = NextResponse.redirect(
      "http://localhost:3000/login?mode=signup"
    );
    response.cookies.delete("auth");
    return response;
  }
};
const getUser = async () => {
  try {
    const token = cookies().get("auth")?.value;
    if (!token) {
      return undefined;
    }
    const { payload, protectedHeader } = await jose.jwtVerify(token!, secret);

    return {
      email: payload.email as string,
      isAdmin: payload.isAdmin as boolean,
    };
  } catch (error: any) {
    return undefined;
  }
};

export { protectRout, getUser };
