"use client";

// Header component
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { Button } from "@repo/ui/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ViewType } from "@/types/types";

interface ReviewHeaderProps {
  activeView: ViewType;
}

export default function Reviewheader({ activeView }: ReviewHeaderProps) {
  const getTitle = () => {
    switch (activeView) {
      case "reviews":
        return "Customer Testimonials";
      case "editTemplate":
        return "Edit Template";
      default:
        return activeView.charAt(0).toUpperCase() + activeView.slice(1);
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b border-gray-800 bg-gradient-to-r from-zinc-900 to-black px-4 lg:px-6">
      <SidebarTrigger className="text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400" />
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-yellow-500">{getTitle()}</h1>
      </div>

      {activeView === "reviews" && (
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Review
        </Button>
      )}
    </header>
  );
}
