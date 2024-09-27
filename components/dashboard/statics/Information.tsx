"use server";
import { User } from "@/models/User";
import React from "react";
import connectDB from "@/database/connectDB";
import { UserSignup } from "./UserSignup";
const jalaali = require("jalaali-js");

const Information = async () => {
  await connectDB();
  const user = await User.find({});
  const jalaaliData = user.map((item: UserType) => {
    return jalaali.toJalaali(
      item.createdAt?.getFullYear(),
      item.createdAt!.getMonth() + 1,
      item.createdAt?.getDate()
    );
  });
  const monthData: number[] = [];
  for (let index = 1; index < 13; index++) {
    const data = jalaaliData.filter((item) => item.jm === index);
    monthData.push(data.length);
  }
  
  return (
    <div className=" w-full h-full flex items-center justify-end p-2">
      <div>
        <UserSignup monthData={monthData} />
      </div>
    </div>
  );
};

export default Information;
