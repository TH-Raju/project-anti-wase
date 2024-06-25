

const NavbarPublic = React.lazy(
  () => import("@/components/shared/Headers/Navbar/NavbarPublic")
);
const Footer = React.lazy(() => import("@/components/Home/Footer"));


import React, { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <div className="">

      <div className="sticky -top-[0rem]   lg:-top-[0.3rem] z-40">
        <NavbarPublic />
      </div>
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
