import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    implementation: "sass-embedded",
  },
};

export default nextConfig;