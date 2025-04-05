import { ReviewType } from "@repo/database/client";

export interface ReviewData {
  name: string;
  email: string;
  rating: number;
  review: string;
  profileImage: string | null;
  additionalImage: string | null;
  videoReview: string | null;
  reviewType: ReviewType;
  videoSource?: "upload" | "record";
}
export interface StepOneProps {
  setData: React.Dispatch<React.SetStateAction<ReviewData>>;
  data: ReviewData;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "additional",
  ) => void;
  handleRatingClick: (rating: number) => void;
  questions: string[];
  handleVideoChange?: (file: File | null) => void;
}
export interface StepTwoProps {
  setData: React.Dispatch<React.SetStateAction<ReviewData>>;
  data: ReviewData;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "additional",
  ) => void;
}
