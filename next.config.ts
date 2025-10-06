import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static site generation
  distDir: 'dist', // Sets output directory to ./dist
};

export default nextConfig;