"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  GridView,
  MovingGridView,
} from "@/components/walloflove/grid-view/GridView";
import { SliderView } from "@/components/walloflove/SliderView";
import { Review } from "@/types/types";
import { EmbedButton } from "./embed/EmbedButton";

export default function WallOfLove(
  { reviews, userId }: { reviews: Review[]; userId: string },
) {
  const [bookmarkedReviews] = useState<Review[]>(reviews);
  const [view, setView] = useState("grid");

  // This would typically come from your auth context or user data
  // Replace with actual user ID

  useEffect(() => {
  }, [view]);
  return (
    <div className="container mx-auto py-12 px-4 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Wall of Love</h1>
        {/* Render below component if we have bookmarkedReviews else render like you dont have any review yet */}
        {bookmarkedReviews.length > 0
          ? (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See what our customers are saying about our products and services.
              We&apos;re proud to have helped so many people achieve their
              goals.
            </p>
          )
          : (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              You don&apos;t have any bookmarked reviews yet. Bookmark your
              favorite reviews to showcase them on your Wall of Love.
            </p>
          )}
      </div>
      {bookmarkedReviews.length > 0 && (
        <>
          <Tabs
            defaultValue="grid"
            className="w-full "
            onValueChange={setView}
          >
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="moving">Moving Grid</TabsTrigger>
                <TabsTrigger value="slider">Slider View</TabsTrigger>
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
              <div className="text-center mb-6 max-w-2xl mx-auto">
                <p className="text-muted-foreground">
                  Watch as testimonials continuously scroll upward in columns,
                  showcasing our customers&apos; experiences in an engaging way.
                </p>
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
