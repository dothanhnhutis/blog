import UserLayout from "@/components/Layouts/UserLayout";
import React from "react";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <UserLayout>{children}</UserLayout>;
};

export default PrivateLayout;
