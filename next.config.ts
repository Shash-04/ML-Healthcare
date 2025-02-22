import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images to be loaded from Unsplash
    domains: ['images.unsplash.com'],
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
