"use client";
import React from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const NavMobile = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="menu"
          variant="ghost"
          size="icon"
          className="rounded-full hidden max-[900px]:block p-2 hover:bg-gray-300"
        >
          <MenuIcon className="w-6 h-6 text-gray-500" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[280px] p-3">
        <Logo />
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-0">
            <Link href="/ve-ich" onClick={() => setOpen(false)}>
              <p className="font-semibold py-4">Giới thiệu về I.C.H</p>
            </Link>
          </AccordionItem>
          <AccordionItem value="item-1">
            <Link href="/gia-cong-my-pham" onClick={() => setOpen(false)}>
              <p className="font-semibold py-4">Gia công mỹ phẩm</p>
            </Link>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              <Link href="/bai-viet" onClick={() => setOpen(false)}>
                <p className="font-semibold">Danh mục sản phẩm</p>
              </Link>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4 text-sm font-medium">
                <li className="inline-flex w-full">
                  <Link
                    href="/bai-viet"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Gia công xà bông
                  </Link>
                </li>
                <li className="inline-flex w-full">
                  <Link
                    href="/bai-viet"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Gia công kem Face
                  </Link>
                </li>
                <li className="inline-flex w-full">
                  <Link
                    href="/bai-viet"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Gia công mặt nạ
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              <Link href="/bai-viet" onClick={() => setOpen(false)}>
                <p className="font-semibold">Bài Viết</p>
              </Link>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4 text-sm font-medium">
                <li className="inline-flex w-full">
                  <Link
                    href="/tin-tuc"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Gia Công
                  </Link>
                </li>
                <li className="inline-flex w-full">
                  <Link
                    href="/tin-tuc"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Làm Đẹp
                  </Link>
                </li>
                <li className="inline-flex w-full">
                  <Link
                    href="/tin-tuc"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Tuyển Dụng
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="hover:no-underline last:border-none"
          >
            <Link href="/lien-he" onClick={() => setOpen(false)}>
              <p className="font-semibold py-4">Liên hệ</p>
            </Link>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
};
