"use client";

import { Review } from "@/types/types";
import { PlusCircle, Share, StarIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import Reviewcard from "@/components/template/reviews/Reviewcard";

interface ReviewsListProps {
  reviews: Review[];
  onBookmarkToggle: (reviewId: string, isBookmarked: boolean) => void;
}

export default function ReviewsList(
  { reviews, onBookmarkToggle }: ReviewsListProps,
) {
  if (reviews.length === 0) {
    return <EmptyReviewsState />;
  }

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
      {reviews.map((review: Review, index: number) => {
        // Make video reviews large, and every 5th non-video review large
        const hasVideo = review.videoUrl != null &&
          review.videoUrl.length !== 0;
        const isLarge = hasVideo || index % 5 === 0;

        return (
          <div
            key={review.id}
            className={`
              col-span-1
              ${isLarge ? "lg:col-span-8" : "lg:col-span-4"}
              ${hasVideo ? "h-[400px]" : "h-[250px] lg:h-[300px]"}
            `}
          >
            <Reviewcard
              review={review}
              onBookmarkToggle={onBookmarkToggle}
            />
          </div>
        );
      })}
    </div>
  );
}

// Empty state component
function EmptyReviewsState() {
  return (
    <div className="col-span-2 flex justify-center">
      <div className="w-full max-w-md p-8 text-center space-y-6 bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 rounded-xl border border-yellow-500/10">
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-zinc-800/50 rounded-full border border-yellow-500/20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 animate-pulse">
          </div>
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
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black transition-all shadow-lg hover:shadow-yellow-500/25"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Manual Review
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-all"
          >
            <Share className="mr-2 h-4 w-4" />
            Share Template
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-yellow-500/10">
          <p className="text-sm text-gray-500">
            Need help getting started?{" "}
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 font-medium"
            >
              Check out our guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
