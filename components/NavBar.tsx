"use client";
import { FaCar } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import defaultLogo from "@/public/images/defalutLogo.jpg";
import { getUser } from "@/actions/authenicate";
import { logout } from "@/actions/logout";
import { BiBasket } from "react-icons/bi";
import { BarLoader, ClipLoader, MoonLoader, RiseLoader } from "react-spinners";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [user, setCurrentUser] = useState<
    { email: string; isAdmin: boolean } | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    async function setUser() {
      const user = await getUser();
      if (user) {
        setCurrentUser(user);
      }
      setIsLoading(false);
    }
    setUser();
  }, []);

  async function handleLogout() {
    await logout();
  }

  function handleProfileClick() {
    setIsProfileOn((prev) => !prev);
  }
  return isLoading ? (
    <div className="flex justify-center">
      <BarLoader />
    </div>
  ) : (
    <div className="flex items-center justify-between bg-sky-950 min-w-full max-w-fit h-30 px-2 ">
      <div className="sm:flex items-center gap-x-2 hidden">
        <FaCar className="w-10 h-10" />
        <Link href={"/"}>تیزرو</Link>
      </div>
      <div className="flex items-center gap-x-4 mx-auto sm:mx-0 py-4">
        <Link
          className={`${
            user ? undefined : "hidden"
          } hover:bg-white/10 p-2 rounded bg-white/5 `}
          href={"/card"}
        >
          <BiBasket />
        </Link>
        <div
          className={`${
            path === "/products" ? "hidden" : "block"
          } hover:bg-white/5 mx-auto text-center bg-white/5 rounded p-1`}
        >
          <Link href={"/products"}>محصولات</Link>
        </div>
        <div
          className={`${
            user ? "hidden sm:block" : undefined
          } bg-white w-[1px] h-4`}
        ></div>
        <div
          className={`${
            user ? undefined : "hidden"
          } bg-white/5 rounded flex items-center h-10`}
        >
          <div className="h-full bg-white/10 hidden sm:block  content-center p-1">
            <p>{user?.email}</p>
          </div>
          <div
            className={`${
              user?.isAdmin ? " hidden sm:block" : "hidden"
            } hover:bg-sky-700/40 rounded p-1 h-full content-center`}
          >
            <Link href={"/dashboard"}>داشبورد</Link>
          </div>
        </div>
        <div
          className={`${
            user ? "hidden sm:block" : "hidden"
          } bg-white w-[1px] h-4`}
        ></div>

        <Link
          href={"/login?mode=signin"}
          className={`${
            user ? "hidden" : undefined
          } hover:bg-white/10  rounded p-1 w-20 text-center h-full `}
        >
          ورود
        </Link>

        <div className="gap-x-2 relative z-30 cursor-pointer">
          <div
            className={`${user ? "block" : "hidden"} w-10 h-10`}
            onClick={handleProfileClick}
          >
            <Image
              className="rounded-full"
              src={defaultLogo.src}
              width={50}
              height={50}
              alt="profile"
            />
          </div>

          <div
            className={`${
              isProfileOn ? undefined : "hidden"
            } absolute left-[10%] top-[110%] bg-sky-900 w-40 p-2 flex-col rounded  [&>*]:mx-auto [&>*]:bg-white/5 [&>*]:w-full [&>*:hover]:bg-sky-800 [&>*]:p-1`}
          >
            <div className="text-sm block sm:hidden">{user?.email}</div>
            <button className="text-center" onClick={handleLogout}>
              خروج
            </button>
            <div
              className={`${
                user?.isAdmin ? undefined : "hidden"
              } hover:bg-sky-700/40 rounded p-1 h-full content-center text-center `}
            >
              <Link href={"/dashboard"}>داشبورد</Link>
            </div>
            <div className="text-center">
              <Link href={"/account"}>حساب کاربری</Link>
            </div>

            {user?.isAdmin ? undefined : (
              <div hidden={user?.isAdmin} className="text-center">
                <Link href={"/account/pm"}>پیام به پشتیبانی</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
