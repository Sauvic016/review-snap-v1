import React from "react";
import { Camera, Image, Mail, User } from "lucide-react";
import { ReviewData, StepTwoProps } from "@/lib/types";

const StepTwo = ({ setData, data, handleFileUpload }: StepTwoProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-500 mb-6">
        Tell us about yourself
      </h2>
      <div className="flex items-center gap-6 mb-8">
        <div className="relative flex-shrink-0">
          {data.profileImage
            ? (
              <div className="relative">
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-amber-400"
                />
                <button
                  onClick={() =>
                    setData((prev) => ({ ...prev, profileImage: null }))}
                  className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full text-white text-xs"
                >
                  ×
                </button>
              </div>
            )
            : (
              <div className="w-20 h-20 rounded-full bg-white/30 border-2 border-dashed border-amber-400/30 flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "profile")}
                  className="hidden"
                  id="profile-upload"
                />
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <Camera className="h-8 w-8 text-amber-400" />
                </label>
              </div>
            )}
        </div>
        <div className="flex-grow">
          <p className="text-amber-600 text-sm mb-1">Profile Picture</p>
          <p className="text-gray-500 text-sm">
            Add a face to your review (optional)
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-amber-500 mb-2">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-amber-400/60" />
            <input
              type="text"
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-white/30 border border-amber-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-700 placeholder-gray-400"
              placeholder="Your name"
            />
          </div>
        </div>
        <div>
          <label className="block text-amber-500 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-amber-400/60" />
            <input
              type="email"
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-white/30 border border-amber-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-700 placeholder-gray-400"
              placeholder="Your email"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
