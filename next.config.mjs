import rehypePrism from "@mapbox/rehype-prism";
import mdx from "@next/mdx";

import mdxLineNumbers from "./scripts/mdxLineNumbers.mjs";

const withMDX = mdx({
  extension: /\.mdx?/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [mdxLineNumbers, rehypePrism],
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  eslint: {
    // I have already run lint before this step...
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // config.module.rules.unshift({
    //   test: /\.md$/,
    //   use: 'raw-loader',
    //   exclude: /node_modules/,
    // });

    return config;
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
};

export default withMDX(nextConfig);
