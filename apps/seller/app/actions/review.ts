"use server";

import prisma from "@repo/database/client";
import { getCurrentUser } from "@/lib/auth";

export async function getBookMarkedReviews(
  templateId: string,
) {
  try {
    const user = await getCurrentUser();

    // if (!user || user.id !== sellerId) {
    //   throw new Error("Unauthorized");
    // }

    // Build the query
    const whereClause: any = {
      sellerId: user?.id,
      isBookMarked: true,
    };

    // Add templateId to the query if provided
    // if (templateId && templateId !== "all") {
    whereClause.templateId = templateId;
    // }

    const bookmarkedReviews = await prisma.review.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return bookmarkedReviews;
  } catch (error) {
    console.error("Error fetching bookmarked reviews:", error);
    return [];
  }
}

export async function toggleBookMarkReview(reviewId: string, sellerId: string) {
  try {
    const user = await getCurrentUser();

    if (!user || user.id !== sellerId) {
      throw new Error("Unauthorized");
    }

    // Get current review
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
        sellerId: sellerId, // Ensure the review belongs to this seller
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
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    throw error;
  }
}
