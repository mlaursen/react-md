// @ts-check
import withMDX from "@next/mdx";

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
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubdomains; preload",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },

        // TODO: Eventually add a Content-Security-Policy with middleware:
        // https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
        //
        // There are too many issues at the moment to deal with:
        // - nonce is not applied to css, so some initial styles fail on page
        //   load. works correctly if navigating between pages
        // - nonce is not applied to `GoogleTagManager` from `@next/third-parties`
        // - differences between dev and prod builds
      ],
    },
  ],

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
    remarkPlugins: ["docs-generator/remark-plugins"],
    rehypePlugins: ["docs-generator/rehype-plugins"],
  },
})(nextConfig);
