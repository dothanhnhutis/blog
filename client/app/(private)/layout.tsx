import { TankStackProvider } from "@/components/providers/tankStack-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import React from "react";

const PrivateLayout = ({
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
      <TankStackProvider>
        {children}
        <Toaster visibleToasts={5} richColors />
      </TankStackProvider>
    </ThemeProvider>
  );
};

export default PrivateLayout;
