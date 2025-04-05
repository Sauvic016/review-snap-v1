"use client";

import { Image, MessageSquare, Star } from "lucide-react";

interface GreetingStepProps {
  title: string;
  message: string;
  questions: string[];
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
    <div className="min-h-screen  py-2 text-white">
      <div className="max-w-4xl mx-auto px-4  z-10">
        {/* Main Content Card */}
        <div className="">
          {/* Title Section */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold  text-yellow-500">
              {title}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">{message}</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Star className="w-8 h-8 text-amber-400 mb-4" />,
                title: "Rate",
                desc: "Share your rating",
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-amber-400 mb-4" />,
                title: "Review",
                desc: "Write your thoughts",
              },
              {
                icon: <Image className="w-8 h-8 text-amber-400 mb-4" />,
                title: "Upload",
                desc: "Add photos",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-zinc-800/30 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Questions Preview */}
          <div className="bg-zinc-800/30 rounded-xl p-8 border border-amber-500/20">
            <h2 className="text-2xl font-semibold text-amber-400 mb-6">
              Questions We'll Ask
            </h2>
            <div className="space-y-4">
              {questions &&
                questions.length > 0 &&
                questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300">
                      <span className="text-amber-400">{index + 1}</span>
                    </div>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {question}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full text-black font-semibold text-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/25"
              onClick={handleNext}
              disabled={!isClickable}
            >
              Start Your Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
