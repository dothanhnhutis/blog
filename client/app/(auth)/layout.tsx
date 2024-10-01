import Link from "next/link";
import React from "react";
import Image from "next/image";
// import { ToggleTheme } from "@/components/switch-theme";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 left-0 right-0 backdrop-blur bg-background/60">
        <div className="flex justify-between items-center px-4 py-2 mx-auto max-w-screen-2xl">
          <Link href="/" prefetch={true}>
            <Image
              priority
              src={"/logo.png"}
              width={48}
              height={48}
              alt="logo"
              className="w-full size-auto"
            />
          </Link>
          {/* <ToggleTheme /> */}
        </div>
      </header>
      <div className="sm:p-8">{children}</div>
    </div>
  );
};

export default AuthLayout;
