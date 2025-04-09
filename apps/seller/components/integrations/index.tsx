"use client";

import { ImportPosts } from "./imports/ImportPosts";

export default function IntegrationsView() {
  return (
    <div className="flex flex-col justify-center ">
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 rounded-xl border border-yellow-500/10 ">
        <h2 className="text-2xl font-bold text-yellow-500  text-center">
          Quick Integrations from Social Media
        </h2>
        <ImportPosts />
      </div>
    </div>
  );
}
