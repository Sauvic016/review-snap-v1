"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { GridView } from "@/components/walloflove/grid-view/GridView";
import MovingGridView from "@/components/walloflove/grid-view/MovingGridView";
import { SliderView } from "@/components/walloflove/SliderView";
import { Review } from "@/types/types";
import { EmbedButton } from "./embed/EmbedButton";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WallOfLove({
  reviews,
  userId,
}: {
  reviews: Review[];
  userId: string;
}) {
  const [bookmarkedReviews] = useState<Review[]>(reviews);
  const [view, setView] = useState("grid");
  const pathname = usePathname();
  const path = pathname.split("/wall-of-love")[0];

  // This would typically come from your auth context or user data
  // Replace with actual user ID

  useEffect(() => {}, [view]);
  return (
    <div className="container mx-auto py-12 px-4 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-yellow-500">
          Wall of Love
        </h1>
        {/* Render below component if we have bookmarkedReviews else render like you dont have any review yet */}

        {bookmarkedReviews.length > 0 ? (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You can choose any one of the layout and embed it in your website
          </p>
        ) : (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You don&apos;t have any bookmarked reviews yet. Bookmark your
            favorite reviews to showcase them on your Wall of Love.
          </p>
        )}
      </div>
      <div className="flex justify-start mb-6">
        <Link href={`${path}`}>
          <Button
            variant="outline"
            className="flex items-center gap-2 transition-all hover:gap-3"
          >
            <ArrowLeft size={16} />
            <span>Back to Templates</span>
          </Button>
        </Link>
      </div>
      {bookmarkedReviews.length > 0 && (
        <>
          <Tabs defaultValue="grid" className="w-full " onValueChange={setView}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                >
                  Grid View
                </TabsTrigger>
                <TabsTrigger
                  value="moving"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                >
                  Moving Grid
                </TabsTrigger>
                <TabsTrigger
                  value="slider"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                >
                  Slider View
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="flex justify-end mb-4">
                <EmbedButton view="grid" userId={userId} />
              </div>
              <GridView testimonials={bookmarkedReviews} />
            </TabsContent>

            <TabsContent value="moving" className="mt-0">
              <div className="flex justify-end mb-4">
                <EmbedButton view="moving" userId={userId} />
              </div>

              <MovingGridView testimonials={bookmarkedReviews} />
            </TabsContent>

            <TabsContent value="slider" className="mt-0">
              <div className="flex justify-end mb-4">
                <EmbedButton view="slider" userId={userId} />
              </div>
              <SliderView testimonials={bookmarkedReviews} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
