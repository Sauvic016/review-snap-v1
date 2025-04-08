"use server";

import prisma from "@repo/database/client";
import { getCurrentUser } from "@/lib/auth";

export async function toggleBookmark(reviewId: string) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  // Get current review
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
      sellerId: user.id, // Ensure the review belongs to this seller
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  // Toggle bookmark status
  const updatedReview = await prisma.review.update({
    where: { id: reviewId },
    data: { isBookMarked: !review.isBookMarked },
  });

  return updatedReview;
}
