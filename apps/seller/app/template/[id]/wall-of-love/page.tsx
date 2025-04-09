import { getBookMarkedReviews } from "@/app/actions/review";
import WallOfLove from "@/components/walloflove";
import { requireAuth } from "@/lib/auth";

// type Props = {};

const WallOfLovePage = async ({ params }: { params: { id: string } }) => {
  //Fetch data using templateId
  const reviews = await getBookMarkedReviews(params.id);
  const userAuth = await requireAuth();
  const userId = userAuth.id;
  if (!reviews) {
    return <div>No template found</div>;
  }

  return (
    <div className="flex flex-1 p-0 bg-black">
      <WallOfLove reviews={reviews} userId={userId} />
    </div>
  );
};

export default WallOfLovePage;
