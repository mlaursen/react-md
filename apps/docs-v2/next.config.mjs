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

      // TODO: Figure out why including prettier causes:
      // ```
      // [webpack.cache.PackFileCacheStrategy/webpack.FileSystemInfo] Parsing of /home/mlaursen/code/react-md/node_modules/.pnpm/prettier@3.2.5/node_modules/prettier/index.mjs for build dependencies failed at 'import(pathToFileURL2(file).href)'.
      // ```
      infrastructureLogging: {
        level: "error",
      },
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
