const fs = require("fs");
const path = require("path");

// 1. Remove native SWC from node_modules/@next/
const swcDirs = ["@next/swc-linux-x64-gnu", "@next/swc-linux-x64-musl"];
swcDirs.forEach((d) => {
  const fp = path.join("node_modules", d);
  if (fs.existsSync(fp)) {
    fs.rmSync(fp, { recursive: true, force: true });
    console.log("Removed", d);
  }
});

// 2. Remove fallback copies inside next/next-swc-fallback/
const fallbackDir = path.join("node_modules", "next", "next-swc-fallback");
if (fs.existsSync(fallbackDir)) {
  fs.rmSync(fallbackDir, { recursive: true, force: true });
  console.log("Removed next/next-swc-fallback/");
}

console.log("SWC native binaries cleaned — WASM will be used");
