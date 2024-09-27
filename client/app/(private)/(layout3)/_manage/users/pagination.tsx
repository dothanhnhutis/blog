"use client";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { caculatorPagination, cn } from "@/lib/utils";
export const UserPagination = ({ totalPage }: { totalPage: number }) => {
  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center justify-center text-sm font-medium ">
        0 of 10 row(s) selected.
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 md:hidden"
            disabled={false}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" disabled={false}>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          {caculatorPagination({
            totalPage,
            currentPage: 1,
          }).map((p) =>
            p != -1 ? (
              <Button
                key={p}
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0",
                  1 == p ? "border-primary" : "hidden md:block"
                )}
              >
                <span>{p}</span>
              </Button>
            ) : (
              <div className="h-8 w-8 cursor-not-allowed border rounded-lg md:flex justify-center bg-background opacity-50 items-center hidden">
                <span className="sr-only">More pages</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </div>
            )
          )}

          <Button variant="outline" className="h-8 w-8 p-0" disabled={false}>
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 md:hidden"
            disabled={false}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>

        <Select value={`${50}`}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder={"10 / page"} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
