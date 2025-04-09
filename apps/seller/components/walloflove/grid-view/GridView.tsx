"use client";
import { useEffect, useRef } from "react";
import { Review } from "@/types/types";
// import ReviewCard from "@/components/template/reviews/Reviewcard";
import ReviewCardSP from "@repo/ui/components/Reviewcard";
// import type { Testimonial } from "@/lib/data"

interface GridViewProps {
  testimonials: Review[];
}

export function GridView({ testimonials }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
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
          // additionalImageSrc={"testimonial"}
        />
      ))}
    </div>
  );
}

export function MovingGridView({ testimonials }: GridViewProps) {
  // Create columns of testimonials
  const createColumns = () => {
    const columns: Review[][] = [[], [], []];

    // Distribute testimonials across columns
    testimonials.forEach((testimonial, index) => {
      const columnIndex = index % 3;
      columns[columnIndex]?.push(testimonial);
    });

    return columns;
  };

  const columns = createColumns();
  const columnRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Set up the infinite scroll
  useEffect(() => {
    // For each column
    columnRefs.forEach((columnRef, index) => {
      if (!columnRef.current) return;

      const column = columnRef.current;
      const scrollContainer = column.querySelector(
        ".scroll-container",
      ) as HTMLElement;

      if (!scrollContainer) return;

      // Clone the content for infinite scroll
      const content = scrollContainer.querySelector(".content") as HTMLElement;
      if (!content) return;

      // Function to clone content and append it
      const cloneAndAppend = () => {
        const clone = content.cloneNode(true) as HTMLElement;
        scrollContainer.appendChild(clone);
      };

      // Add initial clone
      cloneAndAppend();

      // Set up the animation
      let animationId: number;
      let startTime: number | null = null;
      const duration = 30000 + index * 5000; // Different speed for each column (30s, 35s, 40s)

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // Calculate how far we've scrolled (0 to content height)
        const contentHeight = content.offsetHeight;
        const scrollPosition = ((elapsed % duration) / duration) *
          contentHeight;

        // Apply the scroll
        scrollContainer.style.transform = `translateY(-${scrollPosition}px)`;

        // If we've scrolled past the first content block, reset
        if (scrollPosition >= contentHeight) {
          startTime = timestamp - (elapsed % duration);
        }

        animationId = requestAnimationFrame(animate);
      };

      // Start the animation
      animationId = requestAnimationFrame(animate);

      // Clean up
      return () => {
        cancelAnimationFrame(animationId);
      };
    });
  }, []);

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            ref={columnRefs[columnIndex]}
            className="overflow-hidden h-[800px] relative"
          >
            <div className="scroll-container absolute w-full">
              <div className="content">
                {column.map((testimonial) => (
                  <div key={testimonial.id} className="mb-6">
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
                ))}
              </div>
              {/* Clones will be added here by JavaScript */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
