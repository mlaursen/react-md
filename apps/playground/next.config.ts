import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],

  // https://github.com/vercel/next.js/issues/49314
  webpack(config) {
    return {
      ...config,

      resolve: {
        ...config.resolve,
        extensionAlias: {
          ...config.resolve?.extensionAlias,
          ".js": [".js", ".ts", ".tsx"],
          ".jsx": [".jsx", ".tsx"],
        },
      },
    };
  },

  sassOptions: {
    implementation: "sass-embedded",
  },
};

export default nextConfig;
