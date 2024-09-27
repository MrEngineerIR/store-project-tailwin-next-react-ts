import Image from "next/image";
import hero from "@/public/images/hero.jpg";
import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";

const Gallery = () => {
  return (
    <div className="mt-20 ">
      <h1 className="text-6xl font-bold text-center mb-10">Gallary</h1>

      <div className="grid grid-rows-2 grid-cols-2 w-[80%] mx-auto  rounded-2xl p-2 gap-2">
        <Image
          alt="car"
          className="bg-center bg-cover rounded hover:scale-[2.5] md:hover:scale-110 hover:-translate-x-20 transition-transform duration-500 md:hover:rotate-[4deg] hover:z-30"
          src={hero.src}
          width={1024}
          height={1024}
        />
        <Image
          alt="car"
          className="bg-center bg-cover rounded hover:scale-[2.5] md:hover:scale-110 hover:translate-x-20 transition-transform duration-500 md:hover:-rotate-[4deg] hover:z-30"
          src={hero1.src}
          width={1024}
          height={1024}
        />
        <Image
          alt="car"
          className="bg-center bg-cover rounded hover:scale-[2.5] md:hover:scale-110 hover:-translate-x-20 transition-transform duration-500 md:hover:-rotate-[4deg] hover:z-30"
          src={hero2.src}
          width={1024}
          height={1024}
        />
        <Image
          alt="car"
          className="bg-center bg-cover hover:scale-[2.5] hover:translate-x-20 md:hover:scale-110 transition-transform duration-500 md:hover:rotate-[4deg] hover:z-30"
          src={hero3.src}
          width={1024}
          height={1024}
        />
      </div>
    </div>
  );
};

export default Gallery;
