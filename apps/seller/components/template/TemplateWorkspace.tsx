"use client";
import { memo, useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";
// import { getTemplate } from "@/app/actions/template";
import { useParams, useRouter } from "next/navigation";
import { Review, TemplateData, ViewType } from "@/types/types";
import TemplateSidebar from "@/components/template/TemplateSidebar";
import Reviewslist from "@/components/template/reviews/Reviewlist";
import Reviewheader from "@/components/template/reviews/Reviewheader";
import ShareView from "@/components/template/ShareView";
// import WallOfLove from "@/components/walloflove";
import IntegrationsView from "@/components/integrations";

// Memoize child components for better performance
const MemoizedReviewsList = memo(Reviewslist);
const MemoizedShareView = memo(ShareView);

interface TemplateWorkspaceProps {
  review: Review[];
  template?: TemplateData;
}

export default function TemplateWorkspace(
  { review: initialReviews, template }: TemplateWorkspaceProps,
) {
  const params = useParams();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ViewType>("reviews");
  const [shareExpanded, setShareExpanded] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // Simplify view handling - remove unnecessary fetch on tab change
  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  // Add another useEffect to monitor reviews state changes
  useEffect(() => {}, [reviews]);

  const toggleShareExpand = () => {
    setShareExpanded(!shareExpanded);
  };

  const handleBookmarkToggle = (reviewId: string, isBookmarked: boolean) => {
    setReviews((prevReviews) =>
      prevReviews.map((
        review,
      ) => (review.id === reviewId
        ? { ...review, isBookMarked: isBookmarked }
        : review)
      )
    );
  };

  // Use memoized content for better performance
  const renderMainContent = () => {
    switch (activeView) {
      case "reviews":
        return (
          <MemoizedReviewsList
            reviews={reviews}
            onBookmarkToggle={handleBookmarkToggle}
          />
        );
      case "integrations":
        return <IntegrationsView />;
      case "share":
        return <MemoizedShareView templateId={template?.id} />;

      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-full w-full overflow-hidden bg-black">
        <TemplateSidebar
          activeView={activeView}
          setActiveView={handleViewChange}
          shareExpanded={shareExpanded}
          toggleShareExpand={toggleShareExpand}
          templateId={template?.id}
        />

        <div className="flex flex-1  flex-col overflow-hidden">
          <Reviewheader activeView={activeView} />

          <div className="flex-1 overflow-auto flex items-center justify-center">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
