"use client";
import React from "react";
import {
  CookieIcon,
  LucideIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SquareUserRoundIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { boolean } from "zod";

const SiderBarLink = ({
  href,
  selected,
  title,
  Icon,
}: {
  href: string;
  title: string;
  selected: boolean;
  Icon: LucideIcon;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-shrink-0 rounded-lg p-2 gap-2 items-center",
        selected ? "bg-blue-300 text-white" : "text-gray-800 hover:bg-blue-100"
      )}
    >
      <Icon className="block shrink-0 size-6" />
      <p className="text-sm w-full">{title}</p>
    </Link>
  );
};

const UserSideBar = () => {
  const path = usePathname();
  return (
    <div className="shrink-0 h-[calc(100vh_-_72px)] sticky left-0 top-[72px] w-[200px] p-2 ">
      <ScrollArea className="mt-2">
        <div className="grid gap-1">
          <SiderBarLink
            href="/profile"
            selected={path.startsWith("/profile")}
            Icon={SquareUserRoundIcon}
            title="Profile"
          />
          <SiderBarLink
            href="/security"
            selected={path.startsWith("/security")}
            Icon={ShieldCheckIcon}
            title="Security"
          />
          <SiderBarLink
            href="/sessions"
            selected={path.startsWith("/sessions")}
            Icon={CookieIcon}
            title="Sessions"
          />
          <SiderBarLink
            href="/settings"
            selected={path.startsWith("/settings")}
            Icon={SettingsIcon}
            title="Settings"
          />
          <SiderBarLink
            href="/settings"
            selected={path.startsWith("/settings")}
            Icon={SettingsIcon}
            title="Settings"
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserSideBar;
