"use client";

import { Review } from "@repo/database/client";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Star } from "lucide-react";
import BookmarkToggle from "@/components/BookmarkToggle";
import { useEffect, useMemo, useState } from "react";
import VideoPlayer from "@/components/template/reviews/VideoPlayer";

interface ReviewcardProps {
  review: Review;
  onBookmarkToggle?: (reviewId: string, isBookmarked: boolean) => void;
  showBookmark?: boolean;
}

export default function Reviewcard(
  { review, onBookmarkToggle, showBookmark = true }: ReviewcardProps,
) {
  const ratingStars = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < (review.rating ?? 0)
            ? "fill-yellow-500 text-yellow-500"
            : "text-gray-600"
        }`}
      />
    ));
  }, [review.rating]);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Format the date only on the client side
    const date = new Date(review.updatedAt).toLocaleDateString();
    setFormattedDate(date);
  }, [review.updatedAt, review.responses]);

  const avatarSrc = review.customerPhoto || undefined;
  const customerInitial = review.customerName.charAt(0);

  return (
    <Card className="h-full overflow-hidden bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-yellow-500/20 hover:border-yellow-400/30 transition-all shadow-lg">
      <CardContent className="py-6 h-full flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="border-2 border-yellow-500/30">
              <AvatarImage
                src={avatarSrc}
                alt={review.customerName}
                loading="lazy"
              />
              <AvatarFallback className="bg-yellow-500/10 text-yellow-500">
                {customerInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">
                {review.customerName}
              </p>
              <p className="text-xs text-gray-400">{formattedDate}</p>
            </div>
          </div>

          {showBookmark && onBookmarkToggle && (
            <BookmarkToggle
              reviewId={review.id}
              initialBookmarked={review.isBookMarked || false}
              onToggle={onBookmarkToggle}
            />
          )}
        </div>

        <div className="mt-3 flex">{ratingStars}</div>

        <div className="mt-4 text-sm text-gray-300 flex-grow">
          {!review.responses && review.videoUrl != null &&
              review?.videoUrl.length != 0
            ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-full lg:w-[420px] max-w-full">
                  <div className="w-full aspect-video">
                    <VideoPlayer url={review.videoUrl} />
                  </div>
                </div>
              </div>
            )
            : !review.responses
            ? (
              ""
            )
            : <div className="text-bold text-2xl pt-6">{review.responses}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
