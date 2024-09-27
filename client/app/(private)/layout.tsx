import React from "react";
import { getCurrentUser } from "../actions";
import { AuthProvider } from "@/components/providers/auth-provider";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return <AuthProvider initUser={currentUser}>{children}</AuthProvider>;
};

export default PrivateLayout;
