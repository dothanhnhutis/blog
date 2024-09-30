"use client";
import React from "react";
import NavLink from "../nav-link";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background p-4 max-w-screen-xl mx-auto md:rounded-xl mb-2 md:min-h-[calc(100vh_-_64px)]">
      <h3 className="font-bold text-2xl">Account settings</h3>
      <p className="text-sm font-normal leading-snug text-muted-foreground">
        Manage your account settings and set e-mail preferences.
      </p>
      <div className="flex flex-col mt-4 gap-4">
        <div className="flex gap-2 items-center overflow-x-scroll">
          <NavLink
            href="/settings/profile"
            title="Profile"
            className="py-2 px-4"
            regex={/^\/settings\/profile$/}
            reverse={true}
          />
          <NavLink
            href="/settings/security"
            title="Security"
            className="py-2 px-4"
            regex={/^\/settings\/security$/}
            reverse={true}
          />
          <NavLink
            href="/settings/sessions"
            title="Sessions"
            className="py-2 px-4"
            regex={/^\/settings\/sessions$/}
            reverse={true}
          />
          <NavLink
            href="/settings/notifications"
            title="Notifications"
            className="py-2 px-4"
            regex={/^\/settings\/notifications$/}
            reverse={true}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SettingLayout;
