import React from "react";
import AdminSideBar from "./components/admin-side-bar";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex relative">
      <AdminSideBar />
      {children}
    </div>
  );
};

export default AdminLayout;
