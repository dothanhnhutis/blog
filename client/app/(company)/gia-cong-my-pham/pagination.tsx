"use client";
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generateQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type PaginationProps = {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  totalPage: number;
  tag?: string;
  page?: string;
};

const PaginationH = ({
  hasNextPage,
  hasPrevPage,
  totalPage,
  currentPage,
  page,
  ...other
}: PaginationProps) => {
  const path = "/gia-cong-my-pham";

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Pagination>
        <PaginationContent>
          <Button
            disabled={!hasPrevPage}
            variant="ghost"
            className="p-0"
            aria-label="Go to previous page"
          >
            <Link
              href={
                path +
                generateQuery({ ...other, page: `${parseInt(page!) - 1}` })
              }
              className="flex items-center justify-center gap-1 h-full pl-2.5 pr-4 py-2"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Previous</span>
            </Link>
          </Button>
          {Array.from({ length: totalPage }).map((_, index) => (
            <PaginationLink
              isActive={
                (index + 1).toString() == page ||
                (index == 0 && page == undefined)
              }
              key={index}
              href={path + generateQuery({ ...other, page: `${index + 1}` })}
            >
              {index + 1}
            </PaginationLink>
          ))}

          {/* <PaginationLink href="#" isActive>
            2
          </PaginationLink>
          <PaginationLink href="#">3</PaginationLink>
          <PaginationEllipsis /> */}
          <Button
            disabled={!hasNextPage}
            variant="ghost"
            className="p-0"
            aria-label="Go to previous page"
          >
            <Link
              href={
                path +
                generateQuery({
                  ...other,
                  page: `${parseInt(page ?? "1") + 1}`,
                })
              }
              className="flex items-center justify-center gap-1 h-full pr-2.5 pl-4 py-2"
            >
              <span>Next</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationH;
