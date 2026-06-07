import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteBackground } from "@/components/visuals/site-background";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trippin — The AI that gets your group to agree",
  description:
    "Trippin is an AI-powered group decision platform. Collect preferences from everyone and let AI find the trip plan your whole group agrees on.",
  keywords: [
    "group trip planning",
    "AI consensus",
    "group decision making",
    "trip planner",
    "friends trip",
  ],
  openGraph: {
    title: "Trippin — The AI that gets your group to agree",
    description:
      "Turn endless group chats into a complete trip plan in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="relative isolate min-h-full flex flex-col overflow-x-hidden bg-[var(--background)] text-white">
        <SiteBackground />
        <div className="pointer-events-none fixed inset-0 z-[5] bg-black/60" aria-hidden />
        <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
