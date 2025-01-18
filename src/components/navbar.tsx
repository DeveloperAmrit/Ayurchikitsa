"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <Link
      href={to}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
};

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoginClick = () => {
    setShowSignIn(true);
  };

  useEffect(() => {
    if (!clerkFrontendApi) {
      console.error("Clerk Frontend API is missing!");
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white flex justify-center">
      <div className="container flex h-16 items-center justify-between mx-3">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          ViralReel AI
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/about" children="About" />
          <NavLink to="/contact" children="Contact" />
          <ClerkProvider frontendApi={clerkFrontendApi}>
            <SignedIn>
              <NavLink to="/dashboard" children="Dashboard" />
              <UserButton />
            </SignedIn>

            <SignedOut>
              <button
                onClick={handleLoginClick}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
              >
                Log in
              </button>

              {showSignIn && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <SignIn />
                </div>
              )}
            </SignedOut>
          </ClerkProvider>
        </nav>
      </div>
    </header>
  );
}
