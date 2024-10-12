"use client";
import React from "react";
import {
  CookieIcon,
  CreditCardIcon,
  ListIcon,
  LucideIcon,
  MapPinIcon,
  PanelLeftCloseIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SquareUserRoundIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SideBarLinkProps = {
  href: string;
  title: string;
  selected: boolean;
  Icon: LucideIcon;
  isOpen: boolean;
};

const SideBarLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & SideBarLinkProps
>(({ href, selected, Icon, title, isOpen, className, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      {...props}
      href={href}
      className={cn(
        className,
        "flex flex-shrink-0 rounded-lg p-2 gap-2 items-center transition-all ease-in-out duration-300",
        selected
          ? "text-blue-600 font-bold bg-blue-100 hover:bg-blue-200"
          : "text-gray-500 font-medium hover:bg-gray-200"
      )}
    >
      <Icon className="shrink-0 size-6" />
      <p
        className={cn(
          "text-sm w-full truncate",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      >
        {title}
      </p>
    </Link>
  );
});

const SideBarBtn = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
    Omit<SideBarLinkProps, "title">
>(({ href, selected, Icon, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      {...props}
      href={href}
      className={cn(
        "flex flex-shrink-0 rounded-lg p-2 gap-2 items-center transition-all ease-in-out duration-300",
        selected
          ? "text-blue-600 font-bold bg-blue-100 hover:bg-blue-200"
          : "text-gray-500 font-medium hover:bg-gray-100"
      )}
    >
      <Icon className="shrink-0 size-6 " />
    </Link>
  );
});

const sideBarData: (Omit<SideBarLinkProps, "isOpen" | "selected"> & {
  isSelected: (path: string) => boolean;
})[] = [
  {
    href: "/profile",
    Icon: SquareUserRoundIcon,
    title: "Profile",
    isSelected: (path: string) => path.startsWith("/profile"),
  },
  {
    href: "/security",
    Icon: ShieldCheckIcon,
    title: "Security",
    isSelected: (path: string) => path.startsWith("/security"),
  },
  {
    href: "/sessions",
    Icon: CookieIcon,
    title: "Sessions",
    isSelected: (path: string) => path.startsWith("/sessions"),
  },
  {
    href: "/address",
    Icon: MapPinIcon,
    title: "Address",
    isSelected: (path: string) => path.startsWith("/address"),
  },
  {
    href: "/payments",
    Icon: CreditCardIcon,
    title: "Payment method",
    isSelected: (path: string) => path.startsWith("/payments"),
  },
];

const UserSideBar = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const path = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "shrink-0 h-[calc(100vh_-_56px)] sticky left-0 top-[56px] transition-all ease-in-out duration-300 bg-white border-r",
          open
            ? "w-[56px] min-[1080px]:border-none"
            : "w-[200px] min-[1224px]:border-none"
        )}
      >
        <ScrollArea>
          <div
            className={cn(
              "flex gap-1 flex-col h-[calc(100vh_-_56px_-_113px)] p-2",
              open ? "w-[56px]" : "w-full"
            )}
          >
            {sideBarData.map((s, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <SideBarLink
                    href={s.href}
                    selected={s.isSelected(path)}
                    Icon={s.Icon}
                    title={s.title}
                    isOpen={open}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="center"
                  className={cn(open ? "" : "hidden")}
                >
                  <p>{s.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 bg-background">
          <div className="space-y-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <SideBarLink
                  href="/settings"
                  selected={path.startsWith("/settings")}
                  Icon={SettingsIcon}
                  title="Settings"
                  isOpen={open}
                />
              </TooltipTrigger>
              <TooltipContent
                side="right"
                align="center"
                className={cn(open ? "" : "hidden")}
              >
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div
            className={cn(
              "flex border-t justify-between items-center p-2 gap-1",
              open ? "flex-col" : "flex-row"
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <SideBarBtn
                  isOpen={open}
                  href="/"
                  selected={path.startsWith("/")}
                  Icon={ListIcon}
                />
              </TooltipTrigger>
              <TooltipContent side={open ? "right" : "top"} align="center">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="flex flex-shrink-0 rounded-lg p-2 gap-2 items-center transition-all ease-in-out duration-300 text-gray-500 font-medium hover:bg-gray-100"
                >
                  <PanelLeftCloseIcon className="shrink-0 size-6 " />
                </button>
              </TooltipTrigger>
              <TooltipContent side={open ? "right" : "top"} align="center">
                <p>{!open ? "Close" : "Open"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default UserSideBar;
