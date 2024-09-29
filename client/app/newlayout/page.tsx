import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import configs from "@/config";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  LogOutIcon,
  MailIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewLayout = () => {
  return (
    <div className="flex relative" data-state="close">
      <div className="sticky top-0 left-0 h-screen [div[data-state='open']_&]:w-[250px] shrink-0 ">
        <Link href={"/"} className="flex gap-2 items-center p-2 h-16">
          <Image
            src={"/logo.png"}
            priority
            alt=""
            width="48"
            height="48"
            className="shrink-0 size-10"
          />
          <p className="font-medium [div[data-state='close']_&]:hidden">
            Công ty TNHH MTV TM Sản Xuất I.C.H
          </p>
        </Link>
        <div className="h-[calc(100vh_-_168px)] overflow-y-scroll">kk</div>

        <div className="absolute bottom-0 left-0 right-0 p-2 grid gap-1">
          <div className="inline-flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center">
            <BellIcon className="block shrink-0 size-6" />
            <p className="text-sm w-full [div[data-state='close']_&]:hidden">
              Notification
            </p>
            <p className="[div[data-state='close']_&]:hidden text-xs">10</p>
          </div>
          <div className="inline-flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center">
            <MoonIcon className="hidden dark:block shrink-0 size-6" />
            <SunIcon className="dark:hidden block shrink-0 size-6" />
            <p className="text-sm w-full [div[data-state='close']_&]:hidden">
              Theme
            </p>
            <Switch className="[div[data-state='close']_&]:hidden" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" asChild>
              <div className="flex items-center justify-center gap-2 rounded-lg [div[data-state='open']_&:hover]:bg-background [div[data-state='open']_&]:p-2">
                <Avatar className="size-10">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={configs.NEXT_PUBLIC_PHOTO_URL}
                  />
                  <AvatarFallback className="bg-transparent">
                    <Skeleton className="size-10 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full [div[data-state='close']_&]:hidden">
                  <p className="font-bold text-base">Thanh Nhut</p>
                  <p className=" text-sm">Admin</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="right"
              className={cn(
                "w-[360px] ml-2",
                false ? "md:hidden block" : "hidden md:block"
              )}
            >
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
                  <span className="font-medium">Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span className="font-medium">Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full h-[2000px] bg-blue-300">s</div>
    </div>
  );
};

export default NewLayout;
