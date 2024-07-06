// @ts-check
import withMDX from "@next/mdx";
import { rehypePlugins } from "docs-generator/rehype-plugins";
import { remarkPlugins } from "docs-generator/remark-plugins";

const csp = [
  "default-src 'self';",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
  "style-src 'self' 'unsafe-inline';",
  "img-src 'self' blob: data:;",
  "font-src 'self';",
  "object-src 'none';",
  "base-uri 'self';",
  "form-action 'self';",
  "frame-ancestors 'none';",
  "upgrade-insecure-requests;",
].join("");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubdomains; preload",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },

        // TODO: Eventually move to including as nonce with middleware instead.
        // https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
        // Just doesn't appear to work with CSS at the moment
        {
          key: "Content-Security-Policy",
          value: csp,
        },
      ],
    },
  ],

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
