"use client";
import Image from "next/image";
import { ProductImageCarousel } from "./product-image-carousel";
type ProductImageWrapperProps = {
  images: string[];
};
export const ProductImage = ({ images }: ProductImageWrapperProps) => {
  let children = (
    <div className="flex items-center justify-center h-full">
      <p>Error Loading Thumnail</p>
    </div>
  );
  if (images.length == 1) {
    children = (
      <div className="bg-muted rounded-lg overflow-hidden">
        <Image
          alt=""
          className="object-contain aspect-[4/3]"
          priority
          sizes="100vw"
          width={800}
          height={600}
          src={images[0]}
        />
      </div>
    );
  }
  if (images.length > 1) {
    children = <ProductImageCarousel images={images} />;
  }
  return (
    <div className="w-full relative sm:max-w-screen-sm overflow-hidden">
      {children}
    </div>
  );
};
