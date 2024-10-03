import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return <DefaultLayout>{children}</DefaultLayout>;
};

export default CompanyLayout;
