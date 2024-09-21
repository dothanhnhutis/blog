import React from "react";
import Footer from "./footer";
import Header from "./header";

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default CompanyLayout;
