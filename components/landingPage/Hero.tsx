import heroImage from "@/public/images/hero5.jpeg";
import Image from "next/image";
const Hero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${heroImage.src})` }}
      className="w-full h-[600px] md:h-[800px]  bg-cover bg-no-repeat bg-center bg-fixed flex justify-center items-end gap-x-5"
    >
      <div className=" bg-black/20 w-20 h-20 md:w-40 md:h-40 md:text-4xl  text-2xl text-sky-300 mb-10 backdrop-blur-sm rounded-xl text-center  content-center animate-pulse delay-75">
        پر قدرت
      </div>
      <div className=" bg-black/20 w-20 h-20 md:w-40 md:h-40 md:text-4xl  text-2xl text-sky-300 mb-10  backdrop-blur-sm rounded-xl  text-center content-center animate-pulse">
        سریع
      </div>
      <div className=" bg-black/20  w-20 h-20 md:w-40 md:h-40 md:text-4xl text-2xl text-sky-300  mb-10 backdrop-blur-sm rounded-xl text-center content-center animate-pulse delay-150">
        زیبا
      </div>
    </div>
  );
};

export default Hero;
