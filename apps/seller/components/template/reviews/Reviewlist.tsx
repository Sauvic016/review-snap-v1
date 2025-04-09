"use client";
import { useState } from "react";
import { Review } from "@/types/types";
import { PlusCircle, Share, StarIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import Reviewcard from "@/components/template/reviews/Reviewcard";
import { usePathname } from "next/navigation";

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

        {
          /* <div className="mt-6 pt-6 border-t border-yellow-500/10">
          <p className="text-sm text-gray-500">
            Need help getting started?{" "}
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 font-medium"
            >
              Check out our guide
            </a>
          </p>
        </div> */
        }
      </div>
    </div>
  );
}
