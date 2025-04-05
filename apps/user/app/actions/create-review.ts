"use server";
import prisma, { ReviewType } from "@repo/database/client";

export const createReview = async (
  sellerId: string,
  templateId: string,
  customerName: string,
  customerEmail: string,
  type: ReviewType,
  responses?: string,
  rating?: number,
  videoUrl?: string,
  videoStatus?: string,
) => {
  const myreview = await prisma.review.create({
    data: {
      sellerId,
      templateId,
      customerName,
      customerEmail,
      type,
      responses,
      videoUrl,
      videoStatus,
      rating,
      isBookMarked: false,
    },
  });

  return myreview;
};
