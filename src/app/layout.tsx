"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components"; // Import the Navbar component
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const pathname = usePathname();
  const hideNavbarPaths = ["/dashboard"];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full bg-gray-50`}
      >
        <ClerkProvider frontendApi={clerkFrontendApi}>
          {!hideNavbarPaths.includes(pathname) && <Navbar />}
          <div>{children}</div>
        </ClerkProvider>
      </body>
    </html>
  );
}
