import { Import } from "lucide-react";
import { ImportCardWrapper } from "@/components/integrations/imports/ImportCardWrapper";
import { ModalProvider } from "@repo/ui/components/ui/animated-modal";
import { Coming_Soon } from "next/font/google";

export enum SocialPlatformsType {
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  PRODUCTHUNT = "producthunt",
}

const socialPlatforms = [
  {
    title: "Twitter",
    description: "Import tweets and replies",
    slug: SocialPlatformsType.TWITTER,
    placeholder: "https://x.com/your-post",
    image: "/twitter.avif",
  },
  {
    title: "LinkedIn",
    description: "Import posts and articles",
    slug: SocialPlatformsType.LINKEDIN,
    placeholder: "https://linkedin.com/your-post",
    image: "/linkedin.avif",
    Coming_Soon: true,
  },
  {
    title: "Facebook",
    description: "Import reviews and ratings",
    slug: SocialPlatformsType.PRODUCTHUNT,
    placeholder:
      "https://www.facebook.com/andrewismusic/posts/451971596293956%2560",
    image: "/facebook.jpg",
    Coming_Soon: true,
  },
];

export const ImportPosts = () => {
  return (
    <div className="mx-auto px-4 py-8 overflow-hidden">
      <div className="mb-8  px-6">
        <p className="text-gray-600 text-md">
          Import your posts from different platforms to streamline your content
          management.
        </p>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap flex-stretch gap-6 px-6">
        <ModalProvider>
          {socialPlatforms.map((platform) => (
            <ImportCardWrapper
              key={platform.title}
              title={platform.title}
              description={platform.description}
              slug={platform.slug}
              image={platform.image}
              Coming_Soon={platform.Coming_Soon}
              placeholder={platform.placeholder}
            />
          ))}
        </ModalProvider>
      </div>
    </div>
  );
};
