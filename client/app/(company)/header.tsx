import React from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { NavMobile } from "./nav-mobile";
import { NavDesktop } from "./nav-desktop";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <div className="lg:mx-auto lg:max-w-7xl flex justify-between items-center p-2">
          <Logo className="relative z-10" />

          <NavDesktop />

          <div className="relative flex items-center gap-1 text-gray-500">
            <div className="group relative flex justify-center w-[180px] max-[1120px]:w-auto">
              <input
                type="text"
                placeholder="Search"
                className="py-2 px-12 bg-gray-300/30 rounded-3xl w-full hover:bg-gray-300/80 max-[1120px]:hidden placeholder:text-base placeholder:font-medium hover:placeholder:text-gray-500 focus-visible:outline-0"
              />
              <button
                aria-label="search"
                className="rounded-full px-2 py-1.5 group-hover:bg-gray-300/80 absolute top-0.5 left-0.5 bottom-0.5 max-[1120px]:static max-[1120px]:py-2"
              >
                <SearchIcon className="w-6 h-6" />
              </button>
              <button
                aria-label="search"
                className="rounded-full p-2 md:py-1.5 hidden absolute top-0.5 right-0.5 bottom-0.5"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <NavMobile />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
