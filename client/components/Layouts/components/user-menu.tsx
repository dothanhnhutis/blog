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
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { User } from "@/schemas/user";
import { LogOutIcon, MailIcon, SettingsIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { disactivateAccount, signOut } from "@/app/actions";
import configs from "@/config";
import { useAuthContext } from "@/components/providers/auth-provider";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import Link from "next/link";

const UserMenu = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  if (!currentUser) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="p-1 hover:bg-blue-100 rounded-full cursor-pointer">
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
      {currentUser.emailVerified ? (
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
            <Link href="/settings/profile" className="cursor-pointer h-[34px]">
              <span className="font-medium">Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/security" className="cursor-pointer h-[34px]">
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
      ) : (
        <DropdownMenuContent avoidCollisions align="end" className="w-[245px]">
          <DropdownMenuLabel className="flex flex-col items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={configs.NEXT_PUBLIC_PHOTO_URL}
              />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="w-24 h-24 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <p className="font-medium text-lg">Thanh Nhut</p>
            <p className="text-muted-foreground font-sm">gaconght@gmail.com</p>
          </DropdownMenuLabel>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <SettingsIcon className="mr-4 h-4 w-4" />
                <span>Close Account</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will deactivate your
                  account
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                // onClick={async () => {
                //   await disactivateAccount("/verify-email");
                // }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DropdownMenuItem
          // onClick={() => {
          //   signOut();
          //   queryClient.removeQueries({ type: "all" });
          // }}
          >
            <LogOutIcon className="mr-4 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserMenu;
