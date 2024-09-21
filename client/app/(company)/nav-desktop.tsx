"use client";
import React from "react";
import Link from "next/link";
import { NewspaperIcon, PackageIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Chăm Sóc Gia Đình",
    href: "/gia-cong-my-pham?category=cham-soc-gia-dinh",
    description: "Danh mục sản phẩm giúp chăm sóc gia đình",
  },
  {
    title: "Chăm Sóc Cá Nhân",
    href: "/gia-cong-my-pham?category=cham-soc-ca-nhan",
    description: "Danh mục sản phẩm chăm sóc cơ thể khử mùi",
  },
  {
    title: "Chăm Sóc Da",
    href: "/gia-cong-my-pham?category=cham-soc-da",
    description: "Danh mục sản phẩm chăm sóc và dưỡng da",
  },
  {
    title: "Chăm Sóc Body",
    href: "/gia-cong-my-pham?category=cham-soc-body",
    description: "Danh mục sản phẩm chăm sóc toàn thân",
  },
  {
    title: "Chăm Sóc Tóc",
    href: "/gia-cong-my-pham?category=cham-soc-toc",
    description: "Danh mục sản phẩm bảo vệ và phục hồi tóc",
  },
  {
    title: "Nước Hoa",
    href: "/gia-cong-my-pham?category=nuoc-hoa",
    description: "Danh mục sản phẩm tạo hương thơm phòng và cơ thể",
  },
];
export const NavDesktop = () => {
  return (
    <div className="flex flex-grow w-[160px]">
      <nav className="absolute left-0 right-0 top-0 h-full flex items-center justify-center">
        <div className="w-[calc(100%_-_680px)] mx-auto flex max-[900px]:hidden items-center justify-center">
          <Link
            href="/ve-ich"
            className="inline-flex items-center justify-center px-4 py-2 flex-shrink-0 font-bold"
          >
            Giới thiệu về ICH
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="data-[state=open]:bg-transparent focus:bg-transparent hover:bg-transparent bg-transparent font-bold text-base">
                  Gia Công Mỹ Phẩm
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] lg:grid-cols-3 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/danh-muc-san-pham"
                        >
                          <PackageIcon className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Danh mục sản phẩm
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Tất cả các sản phẩm của các ngành hàng
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="data-[state=open]:bg-transparent focus:bg-transparent hover:bg-transparent bg-transparent max-md:hidden font-bold text-base">
                  Bài Viết
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/bai-viet"
                        >
                          <NewspaperIcon className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Bài viết
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Tất cả bài viết mới nhất
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/bai-viet?tag=gia-cong" title="Gia Công">
                      Cập nhật xu hướng thị trường gia công mới nhất
                    </ListItem>
                    <ListItem href="/bai-viet?tag=lam-dep" title="Làm đẹp">
                      Cung cấp các kiến thức về chăm sóc cá nhân và làm đẹp
                    </ListItem>
                    <ListItem
                      href="/bai-viet?tag=tuyen-dung"
                      title="Tuyển dụng"
                    >
                      Thông tin về nhân sự và tuyển dụng
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/lien-he"
            className="inline-flex items-center justify-center px-4 py-2 flex-shrink-0 font-bold"
          >
            Liên Hệ
          </Link>
        </div>
      </nav>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
