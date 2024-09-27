import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import React from "react";

const Tag = ({
  title,
  onRemove,
  className,
}: {
  title: string;
  onRemove?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-primary text-white p-1 rounded-l-[12px] rounded-tr rounded-br group",
        className
      )}
    >
      <button
        type="button"
        onClick={onRemove}
        className="bg-background rounded-full size-2 cursor-pointer"
      >
        <XIcon className="shrink-0 size-2 group-hover:block hidden text-black dark:text-white" />
      </button>
      <p className="text-xs">{title}</p>
    </div>
  );
};

export default Tag;
