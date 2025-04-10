import { GridView } from "@/components/walloflove/grid-view/GridView";
import MovingGridView from "@/components/walloflove/grid-view/MovingGridView";
import { SliderView } from "@/components/walloflove/SliderView";
import { Suspense } from "react";
import { Review } from "@/types/types";
import { getBookMarkedReviews } from "@/app/actions/review";

export default async function WallOfLoveEmbed({
  params,
  searchParams,
}: {
  params: { templateId: string };
  searchParams: { view?: string };
}) {
  const { templateId } = params;
  const view = searchParams.view || "grid";

  // const reviews = await getReviews(userId);
  const reviews = await getBookMarkedReviews(templateId);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">No reviews found</p>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-transparent"
      style={{ background: "transparent" }}
    >
      <Suspense fallback={<div className="bg-transparent">Loading...</div>}>
        {view === "grid" && <GridView testimonials={reviews} />}
        {view === "moving" && <MovingGridView testimonials={reviews} />}
        {view === "slider" && <SliderView testimonials={reviews} />}
      </Suspense>
    </div>
  );
}
