"use client";
import React from "react";
import {
  CookieIcon,
  CreditCardIcon,
  LucideIcon,
  MapPinIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SquareUserRoundIcon,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        "flex flex-shrink-0 rounded-lg p-2 gap-2 items-center shadow",
        selected ? "bg-blue-500 text-white" : "text-gray-800 hover:bg-blue-100"
      )}
    >
      <Icon className="shrink-0 size-6 hidden md:block" />
      <p className="text-sm w-full">{title}</p>
    </Link>
  );
};

const UserSideBar = () => {
  const path = usePathname();
  return (
    <div className=" md:shrink-0 md:h-[calc(100vh_-_72px)] md:sticky md:left-0 md:top-[72px] md:w-[200px] md:overflow-y-scroll">
      <div className="gap-2 flex flex-row md:flex-col md:min-h-full p-2 overflow-x-scroll md:overflow-x-auto">
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
          href="/"
          selected={path.startsWith("/address")}
          Icon={MapPinIcon}
          title="Address"
        />
        <SiderBarLink
          href="/payment"
          selected={path.startsWith("/payment")}
          Icon={CreditCardIcon}
          title="Payment method"
        />
        <SiderBarLink
          href="/settings"
          selected={path.startsWith("/settings")}
          Icon={SettingsIcon}
          title="Settings"
        />
      </div>
    </div>
  );
};

export default UserSideBar;
