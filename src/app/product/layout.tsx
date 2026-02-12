import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default LandingLayout;
