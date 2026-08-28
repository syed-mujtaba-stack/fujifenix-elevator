import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    localPatterns: [
      {
        pathname: "/**",
      },
      {
        pathname: "/**",
        search: "/.*/",
      },
    ],
  },
};

export default nextConfig;
