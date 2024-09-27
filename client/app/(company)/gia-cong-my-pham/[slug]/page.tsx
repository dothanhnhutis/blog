import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductImage } from "./product-image";
import constants from "@/constants";
// import { getProductByIdOrSlug } from "@/service/api/product";

type ProductDetailProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ProductDetailProps) {
  try {
    const product: any = {};
    if (!product)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };
    return {
      title: product!.productName,
      description: product.contentText,
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}
const ProductDetail = async ({ params }: ProductDetailProps) => {
  const product: any = {};
  if (!product) return notFound();
  return (
    <div className="mx-auto xl:max-w-screen-xl px-2">
      <nav className="py-5">
        <p className="text-base align-middle">
          <Link
            href="/"
            prefetch
            className="inline hover:text-primary font-medium"
          >
            Trang chủ
          </Link>
          <ChevronRightIcon className="w-4 h-4 inline mx-1" />
          <Link
            href={`/gia-cong-my-pham`}
            prefetch
            className="inline hover:text-primary font-medium normal-case"
          >
            Gia Công Mỹ Phẩm
          </Link>
          <ChevronRightIcon className="w-4 h-4 inline mx-1" />
          <span className="font-normal">{product.productName}</span>
        </p>
      </nav>
      <div className="sm:flex sm:gap-4">
        <ProductImage images={product.images} />
        <div className="w-full mt-4 sm:mt-0">
          <h1 className="text-primary font-bold text-3xl mb-4 line-clamp-2">
            {product.productName}
          </h1>
          <p className="pt-4 pb-8 border-t border-dashed">
            {product.description}
          </p>

          <table className="w-full">
            <thead>
              <tr>
                <th className="min-w-[120px] text-start"></th>
                <th className="w-full"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-dashed">
                <td className="p-2">Công dụng</td>
                <td className="p-2">
                  <p className="line-clamp-2 overflow-hidden">
                    {product.benefits.join(", ")}
                  </p>
                </td>
              </tr>
              <tr className="border-t border-dashed bg-accent">
                <td className="p-2">Thành phần</td>
                <td className="p-2">
                  <p className="line-clamp-2 overflow-hidden">
                    {product.ingredients.join(", ")}
                  </p>
                </td>
              </tr>
              <tr className="border-t border-dashed">
                <td className="p-2">Mã sản phẩm</td>
                <td className="p-2">
                  <p className="line-clamp-2 overflow-hidden">{product.code}</p>
                </td>
              </tr>
              <tr className="border-t border-dashed bg-accent">
                <td className="p-2">Loại</td>
                <td className="p-2">
                  <p className="line-clamp-2 overflow-hidden">
                    {product.category.name}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <Button className="w-full my-8">Báo Giá Ngay</Button>
        </div>
      </div>

      <div
        className="border-t border-dashed pt-10 pb-20 mt-8"
        dangerouslySetInnerHTML={{ __html: product.contentHTML }}
      ></div>

      <p className="text-xl font-light text-black-100 mb-3 mt-32 ">
        <strong className="font-bold">{constants.company}</strong>
      </p>
      <p className="text-sm font-light text-black-100 mb-3">
        Văn phòng & Nhà máy: {constants.addressCompany}
      </p>
      <p className="text-sm font-light text-black-100 mb-3 truncate">
        Hotline: {constants.phoneNumberCompany}
      </p>
      <p className="text-sm font-light text-black-100 mb-3 truncate">
        Email: {constants.emailCompany}
      </p>
    </div>
  );
};

export default ProductDetail;
