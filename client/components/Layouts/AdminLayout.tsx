import React from "react";
import AdminSideBar from "./components/admin-side-bar";
import { getCurrentUser } from "@/app/actions";
import { AuthProvider } from "../providers/auth-provider";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const currentUser = await getCurrentUser();
  return (
    <AuthProvider initUser={currentUser}>
      <div className="flex relative">
        <AdminSideBar />
        {children}
      </div>
    </AuthProvider>
  );
};

export default AdminLayout;
