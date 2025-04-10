"use client";

import { useEffect, useRef, useState } from "react";
import { Review } from "@/types/types";
// import ReviewCard from "@/components/template/reviews/Reviewcard";
import ReviewCardSP from "@repo/ui/components/Reviewcard";

interface GridViewProps {
  testimonials: Review[];
}

export default function MovingGridView({ testimonials }: GridViewProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [columnCount, setColumnCount] = useState(3);
  const columnRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

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

  // Distribute images across columns based on current column count
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

  // Duplicate images for infinite scroll effect
  const duplicatedColumns = columns.map((column) => [...column, ...column]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleCardHover = (columnIndex: number, isHovering: boolean) => {
    // Make sure we have a valid column reference
    if (columnIndex < 0 || columnIndex >= columnRefs.length) return;

    const columnRef = columnRefs[columnIndex];
    if (!columnRef || !columnRef.current) return;

    const columnElement = columnRef.current;
    const scrollContainer = columnElement.querySelector(
      ".scroll-container",
    ) as HTMLElement;

    if (!scrollContainer) return;

    if (isHovering) {
      // Get the current transform value
      const computedStyle = window.getComputedStyle(scrollContainer);
      const transform = computedStyle.getPropertyValue("transform");

      // Apply the current transform as a style to pause at the exact position
      scrollContainer.style.transform = transform;
      scrollContainer.style.animationPlayState = "paused";
    } else {
      // Resume animation by removing the inline style
      scrollContainer.style.transform = "";
      scrollContainer.style.animationPlayState = "";
    }
  };

  // Animation classes based on column index
  const getAnimationClass = (index: number) => {
    if (isPaused) return "pause-animation";

    // Different animation speeds for visual interest
    if (index === 0) return "animate-scroll-slow";
    if (index === 1) return "animate-scroll-medium";
    return "animate-scroll-fast";
  };

  return (
    <div className="relative w-full ">
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {duplicatedColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            ref={columnRefs[columnIndex]}
            className="h-[80vh] overflow-hidden"
          >
            <div
              className={`scroll-container flex flex-col gap-6 ${
                getAnimationClass(columnIndex)
              }`}
            >
              {column.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg h-auto"
                  onMouseEnter={() => handleCardHover(columnIndex, true)}
                  onMouseLeave={() => handleCardHover(columnIndex, false)}
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
          </div>
        ))}
      </div>
    </div>
  );
}
