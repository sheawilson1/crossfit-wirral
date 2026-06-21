import type { NextConfig } from "next";
import path from "node:path";

// Static export for GitHub Pages. NEXT_PUBLIC_BASE_PATH (e.g. "/crossfit-wirral")
// is set at build time for the Pages subpath; left empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
