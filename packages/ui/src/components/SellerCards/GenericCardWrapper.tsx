"use client";
import React, { ReactNode } from "react";

interface GenericCardProps {
  title: string;
  className?: string;
  gradient?: string;
  icon?: ReactNode;
  onClick?: () => void;
  footer?: ReactNode;
  children: ReactNode;
}

const GenericCard = ({
  title,
  className = "",
  gradient = "from-zinc-700/80 to-zinc-900/30",
  icon,
  onClick,
  footer,
  children,
}: GenericCardProps) => {
  const cardContent = (
    <div
      className={`bg-gradient-to-br ${gradient} backdrop-blur-xl p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-400/30 transition-colors h-full  ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {icon && <div className="text-yellow-500">{icon}</div>}
      </div>

      <div className="mt-2">{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100/10">{footer}</div>
      )}
    </div>
  );

  return cardContent;
};

export default GenericCard;
