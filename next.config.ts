import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb', // ou mais, conforme necessário
    },
  },
};

export default nextConfig;
