"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/ui/carousel";

import { useIsMobile } from "@repo/ui/hooks/use-mobile";
import { Review } from "@/types/types";
import ReviewCardSP from "@repo/ui/components/Reviewcard";

interface SliderViewProps {
  testimonials: Review[];
}

export function SliderView({ testimonials }: SliderViewProps) {
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-5xl mx-auto px-4  ">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className={isMobile ? "basis-full" : "basis-1/2 lg:basis-1/3"}
            >
              <div className="p-1">
                <ReviewCardSP
                  email={testimonial.customerEmail!}
                  profileImageSrc={testimonial?.customerPhoto}
                  name={testimonial.customerName}
                  rating={testimonial.rating!}
                  review={testimonial?.responses}
                  videoSrc={testimonial?.videoUrl}
                  reviewType={testimonial.type}
                  seller
                  reviewDate={testimonial.createdAt}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8 gap-4">
          <CarouselPrevious className="bg-black" />
          <CarouselNext className="bg-black" />
        </div>
      </Carousel>
    </div>
  );
}
