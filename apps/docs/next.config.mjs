import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
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
  async redirects() {
    return [
      {
        source: "/v1/",
        destination: "https://mlaursen.github.io/react-md-v1-docs/#/",
        permanent: false,
      },
      {
        source: "/v1/:paths*",
        destination: "https://mlaursen.github.io/react-md-v1-docs/#/:paths*",
        permanent: false,
      },
    ];
  },
  sassOptions: {
    additionalData: `$env: ${process.env.NODE_ENV};`,
  },
  // transpilePackages: ["@react-md/core"],
  // does not support mdx plugins
  experimental: {
    mdxRs: true,
    webpackBuildWorker: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withMDX({
  options: {},
  // experimental: {
  //   mdxRs: true,
  // },
})(nextConfig);
