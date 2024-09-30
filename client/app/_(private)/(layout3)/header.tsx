import React from "react";
import { BellIcon } from "lucide-react";
import UserMenu from "./user-menu";

const Header = () => {
  return (
    <header className="hidden md:p-2 md:flex md:justify-end md:items-center md:gap-2 md:sticky md:top-0 md:right-0 md:w-full md:backdrop-blur md:bg-background/60 md:z-50">
      <div className="p-2 rounded-full bg-accent hover:bg-accent/80 cursor-pointer">
        <BellIcon className=" flex-shrink-0 size-6" />
      </div>
      <UserMenu />
    </header>
  );
};

export default Header;
