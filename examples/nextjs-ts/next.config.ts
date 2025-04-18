import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // uncomment if you want to use sass-embedded. It will also require running:
  // ```sh
  // npm uninstall sass
  // npm install sass-embedded
  // ```
  //
  // sassOptions: {
  //   implementation: "sass-embedded",
  // },
};

export default nextConfig;
