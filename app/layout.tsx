import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Udoye Arinze — Mobile & Web App Developer",
  description:
    "Portfolio of Udoye Arinze, an App Developer based in Nigeria specializing in mobile-first applications, responsive digital products, and performant user experiences. Creator of Fareexplore.",
  keywords: [
    "Udoye Arinze",
    "App Developer",
    "Mobile Developer",
    "Nigeria App Developer",
    "Frontend Developer",
    "Fareexplore",
    "Software Engineer",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Udoye Arinze" }],
  openGraph: {
    title: "Udoye Arinze — App Developer Portfolio",
    description:
      "App Developer based in Nigeria. Building clean, high-performance mobile experiences. Featured project: Fareexplore.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
