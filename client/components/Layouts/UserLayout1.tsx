"use client";
import React from "react";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import { BellIcon, MenuIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import UserSideBar from "./components/user-sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

const UserLayout1 = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="bg-gray-50">
      <header className="sticky top-0 z-50 shadow backdrop-blur bg-background/60">
        <div className="flex items-center justify-between p-2">
          <Logo className="size-14 shrink-0" />
          <div className="lg:flex items-center justify-center gap-2 hidden">
            <Button
              aria-label="menu"
              variant="ghost"
              size="icon"
              className="rounded-full p-2 hover:bg-blue-100 relative before:absolute before:bottom-[30%] before:right-[20%] before:size-2 before:bg-green-400 before:rounded-full"
            >
              <BellIcon className="shrink-0 size-6 text-gray-500" />
            </Button>
            <Button
              aria-label="menu"
              variant="ghost"
              size="icon"
              className="rounded-full  p-2 hover:bg-blue-100"
            >
              <ShoppingBagIcon className="shrink-0 size-6 text-gray-500" />
            </Button>
          </div>
          <Button
            aria-label="menu"
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden p-2 hover:bg-blue-100"
          >
            <MenuIcon className="w-6 h-6 text-gray-500" />
          </Button>
        </div>
      </header>
      <div className="flex gap-2 ">
        <div
          onClick={() => setOpen(!open)}
          className={cn(
            "shrink-0 h-[calc(100vh_-_72px)] sticky left-0 top-[72px] transition-[width] ease-in-out duration-300 bg-white p-2",
            open ? "w-[56px]" : "w-[200px]"
          )}
        >
          <Link
            href={"/"}
            className={cn(
              "flex flex-shrink-0 rounded-lg p-2 gap-2 items-center shadow",
              true
                ? "bg-blue-500 text-white"
                : "text-gray-800 hover:bg-blue-100"
            )}
          >
            <UserIcon className="shrink-0 size-6 hidden md:block" />
            <p className="text-sm w-full">sdsdsd</p>
          </Link>
        </div>
        <div className="mx-auto max-w-screen-lg w-full h-[2000px] bg-white">
          content
        </div>
      </div>
    </div>
  );
};

export default UserLayout1;
