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
  title: "Haibu Project",
  description: "Haibu project",
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
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
              <div className="flex-1 overflow-y-auto">{children}</div>
            </main>
          </LayoutLogic>
        </Providers>
      </body>
    </html>
  );
}
