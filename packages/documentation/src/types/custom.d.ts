/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.scss" {
  const content: any;
  export default content;
}

declare module "*.png" {
  // this is copy/pasted from next/image-types/global since it'll cause the
  // `yarn typecheck` command to fail otherwise
  interface StaticImageData {
    src: string;
    height: number;
    width: number;
    placeholder?: string;
  }

  const content: StaticImageData;

  export default content;
}

declare module "*.svg" {
  // this is copy/pasted from next/image-types/global since it'll cause the
  // `yarn typecheck` command to fail otherwise
  interface StaticImageData {
    src: string;
    height: number;
    width: number;
    placeholder?: string;
  }

  const content: StaticImageData;

  export default content;
}

declare module "*.md" {
  const content: string;
  export default content;
}

declare module "http" {
  export interface IncomingMessage {
    cookies: Record<string, string | undefined>;
  }
}
