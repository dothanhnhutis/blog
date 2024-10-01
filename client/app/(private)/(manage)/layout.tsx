import React from "react";
import { AuthProvider } from "@/components/providers/auth-provider";
import { getCurrentUser } from "@/app/actions";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const currentUser = await getCurrentUser();
  return <AuthProvider initUser={currentUser}>{children}</AuthProvider>;
};

export default PrivateLayout;
