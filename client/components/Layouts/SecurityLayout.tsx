import React from "react";
import { Logo } from "../logo";
import UserMenu from "./components/user-menu";

const SecurityLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur bg-background/60">
        <nav className="flex justify-between items-center p-3 h-[72px] mx-auto max-w-screen-xl">
          <Logo className="shrink-0" />
          <div className="flex flex-1 items-center justify-end gap-4 ">
            <UserMenu />
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default SecurityLayout;
