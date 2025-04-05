import { Button } from "@repo/ui/components/ui/button";
import { CheckCircle, Sparkles, Star } from "lucide-react";

type Props = {
  onClose: () => void;
};

function SubmissionSuccess({ onClose }: Props) {
  return (
    <div className="space-y-8 py-4">
      <div className="text-center relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 left-1/4 text-amber-300/20 transform -rotate-12">
          <Star className="w-12 h-12 fill-current" />
        </div>
        <div className="absolute -top-6 right-1/3 text-amber-400/30 transform rotate-12">
          <Sparkles className="w-10 h-10" />
        </div>

        {/* Main success icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-500/20 animate-pulse"
            style={{ transform: "scale(1.5)" }}
          >
          </div>
          <div className="relative bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full p-5 shadow-lg shadow-amber-500/30">
            <CheckCircle className="w-16 h-16 text-gray-900" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-3">
          Thank You!
        </h3>
        <p className="text-gray-300 text-lg max-w-md mx-auto mb-8">
          Your review has been submitted successfully. We appreciate your
          feedback!
        </p>

        {/* Divider */}
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400/50 to-yellow-500/50 rounded-full mb-8">
        </div>

        {/* Action button */}
        <Button
          onClick={onClose}
          className="px-8 py-6 text-lg bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:scale-105"
        >
          Submit Another Review
        </Button>
      </div>
    </div>
  );
}

export default SubmissionSuccess;
