const fs = require("fs");
const path = require("path");

const dirs = ["@next/swc-linux-x64-gnu", "@next/swc-linux-x64-musl"];

dirs.forEach((d) => {
  const fp = path.join("node_modules", d);
  if (fs.existsSync(fp)) {
    fs.rmSync(fp, { recursive: true, force: true });
    console.log("Removed", d);
  }
});
