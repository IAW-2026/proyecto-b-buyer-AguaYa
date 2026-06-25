import type { NextConfig } from "next";
import { ALLOWED_IMAGE_HOSTNAMES } from "./lib/image-config";

const nextConfig = {
  images: {
    remotePatterns: ALLOWED_IMAGE_HOSTNAMES.map(hostname => ({
      protocol: 'https' as const,
      hostname,
    })),
  },
};
export default nextConfig;
