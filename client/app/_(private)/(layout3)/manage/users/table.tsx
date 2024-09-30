"use client";
import React from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import configs from "@/config";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCheckIcon,
  CircleOffIcon,
  EllipsisVerticalIcon,
  KeyRoundIcon,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const UserTable = () => {
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copy ID success");
  };
  return (
    <div className="bg-card text-card-foreground border rounded-lg ">
      <Table className="w-full ">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox id="terms" />
            </TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Join at</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="min-w-[400px] w-full">
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={configs.NEXT_PUBLIC_PHOTO_URL}
                        alt="photo"
                      />
                      <AvatarFallback />
                    </Avatar>
                    <div>
                      <p className="text-base">Thanh Nhut</p>
                      <p className="text-xs font-medium">gaconght@gmail.com</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div className="flex space-x-2">
                    <p className="px-2 py-1 rounded-xl bg-green-500/20 text-green-600 border border-green-600 text-xs font-bold">
                      Admin
                    </p>
                    {/* <p className="px-2 py-1 rounded-xl bg-purple-500/20 text-purple-600 border border-purple-500 text-xs font-bold">
                      Manager
                    </p>
                    <p className="px-2 py-1 rounded-xl bg-blue-500/20 text-blue-600 border border-blue-500 text-xs font-bold">
                      Manager
                    </p>
                    <p className="px-2 py-1 rounded-xl border-secondary border border-gray-500 text-xs font-bold">
                      Customer
                    </p> */}
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div className="flex space-x-2">
                    <CheckCheckIcon className="flex-shrink-0 size-6 text-green-500" />
                    <CircleOffIcon className="flex-shrink-0 size-6 text-red-500" />
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div className="flex space-x-2">
                    <span className="max-w-full truncate font-medium">
                      Jan 20, 2022
                    </span>
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div className="flex space-x-2">
                    <FaGithub className="flex-shrink-0 size-6" />
                    <FcGoogle className="flex-shrink-0 size-6" />
                    <KeyRoundIcon className="flex-shrink-0 size-6" />
                  </div>
                </TableCell>
                <TableCell className="min-w-[50px]">
                  <EllipsisVerticalIcon className="flex-shrink-0 size-4" />
                </TableCell>
              </TableRow>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => copyToClipboard("123")}>
                Copy ID
              </ContextMenuItem>
              <Link href={`/manage/users/123/edit`}>
                <ContextMenuItem>Edit</ContextMenuItem>
              </Link>
              <ContextMenuSub>
                <ContextMenuSubTrigger>Suspended</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuCheckboxItem checked>
                    True
                  </ContextMenuCheckboxItem>
                  <ContextMenuCheckboxItem>False</ContextMenuCheckboxItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuContent>
          </ContextMenu>

          <TableRow>
            <TableCell colSpan={7} className="h-14 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
