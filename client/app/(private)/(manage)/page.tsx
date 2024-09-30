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
  PaperclipIcon,
  RedoIcon,
  SunIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const NewLayout = () => {
  const { setTheme, theme } = useTheme();

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
                "w-[calc(100vw_-_64px)] md:w-[calc(100vw_-_218px)] md:max-w-[644px] max-h-[calc(100vh_-_16px)] m-2 mr-0 overflow-hidden p-0"
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
                <div className="inline-flex gap-1 items-center font-semibold text-sm text-primary cursor-pointer">
                  <CheckCheckIcon className="shrink-0 size-4" />
                  <span>Mark all as read</span>
                </div>
              </div>

              <div className="max-h-[calc(100vh_-_103px)] min-w- overflow-y-scroll p-1">
                <div className="h-[2000px]">
                  <p className="font-bold text-sm">Today</p>
                  <div className="relative px-3 after:shrink-0 after:bg-primary after:border-[2px] after:border-blue-200 after:size-3 after:top-0 after:right-0 after:rounded-full after:absolute">
                    <div className="flex gap-3 items-center">
                      <div className="relative shrink-0 after:shrink-0 after:bg-gray-500 after:border-[2px] after:border-white after:size-3 after:bottom-0 after:right-0 after:rounded-full after:absolute">
                        <Image
                          src={configs.NEXT_PUBLIC_PHOTO_URL}
                          alt="avatar"
                          width="100"
                          height="100"
                          className="size-10 rounded-full "
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-base">
                          <b>Thanh Nhut</b> shared a new document in{" "}
                          <b>Q3 Financials</b>
                        </p>

                        <div className="flex items-center gap-1 text-xs">
                          <p>Now</p>
                          <div className="w-3 h-[1px] bg-gray-600" />
                          <p className="p-1 px-2 bg-accent rounded rounded-br font-bold relative before:bg-green-400 before:w-0.5 before:h-3 before:absolute before:top-1.5 before:left-1">
                            Finance
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-[52px] flex gap-2 mt-2">
                      <Button size="sm">Approve</Button>
                      <Button variant="outline" size="sm">
                        Deny
                      </Button>
                    </div>
                  </div>
                  <div className="relative px-3 after:shrink-0 after:bg-primary after:border-[2px] after:border-blue-200 after:size-3 after:top-0 after:right-0 after:rounded-full after:absolute">
                    <div className="flex gap-3 items-center ">
                      <div className="relative shrink-0 after:shrink-0 after:bg-green-500 after:border-[2px] after:border-white after:size-3 after:bottom-0 after:right-0 after:rounded-full after:absolute">
                        <Image
                          src={configs.NEXT_PUBLIC_PHOTO_URL}
                          alt="avatar"
                          width="100"
                          height="100"
                          className="size-10 rounded-full "
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-base">
                          <b>David</b> commented in <b>Performance Reviews</b>
                        </p>

                        <div className="flex items-center gap-1 text-xs">
                          <p>2h ago</p>
                          <div className="w-3 h-[1px] bg-gray-600" />
                          <p className="p-1 px-2 bg-accent rounded rounded-br font-bold relative before:bg-green-400 before:w-0.5 before:h-3 before:absolute before:top-1.5 before:left-1">
                            Finance
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-[52px] mt-2 rounded-md border-l-4 border-orange-500 p-2 bg-gradient-to-r from-orange-50">
                      Please ensure the feedback is constructive and actionable.
                      We need to finalize this by tomorrow
                    </div>
                  </div>
                  <div className="relative px-3 after:shrink-0 after:bg-primary after:border-[2px] after:border-blue-200 after:size-3 after:top-0 after:right-0 after:rounded-full after:absolute">
                    <div className="flex gap-2 items-center ">
                      <div className="relative shrink-0 after:shrink-0 after:bg-green-500 after:border-[2px] after:border-white after:size-3 after:bottom-0 after:right-0 after:rounded-full after:absolute">
                        <Image
                          src={configs.NEXT_PUBLIC_PHOTO_URL}
                          alt="avatar"
                          width="100"
                          height="100"
                          className="size-10 rounded-full "
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-base">
                          <b>Nina</b> mentioned you in a comment on{" "}
                          <b>Annual Report</b>
                        </p>

                        <div className="flex items-center gap-1 text-xs">
                          <p>2h ago</p>
                          <div className="w-3 h-[1px] bg-gray-600" />
                          <p className="p-1 px-2 bg-accent rounded rounded-br font-bold relative before:bg-green-400 before:w-0.5 before:h-3 before:absolute before:top-1.5 before:left-1">
                            Finance
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 ml-12 mt-2 rounded-md border-l-4 border-gray-500 p-2 bg-gradient-to-r from-gray-50">
                      <p>Could you please verify the numbers on pages 4 ?</p>
                      <div className="flex justify-between gap-1 items-center border p-2 rounded-lg">
                        <p className="font-medium">Reply</p>
                        <RedoIcon className="size-4 shrink-0" />
                      </div>
                    </div>
                  </div>
                  <div className="relative px-3 after:shrink-0 after:bg-primary after:border-[2px] after:border-blue-200 after:size-3 after:top-0 after:right-0 after:rounded-full after:absolute">
                    <div className="flex gap-2 items-center ">
                      <div className="relative shrink-0 after:shrink-0 after:bg-green-500 after:border-[2px] after:border-white after:size-3 after:bottom-0 after:right-0 after:rounded-full after:absolute">
                        <Image
                          src={configs.NEXT_PUBLIC_PHOTO_URL}
                          alt="avatar"
                          width="100"
                          height="100"
                          className="size-10 rounded-full "
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-base">
                          <b>Nina</b> mentioned you in a comment on{" "}
                          <b>Annual Report</b>
                        </p>

                        <div className="flex items-center gap-1 text-xs">
                          <p>2h ago</p>
                          <div className="w-3 h-[1px] bg-gray-600" />
                          <p className="p-1 px-2 bg-accent rounded rounded-br font-bold relative before:bg-green-400 before:w-0.5 before:h-3 before:absolute before:top-1.5 before:left-1">
                            Finance
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center px-2 py-1 gap-2 ml-12 mt-2 rounded-md bg-accent text-sm text-gray-500 border">
                      <PaperclipIcon className="shrink-0 size-4" />
                      <span className="font-bold text-black">
                        docker-compose.yml
                      </span>
                      <span>1MB</span>
                    </div>
                  </div>
                  <div className="relative px-3 ">
                    <div className="flex gap-2 items-center ">
                      <div className="relative shrink-0 after:shrink-0 after:bg-green-500 after:border-[2px] after:border-white after:size-3 after:bottom-0 after:right-0 after:rounded-full after:absolute">
                        <Image
                          src={configs.NEXT_PUBLIC_PHOTO_URL}
                          alt="avatar"
                          width="100"
                          height="100"
                          className="size-10 rounded-full "
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-base">
                          <b>Nina</b> commented in <b>Annual Report</b>
                        </p>

                        <div className="flex items-center gap-1 text-xs">
                          <p>27 Aug 2024</p>
                          <div className="w-3 h-[1px] bg-gray-600" />
                          <p className="p-1 px-2 bg-accent rounded rounded-br font-bold relative before:bg-green-400 before:w-0.5 before:h-3 before:absolute before:top-1.5 before:left-1">
                            Finance
                          </p>
                        </div>
                      </div>
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
              defaultChecked={theme == "dark"}
              checked={theme == "dark"}
              onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
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

      <div className="w-full bg-background p-4 max-w-screen-xl mx-auto md:rounded-xl md:min-h-[calc(100vh_-_64px)]">
        <h3 className="font-bold text-2xl">Account settings</h3>
        <p className="text-sm font-normal leading-snug text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
    </div>
  );
};

export default NewLayout;
