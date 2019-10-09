/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
  const Component: any;
  const content: any;
  export { Component };
  export default content;
}

declare module "*.scss" {
  const content: any;
  export default content;
}

declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}
