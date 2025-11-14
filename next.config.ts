import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatars.githubusercontent.com", '*'],
  },
  cacheComponents: false,
};

export default nextConfig;
