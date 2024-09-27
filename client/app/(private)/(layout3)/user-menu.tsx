"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, MailIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useWindowDimensions } from "@/hook/useWindowDimensions";
import { useAuthContext } from "@/components/providers/auth-provider";
import { signOut } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import configs from "@/config";
const UserMenu = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { width } = useWindowDimensions();
  const { currentUser } = useAuthContext();

  React.useEffect(() => {
    if (open) {
      if ((isMobile && width >= 768) || (!isMobile && width <= 768)) {
        setOpen(false);
      }
    }
  }, [width]);

  const queryClient = useQueryClient();
  const router = useRouter();
  if (!currentUser) return <></>;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none" asChild>
        <div className="p-1 bg-accent hover:bg-accent/80 rounded-full cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={
                currentUser?.profile?.picture || configs.NEXT_PUBLIC_PHOTO_URL
              }
            />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="size-8 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "w-[360px]",
          isMobile ? "md:hidden block" : "hidden md:block"
        )}
      >
        <DropdownMenuLabel className="flex items-center gap-3">
          <Avatar className="size-24">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={
                currentUser?.profile?.picture || configs.NEXT_PUBLIC_PHOTO_URL
              }
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
            <span className="font-medium">Security</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
            router.push("/login");
            queryClient.clear();
          }}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span className="font-medium">Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
