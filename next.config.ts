import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'framerusercontent.com',
      },
      {
        hostname: 'cdn-crayo.com',
      },
      {
        hostname: 'cdn.sanity.io',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'placehold.co',
      },
      {
        hostname: 'cdn.jsdelivr.net',
      },
      
    ],
  },
};

export default nextConfig;
