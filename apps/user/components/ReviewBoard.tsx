"use client";

import React, { useState } from "react";

import { createReview } from "@/app/actions/create-review";

import GreetingStep from "@/components/ReviewSteps/GreetingStep";
import StepOne from "@/components/ReviewSteps/StepOne";
import StepTwo from "@/components/ReviewSteps/StepTwo";
import StepThreePreview from "@/components/ReviewSteps/StepThreePreview";
import SubmissionSuccess from "@/components/SubmissionSucsess";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardWrapper } from "@repo/ui/components/CardWrapper";
import { ReviewData } from "@/lib/types";
import axios from "axios";

interface ReviewFormWrapperProps {
  title: string;
  message: string;
  questions: string[];
  sellerId: string;
  templateId: string;
}

export default function ReviewFormWrapper(
  { title, message, questions, sellerId, templateId }: ReviewFormWrapperProps,
) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ReviewData>({
    name: "",
    email: "",
    rating: 5,
    review: "",
    profileImage: null,
    additionalImage: null,
    videoReview: null,
    reviewType: "TEXT",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleRatingClick = (rating: number) => {
    setData((prev) => ({ ...prev, rating }));
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "additional",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData((prev) => ({
        ...prev,
        [type === "profile" ? "profileImage" : "additionalImage"]: url,
      }));
    }
  };

  const handleVideoChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setData((prev) => ({ ...prev, videoReview: url }));

      setVideoFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!data.name.trim() || !data.email.trim()) {
      return;
    }

    try {
      const submittedReview = await createReview(
        sellerId,
        templateId,
        data.name,
        data.email,
        data.reviewType,
        data.review,
        data.rating,
        "",
        "",
      );

      if (data.reviewType === "VIDEO" && videoFile) {
        const formData = new FormData();
        console.log(videoFile);
        formData.append("video", videoFile);
        formData.append("reference_id", submittedReview.id);
        console.log("formData");
        console.table([...formData]);
        console.time();
        const uploadResponse = await axios.post(
          "http://localhost:3002/upload-video",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.timeEnd();

        if (uploadResponse.status === 200) {
          console.log("Video uploaded successfully!");
        } else {
          console.error("Upload failed:", uploadResponse.statusText);
        }
      }
      setStep(5);
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const handleClose = () => {
    //Reset all state to initial value
    setStep(1);
    setData({
      name: "",
      email: "",
      rating: 5,
      review: "",
      profileImage: null,
      additionalImage: null,
      videoReview: null,
      reviewType: "TEXT",
    });
    setVideoFile(null);
    setIsSubmitted(false);
  };

  const renderPage = () => {
    switch (step) {
      case 1:
        return (
          <GreetingStep
            title={title}
            questions={questions}
            message={message}
            handleNext={handleNext}
            isClickable={true}
          />
        );
      case 2:
        return (
          <StepOne
            data={data}
            handleFileUpload={handleFileUpload}
            handleRatingClick={handleRatingClick}
            setData={setData}
            questions={questions}
            handleVideoChange={handleVideoChange}
          />
        );
      case 3:
        return (
          <StepTwo
            data={data}
            handleFileUpload={handleFileUpload}
            setData={setData}
          />
        );
      case 4:
        return <StepThreePreview data={data} />;
      case 5:
        return <SubmissionSuccess onClose={handleClose} />;
      default:
        return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Form Container */}
        {/* <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8"> */}
        <CardWrapper>
          {renderPage()}
          <div className="flex justify-between mt-8">
            {step > 1 && step < 5 && (
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Back
              </button>
            )}
            <div className="ml-auto">
              {step > 1 && step < 4
                ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200"
                  >
                    Next
                    {/* <ChevronRight className="h-5 w-5 ml-2" /> */}
                  </button>
                )
                : (
                  step > 1 &&
                  step < 5 && (
                    <button
                      onClick={handleSubmit}
                      className="flex items-center px-6 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200"
                    >
                      Submit Review
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </button>
                  )
                )}
            </div>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}
