import React from "react";

import { Calendar, MessageSquare, Star, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { ReviewType } from "@repo/database/client";
interface ReviewData {
  name: string;
  email: string;
  rating: number;
  review: string;
  profileImage: string | null;
  additionalImage: string | null;
  videoReview: string | null;
  reviewType: ReviewType;
}
interface StepThreeProps {
  data: ReviewData;
}

const StepThreePreview = ({ data }: StepThreeProps) => {
  return (
    <div>
      {" "}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-amber-300 mb-6">
          Preview your review
        </h2>

        {/* Review Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-black/40 to-black/20 rounded-2xl border border-amber-400/20 shadow-xl">
          {/* Header Section */}
          <div className="p-6 pb-4 border-b border-amber-400/20">
            <div className="flex items-center gap-4">
              <div className="relative">
                {data && data.profileImage
                  ? (
                    <img
                      src={data.profileImage}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-amber-400 ring-offset-2 ring-offset-black/40"
                    />
                  )
                  : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-500/30 ring-2 ring-amber-400 ring-offset-2 ring-offset-black/40 flex items-center justify-center">
                      <User className="h-8 w-8 text-amber-400" />
                    </div>
                  )}
                <div className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full p-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-amber-200">
                  {data.name || "Anonymous"}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{JSON.stringify(formatDate(new Date()))}</span>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= data.rating
                        ? "text-yellow-400 fill-current drop-shadow-glow"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4 ">
            <div className="text-yellow-500 font-semibold text-xl leading-4 ">
              Your Response :
            </div>
            {data.reviewType === "TEXT"
              ? (
                <div className="flex items-center">
                  <MessageSquare className=" h-6 w-6 text-amber-400/20" />
                  <p className="text-gray-200 leading-relaxed pl-3">
                    {JSON.stringify(data.review) ||
                      "No review content provided."}
                  </p>
                </div>
              )
              : (
                data.videoReview && (
                  <div className="flex justify-center rounded-xl overflow-hidden bg-black/40 border border-amber-400/20">
                    <video
                      src={data.videoReview}
                      controls
                      className="h-64 object-cover "
                    />
                  </div>
                )
              )}
            {/* Additional Image */}
            {data.additionalImage && (
              <div className="mt-6 ">
                <div className="text-yellow-500 text-lg pl-1">
                  Attachments :
                </div>
                <div className=" flex  ">
                  <img
                    src={data.additionalImage}
                    alt="Additional"
                    className=" h-24 object-cover rounded-lg border border-amber-400/20"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div> */}
                </div>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="px-6 py-4 bg-gradient-to-r from-amber-400/20 to-yellow-500/30 border-t border-amber-400/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-200">Verified Review</span>
              <span className="text-gray-300">{data.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThreePreview;
