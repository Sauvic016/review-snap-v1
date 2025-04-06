"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  CrossIcon,
  Image as ImageIcon,
  MessageSquare,
  Star,
  Upload,
  Video,
  X,
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { StepOneProps } from "@/lib/types";
import { useVideoRecording } from "@/hooks/useVideoRecording";
import { formatTime } from "@/lib/utils";
import { Textarea } from "@repo/ui/components/ui/textarea";

// ============= Video Recording Functions =============

// Main Component
const StepOne = ({
  setData,
  data,
  handleFileUpload,
  handleRatingClick,
  questions,
  handleVideoChange,
}: StepOneProps) => {
  const videoControls = useVideoRecording(setData, handleVideoChange);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-amber-600 ">
        Share your experience
      </h2>

      {/* Questions Section */}
      <h3 className="text-amber-500 font-medium ">
        Please answer these questions in your review:
      </h3>
      {questions && questions.length > 0 && (
        <div className="bg-gradient-to-r from-amber-400/20 to-yellow-500/20 text-amber-600 rounded-lg cursor-pointer hover:from-amber-400/30 hover:to-yellow-500/30 border border-amber-400/40  p-2  ">
          <ul className="space-y-2">
            {questions.map((question, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 group text-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/30 border border-amber-500/20 flex items-center justify-center ">
                  <span className="text-amber-600 font-medium">
                    {index + 1}
                  </span>
                </div>
                <p className="text-gray-600 ">{question}</p>
              </div>
            ))}
          </ul>
        </div>
      )}

      {/* Rating */}
      {/* <div className="space-y-2"> */}

      {/* </div> */}

      {/* Review Type Selection */}
      <div className="flex gap-4 ">
        <button
          onClick={() => {
            setData((prev) => ({
              ...prev,
              reviewType: "TEXT",
              //clear video review
              videoReview: null,
            }));
            videoControls.resetVideo();
          }}
          className={`flex-1 p-2 rounded-lg border ${
            data.reviewType === "TEXT"
              ? "bg-gradient-to-r from-amber-400/20 to-yellow-500/20 text-amber-600 rounded-lg cursor-pointer  border border-amber-500"
              : "hover:from-amber-400/30 hover:to-yellow-500/30 border-amber-500"
          } transition-all duration-200`}
        >
          <MessageSquare className="h-6 w-6 mx-auto  text-amber-600" />
          <span className="block text-amber-500">Text Review</span>
        </button>
        <button
          onClick={() =>
            setData((prev) => ({ ...prev, reviewType: "VIDEO", review: "" }))}
          className={` flex-1 p-2 rounded-lg border ${
            data.reviewType === "VIDEO"
              ? "border-amber-500 bg-amber-100"
              : "border-amber-500"
          } transition-all duration-200`}
        >
          <Video className="h-6 w-6 mx-auto  text-amber-600" />
          <span className="block text-amber-500">Video Review</span>
        </button>
      </div>

      {/* Review Content */}
      {data.reviewType === "TEXT"
        ? (
          <Textarea
            value={data.review}
            onChange={(e) =>
              setData((prev) => ({ ...prev, review: e.target.value }))}
            className="h-40 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-lg cursor-pointer   border-2 border-amber-400 focus-visible:ring-0 focus:ring-0 focus:outline-none focus:border-0 text-slate-800 placeholder:text-amber-800 focus:outline-amber-500"
            placeholder="Share your experience..."
          />
        )
        : (
          <div className="border-2 border-dashed border-amber-400 rounded-lg p-6">
            {/* Display recorded or uploaded video if there is one */}
            {data.videoReview
              ? (
                <div className="relative">
                  <video
                    src={data.videoReview}
                    className="w-full h-56 object-contain rounded-lg"
                    controls
                  />
                  <button
                    onClick={videoControls.resetVideo}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )
              : (
                <>
                  {/* Video recording UI */}
                  {data.videoSource === "record"
                    ? (
                      <div className="text-center space-y-4">
                        <div className="relative">
                          <video
                            ref={videoControls.videoRef}
                            autoPlay
                            muted
                            className="w-full h-56 object-cover rounded-lg bg-black/40"
                          />

                          {/* Countdown overlay */}
                          {videoControls.countdown > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                              <div className="text-6xl font-bold text-amber-600">
                                {videoControls.countdown}
                              </div>
                            </div>
                          )}

                          {/* Recording timer overlay */}
                          {videoControls.isRecording && (
                            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center">
                              <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse">
                              </div>
                              <span>
                                {formatTime(
                                  videoControls.recordingTime,
                                )}
                              </span>
                              <span className="ml-2 text-xs text-gray-300">
                                / {formatTime(
                                  videoControls.maxRecordingTime,
                                )}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-center gap-3 ">
                          {videoControls.isRecording
                            ? (
                              <Button
                                onClick={videoControls.stopRecording}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Stop Recording ({formatTime(
                                  videoControls.maxRecordingTime -
                                    videoControls.recordingTime,
                                )} left)
                              </Button>
                            )
                            : (
                              <Button
                                onClick={videoControls.startRecording}
                                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black"
                              >
                                Start Recording (Max 2 min)
                              </Button>
                            )}

                          <Button
                            onClick={videoControls.resetVideo}
                            variant="outline"
                            className="border-amber-400/30 text-amber-600"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )
                    : (
                      // Video options (record or upload)
                      <div className="text-center space-y-4">
                        <Video className="h-12 w-12 mx-auto mb-4 text-amber-600" />
                        <p className="text-amber-500 mb-2">
                          Choose how to add your video review
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            onClick={videoControls.startVideoStream}
                            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black"
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Record with Webcam
                          </Button>

                          <div>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={videoControls.handleVideoUpload}
                              className="hidden"
                              id="video-upload"
                            />
                            <label
                              htmlFor="video-upload"
                              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 text-amber-600 rounded-lg cursor-pointer hover:from-amber-400/30 hover:to-yellow-500/30 border border-amber-400/40"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Video
                            </label>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm ">
                          Maximum size: 100MB
                        </p>
                      </div>
                    )}
                </>
              )}
          </div>
        )}
      <div className="flex justify-around flex-row-reverse">
        <div className="flex flex-col gap-4 items-center">
          <label className="block text-amber-500  font-medium ">
            Your Rating
          </label>
          <div className="flex ">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  data.rating >= rating
                    ? "text-yellow-400 scale-110"
                    : "text-gray-500 hover:text-yellow-400"
                }`}
              >
                <Star className="h-5 w-5 fill-current" />
              </button>
            ))}
          </div>
        </div>
        <div>
          {/* <div className="space-y-2"> */}
          <label className="block text-amber-500 font-medium">
            Attachments (Optional)
          </label>
          {
            /*
 <button
                onClick={() =>
                  setData((prev) => ({ ...prev, additionalImage: null }))}
                className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white"
              >
                <X className="h-4 w-4" />
              </button>
          */
          }
          {data.additionalImage && (
            <div className="w-full flex justify-end">
              <button
                onClick={() =>
                  setData((prev) => ({ ...prev, additionalImage: null }))}
                className=" p-1.5 bg-red-500 rounded-full text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="w-40 border border-dashed border-amber-400 rounded-lg p-2 text-center">
            {data.additionalImage
              ? (
                <div className="flex justify-center">
                  <img
                    src={data.additionalImage}
                    alt="Additional preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              )
              : (
                <div className="flex flex-col gap-2">
                  <ImageIcon className="h-8 w-8 mx-auto   text-amber-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "additional")}
                    className="hidden"
                    id="additional-upload"
                  />
                  <label
                    htmlFor="additional-upload"
                    className="inline-block py-1 text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-lg cursor-pointer hover:from-amber-500 hover:to-yellow-600 transition-all duration-200"
                  >
                    Choose Image
                  </label>
                </div>
              )}
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
