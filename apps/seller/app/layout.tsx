import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review-snap",
  description: "Generate reviews for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://unpkg.com/react-scan/dist/install-hook.global.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} bg-transparent`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
