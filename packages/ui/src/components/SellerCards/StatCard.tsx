import React, { ReactNode } from "react";
import GenericCard from "./GenericCardWrapper";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  gradient?: string;
}

const StatCard = (
  { title, value, description, icon, gradient }: StatCardProps,
) => {
  return (
    <GenericCard title={title} icon={icon} gradient={gradient}>
      <p className="text-3xl font-bold text-yellow-500 mt-2">{value}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </GenericCard>
  );
};

export default StatCard;
