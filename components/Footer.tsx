import Link from "next/link";
import React from "react";
import { FaTelegram, FaInstagram, FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <hr className="  mt-40 mb-10" />
      <div className="md:flex h-[500px] justify-evenly items-center text-center">
        <div className="flex-1 text-center">
          <h1 className="text-center text-xl md:text-4xl">ارتباطات</h1>
          <Link
            className="block m-8 hover:bg-white/10 w-fit mx-auto rounded "
            href={""}
          >
            بلاگ
          </Link>
          <Link
            className="block m-8 hover:bg-white/10 w-fit mx-auto rounded "
            href={""}
          >
            گالری
          </Link>
          <Link
            className="block m-8 hover:bg-white/10 w-fit mx-auto rounded "
            href={""}
          >
            سوال و جواب
          </Link>
        </div>
        <div className="flex-col flex-1  text-center">
          <h1 className="text-xl md:text-4xl mb-10">شبکه های اجتماعی</h1>
          <a href="">
            <FaTelegram className="mx-auto  mb-2 mt-1 w-5 h-5 md:mb-5 md:mt-2 md:w-10 md:h-10" />
          </a>
          <a href="">
            <FaInstagram className="mx-auto mb-2 mt-1 w-5 h-5 md:mb-5 md:mt-2 md:w-10 md:h-10 " />
          </a>
          <a href="">
            {" "}
            <FaWhatsapp className="mx-auto  mb-2 mt-1 w-5 h-5 md:mb-5 md:mt-2 md:w-10 md:h-10 " />
          </a>
        </div>
        <div className="flex-1 text-xl mt-5">All Right Reserved</div>
      </div>
    </>
  );
};

export default Footer;
