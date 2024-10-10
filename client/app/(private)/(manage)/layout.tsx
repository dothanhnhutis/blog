import React from "react";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { ThemeProvider } from "next-themes";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <AdminLayout>{children}</AdminLayout>
    </ThemeProvider>
  );
};

export default PrivateLayout;
