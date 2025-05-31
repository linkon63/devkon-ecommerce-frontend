import SidebarSection from "@/components/common-layout/Products/shopping-cart/SideBarSection";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <SidebarSection />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
