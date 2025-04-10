"use client";
import { useState, useEffect } from "react";
import { Review } from "@/types/types";
import { Share, StarIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import ReviewcardWrapper from "@/components/template/reviews/ReviewcardWrapper";
import { usePathname } from "next/navigation";

interface ReviewsListProps {
  reviews: Review[];
  onBookmarkToggle: (reviewId: string, isBookmarked: boolean) => void;
}

export default function ReviewsList({
  reviews,
  onBookmarkToggle,
}: ReviewsListProps) {
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

  // Distribute reviews across columns based on current column count
  const distributeReviews = () => {
    const columns: Review[][] = Array.from({ length: columnCount }, () => []);

    reviews.forEach((review, index) => {
      const columnIndex = index % columnCount;
      if (columns[columnIndex]) {
        columns[columnIndex].push(review);
      }
    });

    return columns;
  };

  if (reviews.length === 0) {
    return <EmptyReviewsState />;
  }

  const columns = distributeReviews();

  return (
    <div className="relative w-full ">
      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 m-4`}
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6">
            {column.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg h-auto"
              >
                <ReviewcardWrapper
                  key={review.id}
                  review={review}
                  onBookmarkToggle={onBookmarkToggle}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Empty state component
function EmptyReviewsState() {
  const [copySuccess, setCopySuccess] = useState(false);
  const pathname = usePathname();

  // Extract template ID from pathname
  // Path format: /template/[templateId]
  const templateId = pathname.split("/").pop() || "";

  const handleShareTemplate = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_USERAPP_URL}/review/${templateId}`,
    );
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  return (
    <div className="col-span-2 flex justify-center">
      <div className="w-full max-w-md p-8 text-center space-y-6 bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 rounded-xl border border-yellow-500/10">
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-zinc-800/50 rounded-full border border-yellow-500/20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 animate-pulse"></div>
          <StarIcon className="relative z-10 w-16 h-16 text-yellow-500 opacity-80" />
        </div>

        <h3 className="text-2xl font-semibold text-yellow-500">
          No reviews yet!
        </h3>

        <p className="text-gray-400">
          Share your template with customers to start collecting valuable
          testimonials and feedback.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleShareTemplate}
            variant="outline"
            size="lg"
            className="border-yellow-500/30 bg-black text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-all relative"
          >
            <Share className="mr-2 h-4 w-4" />
            Share Template
            {copySuccess && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                ✓
              </span>
            )}
          </Button>
        </div>

        {copySuccess && (
          <div className="mt-2 text-green-400 text-sm animate-fade-in">
            Template URL copied to clipboard!
          </div>
        )}

        {/* <div className="mt-6 pt-6 border-t border-yellow-500/10">
          <p className="text-sm text-gray-500">
            Need help getting started?{" "}
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 font-medium"
            >
              Check out our guide
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
