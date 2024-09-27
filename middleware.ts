import { NextRequest, NextResponse } from "next/server";
import { protectRout } from "./actions/authenicate";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);

  const absolutePath = url.pathname;
  //   console.log(absolutePath);
  const token = req.cookies.get("auth")?.value;
  //   console.log(token, "from middle");
  if (token) {
    return await protectRout(token, absolutePath);
  } else {
    if (absolutePath !== "/login") {
      return NextResponse.redirect("http://localhost:3000/login?mode=signin");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/account", "/dashboard", "/account/pm"],
};
