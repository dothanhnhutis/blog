import React from "react";
import AdminLayout from "@/components/Layouts/AdminLayout";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default PrivateLayout;
