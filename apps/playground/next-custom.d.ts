/// <reference types="next/image-types/global.js" />
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
