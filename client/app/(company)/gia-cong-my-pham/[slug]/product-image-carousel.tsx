"use client";
import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ProductImageCarouselProps = {
  images: string[];
};

export const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaMainApi, setEmblaMainApi] = React.useState<CarouselApi>();

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, setSelectedIndex]);

  React.useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);
  return (
    <div className="flex flex-col gap-2">
      <Carousel setApi={setEmblaMainApi} className="w-full">
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-4">
              <div className="bg-muted rounded-lg overflow-hidden">
                <Image
                  alt=""
                  className="object-contain aspect-[4/3]"
                  priority
                  sizes="100vw"
                  width={800}
                  height={600}
                  src={image}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-0 w-full h-10 flex items-center justify-center gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full",
                selectedIndex == index ? "bg-primary" : "bg-accent"
              )}
              onClick={() => onThumbClick(index)}
            />
          ))}
        </div>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </div>
  );
};
