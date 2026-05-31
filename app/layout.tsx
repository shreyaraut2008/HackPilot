import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackForge AI // AI Hackathon Co-Pilot & MVP Architect",
  description: "Transform hackathon problem statements into winning ideas, system architectures, interactive timelines, priority matrices, and high-impact pitch decks in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth select-none">
      <body
        className={`${outfit.variable} ${geistMono.variable} font-sans min-h-full flex flex-col text-slate-100 antialiased bg-[#050816] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
