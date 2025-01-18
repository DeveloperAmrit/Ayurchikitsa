import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://127.0.0.1:5500" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },
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
      {
        hostname: 'd1.awsstatic.com',
      },
    ],
  },
};

export default nextConfig;
