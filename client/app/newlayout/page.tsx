"use client";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import configs from "@/config";
import { cn } from "@/lib/utils";
import {
  AlbumIcon,
  BellIcon,
  BoxesIcon,
  CalculatorIcon,
  CaptionsIcon,
  CheckCheckIcon,
  ClipboardListIcon,
  LogOutIcon,
  MailIcon,
  Maximize2Icon,
  MoonIcon,
  SunIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

const NewLayout = () => {
  const MIN_SIZE_IN_PIXELS = 210;

  const { setTheme, theme } = useTheme();

  const [minSize, setMinSize] = React.useState(10);

  React.useLayoutEffect(() => {
    const panelGroup: HTMLElement | null = document.querySelector(
      '[data-panel-group-id="group"]'
    );
    const resizeHandles: NodeListOf<HTMLElement> = document.querySelectorAll(
      "[data-panel-resize-handle-id]"
    );
    if (!panelGroup || !resizeHandles) return;
    const observer = new ResizeObserver(() => {
      let height = panelGroup.offsetHeight;

      resizeHandles.forEach((resizeHandle) => {
        height -= resizeHandle.offsetHeight;
      });
      setMinSize((MIN_SIZE_IN_PIXELS / height) * 100);
    });
    observer.observe(panelGroup);
    resizeHandles.forEach((resizeHandle) => {
      observer.observe(resizeHandle);
    });

    return () => {
      observer.unobserve(panelGroup);
      resizeHandles.forEach((resizeHandle) => {
        observer.unobserve(resizeHandle);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex relative">
      <div className="sticky top-0 left-0 h-screen md:w-[210px] shrink-0 ">
        <Link href={"/"} className="flex gap-2 items-center p-2 h-14">
          <Image
            src={"/logo.png"}
            priority
            alt=""
            width="48"
            height="48"
            className="shrink-0 size-10"
          />
          <p className="font-medium hidden md:block">
            Công ty TNHH MTV TM Sản Xuất I.C.H
          </p>
        </Link>
        <ScrollArea className="h-[calc(100vh_-_144px_-_56px)] p-2 bg-green-300">
          <div className="flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center">
            <UsersIcon className="block shrink-0 size-6" />
            <p className="text-sm w-full hidden md:block">Users</p>
            <p className="hidden md:block text-xs">10</p>
          </div>
          <div className="flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center">
            <CaptionsIcon className="block shrink-0 size-6" />
            <p className="text-sm w-full hidden md:block">Posts</p>
            <p className="hidden md:block text-xs">10</p>
          </div>
          <div className="flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center">
            <BoxesIcon className="block shrink-0 size-6" />
            <p className="text-sm w-full hidden md:block">Products</p>
            <p className="hidden md:block text-xs">10</p>
          </div>
          <div className="flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center">
            <ClipboardListIcon className="block shrink-0 size-6" />
            <p className="text-sm w-full hidden md:block">Tasks</p>
            <p className="hidden md:block text-xs">10</p>
          </div>
          <div className="flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center">
            <AlbumIcon className="block shrink-0 size-6" />
            <p className="text-sm w-full hidden md:block">Stock</p>
            <p className="hidden md:block text-xs">10</p>
          </div>
          <div className="flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center">
            <CalculatorIcon className="block shrink-0 size-6" />
            <p className="text-sm w-full hidden md:block">Formular</p>
            <p className="hidden md:block text-xs">10</p>
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-2 grid gap-1 bg-red-400">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" asChild>
              <div className="flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center ">
                <div className="relative after:bg-green-400 after:size-2 after:bottom-1 after:right-0 after:rounded-full after:absolute">
                  <BellIcon className="block shrink-0 size-6 " />
                </div>
                <p className="text-sm w-full hidden md:block">Notifications</p>
                <p className="hidden md:block text-xs">10</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="right"
              className={cn(
                "w-[calc(100vw_-_60px)] md:w-[calc(100vw_-_214px)]  md:max-w-[640px] ml-2 max-h-[calc(100vh_-_16px)] my-2 overflow-hidden p-0"
              )}
            >
              <DropdownMenuLabel className="flex gap-2 items-center justify-between">
                <p className="font-bold text-lg">Notifications</p>
                <div className="flex gap-1">
                  <button type="button" className="p-1 rounded border">
                    <Maximize2Icon className="size-4 shrink-0" />
                  </button>
                  <button type="button" className="p-1 rounded border">
                    <XIcon className="size-4 shrink-0" />
                  </button>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex gap-1 items-center justify-between px-2">
                <div className="flex gap-2 items-center py-2 text-sm">
                  <p className="font-bold">All</p>
                  <p>Task (10)</p>
                </div>
                <div className="inline-flex gap-1 items-center font-semibold text-sm text-primary">
                  <CheckCheckIcon className="shrink-0 size-4" />
                  <span>Mark all as read</span>
                </div>
              </div>

              <div className="max-h-[calc(100vh_-_105px)] overflow-y-scroll p-1">
                <div className="h-[2000px]">
                  <p>Today</p>
                  <div className="flex">
                    <Image
                      src={configs.NEXT_PUBLIC_PHOTO_URL}
                      alt="avatar"
                      width="100"
                      height="100"
                      className="size-8 rounded-full "
                    />
                    <div>
                      <p></p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <label
            htmlFor="theme"
            className="flex flex-shrink-0 hover:bg-background rounded-lg p-2 gap-2 items-center"
          >
            <MoonIcon className="hidden dark:block shrink-0 size-6" />
            <SunIcon className="dark:hidden block shrink-0 size-6" />
            <p className="text-sm w-full hidden md:block">Dark Mode</p>
            <Switch
              id="theme"
              onCheckedChange={(v) => setTheme(!v ? "light" : "dark")}
              className="hidden md:block"
            />
          </label>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" asChild>
              <div className="flex items-center justify-center gap-2 rounded-lg hover:bg-background h-10 p-2">
                <Avatar className="size-6">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={configs.NEXT_PUBLIC_PHOTO_URL}
                  />
                  <AvatarFallback className="bg-transparent">
                    <Skeleton className="size-6 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full hidden md:block max-w-[146px]">
                  <p className="font-bold text-sm truncate">Thanh Nhut</p>
                  <p className=" text-xs">Admin</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="right"
              className={cn("w-[360px] ml-2")}
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

      <div className="w-full bg-background p-4 max-w-screen-xl mx-auto md:rounded-xl mb-2 md:min-h-[calc(100vh_-_64px)]">
        <h3 className="font-bold text-2xl">Account settings</h3>
        <p className="text-sm font-normal leading-snug text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
    </div>
  );
};

export default NewLayout;
