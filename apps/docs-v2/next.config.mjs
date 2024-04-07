import withMDX from "@next/mdx";
import { rehypePlugins } from "@react-md/mdx-plugins/rehype-plugins";
import { remarkPlugins } from "@react-md/mdx-plugins/remark-plugins";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // experimental: {
  //   mdxRs: true,
  // },
};

export default withMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
  },
})(nextConfig);
