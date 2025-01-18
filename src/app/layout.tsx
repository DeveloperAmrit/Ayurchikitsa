import { ClerkProvider } from "@clerk/nextjs";
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

export const metadata = {
  title: "ViralReel AI",
  description: "ViralReel AI is a tool that helps you create viral-tested social content in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full bg-gray-50`}
      >
        {/* Wrap the whole layout in ClerkProvider for authentication */}
        <ClerkProvider frontendApi={clerkFrontendApi}>
          {/* Add the Navbar here */}
          <Navbar />
          {/* The children will be injected here */}
          <div>{children}</div>
        </ClerkProvider>
      </body>
    </html>
  );
}
