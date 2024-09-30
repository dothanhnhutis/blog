"use client";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const NavLink = ({
  href = "#",
  regex,
  title = "",
  Icon,
  className,
  reverse,
}: {
  href?: string;
  regex?: RegExp;
  title?: string;
  Icon?: LucideIcon;
  className?: string;
  reverse?: boolean;
}) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center p-2 rounded-lg mb-1 last:mb-0",
        regex?.test(path)
          ? reverse
            ? "bg-secondary"
            : "bg-background text-accent-foreground hover:bg-background"
          : reverse
          ? "hover:bg-secondary"
          : "hover:bg-background hover:text-accent-foreground",
        className
      )}
    >
      {Icon && <Icon className="block flex-shrink-0 size-6 md:mr-2" />}
      <span className="text-sm">{title}</span>
    </Link>
  );
};

export default NavLink;
