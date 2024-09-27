"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    setIsLoading(false);
  });
  if (isLoading) return;
  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        className="relative bg-input ease-in-out  block flex-shrink-0 rounded-full w-10 h-[22px] border border-muted-foreground hover:border-primary"
      >
        <div className="absolute top-[1px] left-[1px] size-[18px] rounded-full transition-all duration-300 ease-in-out bg-background dark:translate-x-full dark:bg-black">
          {theme == "dark" ? (
            <MoonIcon className="size-3 absolute top-[3px] left-[3px] text-muted-foreground dark:text-white" />
          ) : (
            <SunIcon className="size-3 absolute top-[3px] left-[3px] text-muted-foreground dark:text-white" />
          )}
        </div>
      </button>
    </div>
  );
}
