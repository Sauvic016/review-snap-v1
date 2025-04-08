"use client";
import { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";
import { getTemplate } from "@/app/actions/template";
import { useParams, useRouter } from "next/navigation";
import { Review, TemplateData, ViewType } from "@/types/types";
import TemplateSidebar from "@/components/template/TemplateSidebar";
import Reviewslist from "@/components/template/reviews/Reviewlist";
import Reviewheader from "@/components/template/reviews/Reviewheader";
import ShareView from "@/components/template/ShareView";

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

  // Handle view changes and data fetching
  const handleViewChange = async (view: ViewType) => {
    if (view === "editTemplate") {
      router.push(`/template/${params.id}/edit`);
      return;
    }
    if (view === "reviews") {
      try {
        // Fetch fresh reviews data using ID from URL params
        const response = await getTemplate(params.id as string);
        if (!response) throw new Error("Failed to fetch reviews");
        setReviews(response.reviews);
      } catch (error) {
        // Fallback to initial reviews if fetch fails
        setReviews(initialReviews);
      }
    }
  };

  // Add another useEffect to monitor reviews state changes
  useEffect(() => {}, [reviews]);

  useEffect(() => {
    handleViewChange(activeView);
  }, [activeView]);

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

  const renderMainContent = () => {
    switch (activeView) {
      case "reviews":
        return (
          <Reviewslist
            reviews={reviews}
            onBookmarkToggle={handleBookmarkToggle}
          />
        );
      // case "integrations":
      //   return <IntegrationsView />;
      case "share":
        return <ShareView templateId={template?.id} />;
      // case "wallOfLove":
      //   return <WallOfLove sellerId={template?.sellerId || ""} templateId={template?.id || ""} />;

      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-full w-full overflow-hidden bg-black">
        <TemplateSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          shareExpanded={shareExpanded}
          toggleShareExpand={toggleShareExpand}
          templateId={template?.id}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Reviewheader activeView={activeView} />

          {renderMainContent()}
        </div>
      </div>
    </SidebarProvider>
  );
}
