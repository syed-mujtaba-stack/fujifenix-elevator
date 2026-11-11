/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "*.sanity.work" },
    ],
    localPatterns: [{ pathname: "/**" }],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 48, 96, 192],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      // Canonical host: www -> apex (single hostname for indexing and hreflang).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fujifenix.com" }],
        destination: "https://fujifenix.com/:path*",
        permanent: true,
      },
      // Legacy URLs from the previous website — 308 permanent redirects to current pages.
      // Preserves link equity and removes old URLs from Google's index.
      { source: "/home-elevators{/}?", destination: "/products/elevators", permanent: true },
      { source: "/passenger-elevators{/}?", destination: "/products/elevators/passenger-elevator-cabin", permanent: true },
      { source: "/escalators{/}?", destination: "/products/escalators-moving-walks", permanent: true },
      { source: "/moving-walks{/}?", destination: "/products/escalators-moving-walks", permanent: true },
      { source: "/home{/}?", destination: "/", permanent: true },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
      },
    ];

    return [
      // Security headers on every response. No global Cache-Control here:
      // HTML caching is decided per route, so admin/API responses are never
      // served from a shared cache.
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Authenticated areas and APIs must never be cached by a shared cache.
      // Hashed build assets and /_next/image keep Next.js's own production
      // cache headers: overriding them breaks development behaviour.
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      {
        source: "/dashboard(.*)",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      {
        source: "/studio(.*)",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      {
        source: "/login",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Service-Worker-Allowed", value: "/" },
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
    ];
  },
};

export default nextConfig;
