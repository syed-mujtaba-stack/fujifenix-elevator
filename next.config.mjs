/** @type {import('next').NextConfig} */
const nextConfig = {
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
