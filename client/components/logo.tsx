import React from "react";
import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";
export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" prefetch={false}>
      <div className={cn("flex items-center size-14", className)}>
        <AspectRatio ratio={1 / 1} className="flex items-center justify-center">
          <Image
            priority
            src={"/logo.png"}
            width={110}
            height={110}
            alt="logo"
            title="logo-ich"
          />
        </AspectRatio>
      </div>
    </Link>
  );
};
