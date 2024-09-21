import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { baseOpenGraph } from "./shared-metadata";
import constants from "@/constants";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(constants.url),
  title: {
    default: constants.company,
    template: `%s | ${constants.company}`,
  },
  description: constants.company,
  openGraph: baseOpenGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-sans`}>{children}</body>
    </html>
  );
}
