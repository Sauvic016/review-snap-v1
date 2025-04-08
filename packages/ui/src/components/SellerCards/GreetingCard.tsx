"use client";
import { useEffect, useState } from "react";
import { Image, MessageCircleCodeIcon, Star } from "lucide-react";
import { Button } from "../ui/button";

interface GreetingCardProps {
  title?: string;
  message?: string;
  questions?: string[];
  handleNext?: () => void;
  isClickable?: boolean;
}

export default function GreetingCard({
  title,
  message,
  questions,
  handleNext,
  isClickable,
}: GreetingCardProps) {
  const [isMounted, setIsMounted] = useState<Boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const features = [
    {
      icon: Star,
      title: "Rate",
      desc: "Share your rating",
      fill: "#f59e0b",
    },
    {
      icon: MessageCircleCodeIcon,
      title: "Review",
      desc: "Write your thoughts",
    },
    {
      icon: Image,
      title: "Upload",
      desc: "Add photos",
    },
  ];

  if (!isMounted) {
    return null; // or a loading skeleton
  }
  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <div className="text-center space-y-4 ">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-600">
          {title || "Template Title"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {message || "Introduction message will appear here"}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 ">
        {features.map((feature, idx) => {
          const Icon = feature.icon;

          return (
            <div
              key={idx}
              className="bg-amber-100 rounded-xl p-6  shadow-lg transition-all duration-300"
            >
              <div className="flex gap-2 items-center">
                <Icon
                  fill={feature.fill ? feature.fill : "transparent"}
                  className="w-8 h-8  text-amber-500 mb-4"
                />
                <h3 className="text-xl font-semibold text-black mb-2">
                  {feature.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm  ">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Questions Preview */}
      <h2 className="text-xl font-semibold text-amber-600 ">
        Questions We'll Ask
      </h2>
      <div className="bg-amber-100 rounded-xl p-2 border border-amber-500/20">
        <div className="space-y-1">
          {questions && questions.length > 0
            ? (
              questions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center ">
                    <span className="text-amber-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-600 ">{question}</p>
                </div>
              ))
            )
            : <p className="text-gray-500">No questions added yet</p>}
        </div>
      </div>

      <div className="text-center ">
        <Button
          className="px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full text-white font-semibold text-lg hover:from-amber-400 hover:to-yellow-500 transform hover:scale-x-105 transition-all duration-300 shadow-lg shadow-amber-500/25"
          onClick={handleNext}
        >
          Start Your Review
        </Button>
        {/* </div> */}
      </div>
    </div>
  );
}
