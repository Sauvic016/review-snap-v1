"use client";
import React from "react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import GenericCard from "@repo/ui/components/SellerCards/GenericCardWrapper";

interface TemplateCardProps {
  title: string;
  reviewCount: number;
  lastUpdated: string | Date;

  id: string;
}

const TemplateCard = (
  { title, reviewCount, lastUpdated, id }: TemplateCardProps,
) => {
  // Format the date if it's a Date object
  const formattedDate = lastUpdated instanceof Date
    ? lastUpdated.toLocaleDateString()
    : lastUpdated;
  const router = useRouter();

  const footer = (
    <div className="flex justify-between items-center ">
      <button className="text-yellow-500 hover:text-yellow-600 font-medium text-sm">
        View Details
      </button>
      <button className="text-gray-400 hover:text-gray-500">
        <Settings className="h-5 w-5" />
      </button>
    </div>
  );

  return (
    <GenericCard
      title={title}
      onClick={() => router.push(`template/${id}`)}
      footer={footer}
    >
      <div className=" flex justify-between text-sm text-gray-500 mt-2 p-4">
        <span>{reviewCount} reviews</span>
        <span>Updated {formattedDate}</span>
      </div>
    </GenericCard>
  );
};

export default TemplateCard;
