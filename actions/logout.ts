"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logout = async () => {
  cookies().delete("auth");
  redirect("/login?mode=signin");
};

export { logout };
