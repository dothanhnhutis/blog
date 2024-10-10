import React, { useState } from "react";
import { Logo } from "../logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import configs from "@/config";
import { Skeleton } from "../ui/skeleton";
import {
  BellIcon,
  CookieIcon,
  LogOutIcon,
  MailIcon,
  MenuIcon,
  SettingsIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SquareUserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import UserSideBar from "./components/user-sidebar";
import { cn } from "@/lib/utils";

const UserLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="flex items-center justify-between p-2 mx-auto max-w-screen-xl">
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

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none" asChild>
                <div className="p-1  hover:bg-blue-100 rounded-full cursor-pointer">
                  <Avatar className="size-8">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={configs.NEXT_PUBLIC_PHOTO_URL}
                    />
                    <AvatarFallback className="bg-transparent">
                      <Skeleton className="size-8 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[360px]">
                <DropdownMenuLabel className="flex items-center gap-3">
                  <Avatar className="size-24">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={configs.NEXT_PUBLIC_PHOTO_URL}
                    />
                    <AvatarFallback className="bg-transparent">
                      <Skeleton className="size-24 rounded-full" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="w-full overflow-hidden">
                    <p className="font-medium text-lg">Thành Nhựt</p>
                    <p className="text-muted-foreground font-normal">Admin</p>
                    <div className="flex items-center space-x-2 text-muted-foreground w-full">
                      <MailIcon className="flex flex-shrink-0 size-4" />
                      <p className="text-sm truncate">gaconght@gmail.com</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href="/settings/profile"
                    className="cursor-pointer h-[34px]"
                  >
                    <span className="font-medium">Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/settings/security"
                    className="cursor-pointer h-[34px]"
                  >
                    <span className="font-medium">Security</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                //   onClick={() => {
                //     signOut();
                //     router.push("/login");
                //     queryClient.clear();
                //   }}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span className="font-medium">Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      <main className="bg-white">
        <div className="flex flex-col md:flex-row relative mx-auto max-w-screen-xl">
          <UserSideBar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
