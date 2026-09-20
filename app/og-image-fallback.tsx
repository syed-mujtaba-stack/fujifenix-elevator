import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Return a minimal valid SVG OG image as fallback
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#0f172a"/>
    <rect width="1200" height="6" fill="#0047BB"/>
    <text x="60" y="100" font-family="sans-serif" font-size="48" font-weight="900" fill="#ffffff">Fuji Fenix Elevator</text>
    <text x="60" y="150" font-family="sans-serif" font-size="24" fill="#60a5fa">Total Solution for Vertical Transportation</text>
  </svg>`;
  
  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" },
  });
}
