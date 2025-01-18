"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClerkProvider, RedirectToSignIn } from "@clerk/nextjs";
import { BouncingBallsLoader } from "@/components/BouncingBallsLoader";

const SSOCallback = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.redirect_url) {
      const { redirect_url } = router.query;
      window.location.href = redirect_url as string;
    } else {
      router.push('/'); 
    }
  }, [router.query]);

  return (
    <div>
      <BouncingBallsLoader />
    </div>
  );
};

export default SSOCallback;
