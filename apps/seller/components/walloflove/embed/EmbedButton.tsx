import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Copy } from "lucide-react";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";

interface EmbedButtonProps {
  view: "grid" | "moving" | "slider";
  userId: string;
}

export function EmbedButton({ view, userId }: EmbedButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Generate the embed code based on the view
  const getEmbedCode = () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const embedUrl = `${baseUrl}/embed/wall-of-love/${userId}?view=${view}`;

    return `<iframe
  height="800px" 
  id="review-snap-wall-of-love-${view}" 
  src="${embedUrl}"
  frameborder="0" 
  scrolling="no"
  width="100%"
></iframe>`;
  };

  const embedCode = getEmbedCode();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-black">
          Embed in your website
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Embed Wall of Love</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>

            <div className="flex flex-col w-full bg-muted rouneded-md">
              <pre className="p-4 text-xs text-black overflow-x-auto whitespace-pre-wrap break-words">
                {embedCode}
              </pre>
            </div>
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={copyToClipboard}
          >
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
