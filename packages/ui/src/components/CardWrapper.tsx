"use client";
import React from "react";

export function CardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
      {children}
    </div>
  );
}
