/// <reference types="next/image-types/global.js" />

declare module "next/jest.js" {
  import nextJest_ from "next/dist/build/jest/jest.js";
  export * from "next/dist/build/jest/jest.js";

  export = nextJest_.default;
}

// https://github.com/vercel/next.js/discussions/41189
declare module "next/link.js" {
  import Link_ from "next/dist/client/link.js";
  export * from "next/dist/client/link.js";

  export = Link_.default;
}

declare module "next/image.js" {
  import Image_ from "next/dist/shared/lib/image-external.js";
  export * from "next/dist/shared/lib/image-external.js";

  export = Image_.default;
}

declare module "next/font/local" {
  import localFont from "next/dist/compiled/@next/font/dist/local/index.js";

  export = localFont.default;
}

declare module "next/font/google" {
  export * from "next/dist/compiled/@next/font/dist/google/index.js";
}

declare module "next/dynamic.js" {
  import dynamic_ from "next/dist/shared/lib/dynamic.js";
  export * from "next/dist/shared/lib/dynamic.js";

  export = dynamic_.default;
}

declare module "next/script.js" {
  import Script_ from "next/dist/client/script.js";
  export * from "next/dist/client/script.js";

  export = Script_.default;
}

declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { TableOfContentsItem } from "@/components/TableOfContents/types.js";

  export const toc: TableOfContentsItem[];

  /**
   * An function component which renders the MDX content using JSX.
   *
   * @param props This value is be available as the named variable `props` inside the MDX component.
   * @returns A JSX element. The meaning of this may depend on the project configuration. I.e. it
   * could be a React, Preact, or Vuex element.
   */
  export default function MDXContent(props: MDXProps): JSX.Element;
}
