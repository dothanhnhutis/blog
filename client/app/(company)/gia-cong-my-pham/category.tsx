"use client";
import { Badge } from "@/components/ui/badge";
// import { Category } from "@/schemas/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Categories = ({ categories }: { categories: any[] }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const tagSlug = searchParams.get("category");

  const handleTags = (item?: string) => {
    if (item) {
      router.push(`${pathName}?category=${item}`);
    } else {
      router.push(pathName);
    }
  };

  return (
    <div className="py-4 px-2 ">
      <div className="flex gap-2 overflow-x-scroll max-w-full scrollbar-hidden">
        {categories.length > 0 && (
          <Badge
            onClick={() => handleTags()}
            className="flex-shrink-0 cursor-pointer"
            variant={tagSlug == undefined ? "default" : "outline"}
          >
            <p className="text-sm">All</p>
          </Badge>
        )}

        {categories.map((tag, index) => (
          <Badge
            onClick={() => handleTags(tag.slug)}
            key={index}
            className="flex-shrink-0 cursor-pointer"
            variant={tagSlug == tag.slug ? "default" : "outline"}
          >
            <p className="text-sm">{tag.name}</p>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Categories;
