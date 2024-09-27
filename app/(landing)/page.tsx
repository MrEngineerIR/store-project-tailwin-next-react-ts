import Gallery from "@/components/landingPage/Gallery";
import Hero from "@/components/landingPage/Hero";
import TimeLine from "@/components/landingPage/TimeLine";

export default async function Home() {
  return (
    <>
      <Hero />
      <TimeLine />
      <Gallery />
    </>
  );
}
