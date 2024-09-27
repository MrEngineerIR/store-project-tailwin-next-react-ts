import Auth from "@/components/Auth";

const page = ({ searchParams }: any) => {
  return <Auth loginMode={searchParams.mode} />;
};

export default page;
