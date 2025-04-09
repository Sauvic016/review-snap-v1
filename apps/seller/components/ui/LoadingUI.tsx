import { Loader2 } from "lucide-react";

const LoadingUI = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black/20">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        <p className="text-sm text-gray-400">Loading template data...</p>
      </div>
    </div>
  );
};

export default LoadingUI;
