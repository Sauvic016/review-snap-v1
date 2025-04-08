"use client";
// Share view component
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Check, ClipboardCopy } from "lucide-react";
import { useState } from "react";

interface ShareViewProps {
  templateId?: string;
}

export default function ShareView({ templateId }: ShareViewProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3001/r/${templateId}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(
      `<iframe src="http://localhost:3001/r/${templateId}" width="100%" height="600" frameborder="0"></iframe>`,
    );
    alert("Embed code copied to clipboard");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 rounded-xl border border-yellow-500/10">
      <h2 className="text-2xl font-bold text-yellow-500 mb-6">
        Share Your Template
      </h2>
      <p className="text-gray-400 mb-8">
        Share your template with customers to collect reviews.
      </p>

      <div className="space-y-6">
        <div className="p-4 bg-zinc-800/50 rounded-lg border border-yellow-500/20">
          <h3 className="font-medium text-white mb-2">Direct Link</h3>
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={`http://localhost:3001/r/${templateId}`}
              className="bg-zinc-900 border-gray-700 text-white"
            />
            <Button
              onClick={handleCopyLink}
              className="shrink-0 bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {copySuccess
                ? <Check className="h-4 w-4" />
                : <ClipboardCopy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="p-4 bg-zinc-800/50 rounded-lg border border-yellow-500/20">
          <h3 className="font-medium text-white mb-2">QR Code</h3>
          <div className="flex items-center justify-center p-4 bg-white rounded-lg">
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
              <p className="text-sm text-gray-500">QR Code Placeholder</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Download QR Code
            </Button>
          </div>
        </div>

        <div className="p-4 bg-zinc-800/50 rounded-lg border border-yellow-500/20">
          <h3 className="font-medium text-white mb-2">Embed Code</h3>
          <div className="bg-zinc-900 p-3 rounded border border-gray-700 font-mono text-sm text-gray-300 overflow-x-auto">
            {`<iframe src="http://localhost:3001/r/${templateId}" width="100%" height="600" frameborder="0"></iframe>`}
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={handleCopyEmbed}
              className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
            >
              Copy Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
