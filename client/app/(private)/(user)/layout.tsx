import UserLayout from "@/components/Layouts/UserLayout";
import UserLayout1 from "@/components/Layouts/UserLayout1";
import React from "react";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <UserLayout1>{children}</UserLayout1>;
};

export default PrivateLayout;
