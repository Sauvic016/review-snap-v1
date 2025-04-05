"use client";

import { useEffect, useRef, useState } from "react";
import { StepOneProps } from "@/lib/types";

export const useVideoRecording = (
  setData: StepOneProps["setData"],
  handleVideoChange?: (file: File | null) => void,
) => {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [maxRecordingTime] = useState(120);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setData((prev) => ({ ...prev, videoSource: "record" }));
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Cannot access camera or microphone");
    }
  };

  const startRecording = () => {
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          beginRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const beginRecording = () => {
    if (!streamRef.current) return;

    setIsRecording(true);
    setRecordingTime(0);

    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current = mediaRecorder;

    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });

      // Create a unique filename with extension
      const fileName = `${Date.now()}_webcam_recording.webm`;

      const file = new File([blob], fileName, {
        type: blob.type,
      });

      // Update the data state with URL
      const videoURL = URL.createObjectURL(file);
      setData((prev) => ({ ...prev, videoReview: videoURL }));

      // Pass the file to parent
      if (handleVideoChange) {
        handleVideoChange(file);
      }

      // Clear the timer when recording stops
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    mediaRecorder.start();

    // Start the recording timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        const newTime = prev + 1;
        // Automatically stop recording when max time is reached
        if (newTime >= maxRecordingTime) {
          stopRecording();
          return maxRecordingTime;
        }
        return newTime;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Clear the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the video duration exceeds 2 minutes (120 seconds)
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);

      videoElement.onloadedmetadata = () => {
        if (videoElement.duration > 120) {
          alert("The video cannot be longer than 2 minutes.");
          return;
        }

        const url = URL.createObjectURL(file);
        // Update data state with URL
        setData((prev) => ({
          ...prev,
          videoReview: url,
          videoSource: "upload",
        }));

        // Also pass the blob to parent
        if (handleVideoChange) {
          handleVideoChange(file);
        }
      };
    }
  };

  const resetVideo = () => {
    setData((prev) => ({
      ...prev,
      videoReview: null,
      videoSource: undefined,
    }));
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    isRecording,
    countdown,
    recordingTime,
    maxRecordingTime,
    videoRef,
    startVideoStream,
    startRecording,
    stopRecording,
    handleVideoUpload,
    resetVideo,
  };
};
