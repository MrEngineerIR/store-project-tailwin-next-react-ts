import React from "react";
import defaultProfile from "@/public/images/defalutLogo.jpg";
import { getUser } from "@/actions/authenicate";
import { User } from "@/models/User";

const AccountInfo = async () => {
  const user = await getUser();
  const userDate: UserType | null = await User.findOne({ email: user?.email });

  return (
    <div className="m-10">
      <div className="flex justify-center items-center">
        <img
          className=" w-16 h-16 rounded-full  cursor-pointer"
          src={defaultProfile.src}
          alt="profile"
        ></img>
      </div>

      <div className=" mt-10">
        <span>ایمیل : </span>{" "}
        <span className="hover:bg-white/25 rounded">{userDate?.email}</span>
      </div>
      <div className="mt-2">
        <button className="block mb-2 hover:bg-green-600/60 rounded bg-sky-600 p-1">
          تغییر رمز عبور
        </button>
        <div className="bg-white/10 rounded w-full h-fit space-y-5 p-2 ">
          <div>
            <label htmlFor="oldPass">رمز قدیمی</label>
            <input
              type="password"
              name="oldPass"
              autoFocus
              className="bg-white/5 mr-1 rounded caret-white pr-2 backdrop-blur-sm"
            />
          </div>
          <div>
            <label htmlFor="oldPass">رمز جدید</label>
            <input
              type="password"
              name="newPass"
              autoFocus
              className="bg-white/5 mr-1 rounded caret-white pr-2 backdrop-blur-sm"
            />
          </div>
          <div>
            <label htmlFor="oldPass">رمز جدید</label>
            <input
              type="password"
              name="confirmPass"
              autoFocus
              className="bg-white/5 mr-1 rounded caret-white pr-2 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
