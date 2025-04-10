"use client";

import { Review } from "@repo/database/client";
import { useEffect, useState } from "react";
import ReviewCardSP from "@repo/ui/components/Reviewcard";
import BookmarkToggle from "@/components/BookmarkToggle";

interface ReviewcardWrapperProps {
  review: Review;
  onBookmarkToggle?: (reviewId: string, isBookmarked: boolean) => void;
  showBookmark?: boolean;
}

export default function ReviewcardWrapper(
  { review, onBookmarkToggle, showBookmark = true }: ReviewcardWrapperProps,
) {
  const [formattedDate, setFormattedDate] = useState<Date | undefined>(
    undefined,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Format the date only on the client side
    const date = new Date(review.updatedAt);
    setFormattedDate(date);

    // Set mounted state after a short delay to ensure DOM is painted
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [review.updatedAt]);

  // Custom bookmark toggle handler
  const handleBookmarkToggle = (reviewId: string, isBookmarked: boolean) => {
    if (onBookmarkToggle) {
      onBookmarkToggle(reviewId, isBookmarked);
    }
  };

  // Custom bookmark toggle component
  const BookmarkToggleComponent = () => {
    if (!showBookmark || !isMounted) return null;

    return (
      <div className="absolute top-4 right-4">
        <BookmarkToggle
          reviewId={review.id}
          initialBookmarked={review.isBookMarked || false}
          onToggle={handleBookmarkToggle}
        />
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <ReviewCardSP
        email={review.customerEmail || ""}
        profileImageSrc={review.customerPhoto}
        name={review.customerName}
        rating={review.rating || 0}
        videoSrc={review.videoUrl}
        reviewType={review.type}
        review={review.responses}
        seller={true}
        reviewDate={formattedDate}
        // showBookmark={false} // We're handling bookmark separately
      />
      <BookmarkToggleComponent />
    </div>
  );
}
