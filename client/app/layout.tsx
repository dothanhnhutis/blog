import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { baseOpenGraph } from "./shared-metadata";
import constants from "@/constants";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TankStackProvider } from "@/components/providers/tankStack-provider";
import { Toaster } from "@/components/ui/sonner";
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["100", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(constants.url),
  title: {
    default: constants.seo.defaultTitle,
    template: `%s | ${constants.seo.defaultTitle}`,
  },
  description: constants.seo.defaultDescription,
  openGraph: baseOpenGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} `}
    >
      <body className="font-sans relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <TankStackProvider>
            {children}
            <Toaster visibleToasts={5} richColors />
          </TankStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
