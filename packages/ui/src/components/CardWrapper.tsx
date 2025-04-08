"use client";
import React from "react";

export function CardWrapper({
  children,
  isFullScreen = false,
}: {
  children: React.ReactNode;
  isFullScreen?: Boolean;
}) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/90 rounded-2xl border border-amber-200 shadow-lg space-y-4 ${
        isFullScreen ? "p-6" : "p-8"
      }`}
    >
      {children}
    </div>
  );
}
