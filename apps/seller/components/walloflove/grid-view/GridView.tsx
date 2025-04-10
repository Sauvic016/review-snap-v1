"use client";
import { useEffect, useState } from "react";
import { Review } from "@/types/types";
// import ReviewCard from "@/components/template/reviews/Reviewcard";
import ReviewCardSP from "@repo/ui/components/Reviewcard";
// import type { Testimonial } from "@/lib/data"

interface GridViewProps {
  testimonials: Review[];
}

export function GridView({ testimonials }: GridViewProps) {
  const [columnCount, setColumnCount] = useState(3);

  // Handle responsive column count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };

    // Set initial column count
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Distribute testimonials across columns based on current column count
  const distributeTestimonials = () => {
    const columns: Review[][] = Array.from({ length: columnCount }, () => []);

    testimonials.forEach((testimonial, index) => {
      const columnIndex = index % columnCount;
      if (columns[columnIndex]) {
        columns[columnIndex].push(testimonial);
      }
    });

    return columns;
  };

  const columns = distributeTestimonials();

  return (
    <div className="relative w-full">
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col gap-6"
          >
            {column.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg h-auto"
              >
                <ReviewCardSP
                  key={testimonial.id}
                  email={testimonial.customerEmail!}
                  profileImageSrc={testimonial?.customerPhoto}
                  name={testimonial.customerName}
                  rating={testimonial.rating!}
                  review={testimonial?.responses}
                  videoSrc={testimonial?.videoUrl}
                  reviewType={testimonial.type}
                  seller
                  reviewDate={new Date(testimonial.createdAt)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
