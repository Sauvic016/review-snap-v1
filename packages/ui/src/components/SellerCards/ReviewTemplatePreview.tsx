"use client";

import { Image, MessageSquare, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ReviewTemplatePreviewProps {
  title: string;
  message: string;
  questions: string[];
  isPreviewMode?: boolean;
}

export default function ReviewTemplatePreview({
  title,
  message,
  questions,
  isPreviewMode = false,
}: ReviewTemplatePreviewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = [
    {
      icon: Star,
      title: "Rate",
      desc: "Share your rating",
    },
    {
      icon: MessageSquare,
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
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      {isPreviewMode && (
        <h3 className="text-xl font-semibold text-amber-600 mb-6">
          Preview
        </h3>
      )}

      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-600">
          {title || "Template Title"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {message || "Introduction message will appear here"}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white/80 rounded-xl p-6 border border-amber-200 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Icon className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Questions Preview */}
      <div className="bg-white/80 rounded-xl p-8 border border-amber-200 shadow-sm">
        <h2 className="text-2xl font-semibold text-amber-600 mb-6">
          Questions We'll Ask
        </h2>
        <div className="space-y-4">
          {questions && questions.length > 0
            ? (
              questions.map((question, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center group-hover:bg-amber-200 transition-all duration-300">
                    <span className="text-amber-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {question}
                  </p>
                </div>
              ))
            )
            : <p className="text-gray-500">No questions added yet</p>}
        </div>
      </div>
    </div>
  );
}
