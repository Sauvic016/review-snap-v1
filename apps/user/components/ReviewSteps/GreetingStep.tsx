"use client";

import GreetingCard from "@repo/ui/components/SellerCards/GreetingCard";
import { Image, MessageSquare, Star } from "lucide-react";

interface GreetingStepProps {
  title?: string;
  message?: string;
  questions?: string[];
  handleNext?: () => void;
  isClickable?: boolean;
}

export default function GreetingStep({
  title,
  questions,
  message,
  handleNext,
  isClickable = false,
}: Partial<GreetingStepProps>) {
  return (
    <div className="max-w-4xl mx-auto px-4  z-10">
      <GreetingCard
        title={title}
        message={message}
        questions={questions}
        handleNext={handleNext}
        isClickable={isClickable}
      />

      {/* CTA Button */}
      {
        /* <div className="text-center mt-12">
          <button
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full text-black font-semibold text-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/25"
            onClick={handleNext}
            disabled={!isClickable}
          >
            Start Your Review
          </button>
        </div> */
      }
    </div>
  );
}
