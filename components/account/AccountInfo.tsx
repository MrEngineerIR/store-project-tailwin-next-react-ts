import React from "react";
import defaultProfile from "@/public/images/defalutLogo.jpg";
import { getUser } from "@/actions/authenicate";
import { User } from "@/models/User";

const AccountInfo = async () => {
  const user = await getUser();
  const userDate: UserType | null = await User.findOne({ email: user?.email });

  return (
    <div className="p-4 bg-white/10 rounded h-full ">
      <div className="flex justify-center items-center">
        <img
          className="w-16 h-16 rounded-full cursor-pointer"
          src={defaultProfile.src}
          alt="profile"
        />
      </div>

      <div className="mt-10">
        <span>ایمیل : </span>
        <span className="hover:bg-white/25 rounded">{userDate?.email}</span>
      </div>

      <div className="mt-2">
        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
          <label htmlFor="oldPass" className="text-white/80">
            رمز قدیمی
          </label>
          <input
            type="password"
            id="oldPass"
            name="oldPass"
            autoFocus
            className="rounded backdrop-blur-sm p-2 border border-sky-800/40 focus:border-sky-800 focus:ring-2 focus:ring-sky-800/50 bg-white/10 text-white placeholder-white/40 outline-none transition-all"
            placeholder="••••••"
          />

          <label htmlFor="newPass" className="text-white/80">
            رمز جدید
          </label>
          <input
            type="password"
            id="newPass"
            name="newPass"
            className="rounded backdrop-blur-sm p-2 border border-sky-800/40 focus:border-sky-800 focus:ring-2 focus:ring-sky-800/50 bg-white/10 text-white placeholder-white/40 outline-none transition-all"
            placeholder="••••••"
          />

          <label htmlFor="confirmPass" className="text-white/80">
            تکرار رمز
          </label>
          <input
            type="password"
            id="confirmPass"
            name="confirmPass"
            className="rounded backdrop-blur-sm p-2 border border-sky-800/40 focus:border-sky-800 focus:ring-2 focus:ring-sky-800/50 bg-white/10 text-white placeholder-white/40 outline-none transition-all"
            placeholder="••••••"
          />
          <label htmlFor=""></label>
          <button className="rounded backdrop-blur-sm p-2 border border-sky-800/40 focus:border-sky-800 focus:ring-2 focus:ring-sky-800/50 bg-green-600/60 text-white placeholder-white/40 outline-none transition-all">
            تغییر رمز عبور
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
