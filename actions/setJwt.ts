"use server";

import { User } from "@/models/User";
import { cookies } from "next/headers";
import * as jose from "jose";

const secret = new TextEncoder().encode(
  "1bb3cd940c69c8a1d5cce35b6979f944c5c75aa5819f504c5c63444211f87d80"
);
const setJWT = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error(
      "there isn't any user whit this email,we cant set a session"
    );
  }
  const token = await new jose.SignJWT({ email, isAdmin: user.isAdmin })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
  cookies().set("auth", token);
  //TODO make sure this send via a https in productin
};

export default setJWT;
