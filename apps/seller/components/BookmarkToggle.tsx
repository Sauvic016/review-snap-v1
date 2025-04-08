"use client";

import { Bookmark } from "lucide-react";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toggleBookmark } from "@/app/actions/toggle-bookmark";
import { cn } from "@repo/ui/lib/utils";

interface BookmarkToggleProps {
  reviewId: string;
  initialBookmarked?: boolean;
  onToggle?: (reviewId: string, isBookmarked: boolean) => void;
}

const BookmarkToggle = memo(
  ({ reviewId, initialBookmarked = false, onToggle }: BookmarkToggleProps) => {
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Update state when props change
    useEffect(() => {
      setIsBookmarked(initialBookmarked);
    }, [initialBookmarked]);

    // Memoize the toggle function to prevent recreating on each render
    const handleToggle = useCallback(async () => {
      if (isLoading) return;

      try {
        // Clear any previous errors
        setError(null);

        // Optimistically update UI
        const newState = !isBookmarked;
        setIsBookmarked(newState);
        setIsLoading(true);

        // Call the server action
        const updatedReview = await toggleBookmark(reviewId);

        // Update state with server response
        setIsBookmarked(updatedReview.isBookMarked);

        // Notify parent component
        if (onToggle) {
          onToggle(reviewId, updatedReview.isBookMarked);
        }
      } catch (error) {
        // Revert to previous state
        console.error("Error toggling bookmark:", error);
        setIsBookmarked(isBookmarked);
        setError("Failed to update bookmark");

        // Clear error after 3 seconds
        setTimeout(() => setError(null), 3000);
      } finally {
        setIsLoading(false);
      }
    }, [reviewId, isBookmarked, isLoading, onToggle]);

    return (
      <div className="relative">
        {error && (
          <div className="absolute -top-8 right-0 bg-red-500 text-white text-xs p-1 rounded whitespace-nowrap">
            {error}
          </div>
        )}
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={cn(
            "p-1.5 rounded-full transition-all",
            isLoading ? "opacity-50 animate-pulse" : "hover:bg-slate-700",
            isBookmarked && "text-yellow-400",
          )}
          aria-label={isBookmarked
            ? "Remove from Wall of Love"
            : "Add to Wall of Love"}
          title={isBookmarked
            ? "Remove from Wall of Love"
            : "Add to Wall of Love"}
        >
          <Bookmark
            className={cn(
              "w-5 h-5 transition-all",
              isBookmarked && "fill-yellow-400",
            )}
          />
        </button>
      </div>
    );
  },
);

BookmarkToggle.displayName = "BookmarkToggle";

export default BookmarkToggle;
