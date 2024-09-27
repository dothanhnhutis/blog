import { cn } from "@/lib/utils";
import {
  BadgeAlertIcon,
  DownloadIcon,
  FrownIcon,
  PlusIcon,
  SmileIcon,
  UploadIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import FilterPopover from "./filter";
import SortPopeover from "./sort";
import UserTable from "./table";
import { UserPagination } from "./pagination";

const UserManagerPage = async ({
  searchParams,
}: {
  searchParams?: { [index: string]: string | string[] | undefined };
}) => {
  if (
    !searchParams ||
    !searchParams.tab ||
    typeof searchParams.tab == "object"
  ) {
    redirect("/manage/users?tab=active");
  }

  return (
    <div className="">
      <h3 className="font-bold text-4xl">User Management</h3>
      <p className="text-sm font-normal leading-snug text-muted-foreground">
        Manage your user and their account permissions here.
      </p>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <Link
            href="/manage/users?tab=active"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg",
              searchParams.tab == "active"
                ? "bg-secondary"
                : "hover:bg-secondary"
            )}
          >
            <SmileIcon className="flex-shrink-0 size-5 text-green-500" />
            <span className="hidden md:inline text-sm">Active</span>
          </Link>

          <Link
            href="/manage/users?tab=suspended"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg",
              searchParams.tab == "suspended"
                ? "bg-secondary"
                : "hover:bg-secondary"
            )}
          >
            <BadgeAlertIcon className="flex-shrink-0 size-5 text-orange-500" />
            <span className="hidden md:inline text-sm">Suspended</span>
          </Link>

          <Link
            href="/manage/users?tab=disabled"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg",
              searchParams.tab == "disabled"
                ? "bg-secondary"
                : "hover:bg-secondary"
            )}
          >
            <FrownIcon className="flex-shrink-0 size-5 text-red-500" />
            <span className="hidden md:inline text-sm">Disabled</span>
          </Link>
        </div>
        <Link
          href="/manage/users/create"
          className="flex items-center gap-1 px-3 py-2 bg-secondary rounded-lg"
        >
          <PlusIcon className="flex-shrink-0 size-5 " />
          <span className="hidden md:inline text-sm">Create new user</span>
        </Link>
      </div>
      <div className="flex gap-2 items-center justify-between my-4">
        <p className="font-medium text-2xl">All users 44</p>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 border px-2 py-1 rounded-md hover:bg-secondary">
            <UploadIcon className="size-4 flex-shrink-0" />
            <span className="text-sm hidden md:inline">Export</span>
          </div>
          <div className="flex items-center gap-1 border px-2 py-1 rounded-md hover:bg-secondary">
            <DownloadIcon className="size-4 flex-shrink-0" />
            <span className="text-sm hidden md:inline">Import</span>
          </div>

          <FilterPopover />
          <SortPopeover />
        </div>
      </div>
      <UserTable />
      <UserPagination totalPage={50} />
    </div>
  );
};

export default UserManagerPage;
