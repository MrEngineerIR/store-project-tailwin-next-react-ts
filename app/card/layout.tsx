import NavBar from "@/components/NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default layout;
