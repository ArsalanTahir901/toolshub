import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    webpackMemoryOptimizations: true,
    // build sequential pages instead of parallel build
    workerThreads: false,
    cpus: 1,
  },
  output: 'standalone',
};

export default nextConfig;
