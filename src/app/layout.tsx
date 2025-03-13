import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import "animate.css";
import LayoutLogic from "./LayoutLogic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haibu Social",
  description: "Haibu main app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LayoutLogic>
            <head>
              <link rel="icon" href="/icons/haibu-imagotipo.svg" sizes="any" />
            </head>
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
              <div className="flex-1 overflow-y-auto">{children}</div>
            </main>
          </LayoutLogic>
        </Providers>
      </body>
    </html>
  );
}
