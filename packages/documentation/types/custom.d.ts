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

declare module "highlight.js/lib/highlight" {
  import * as hljs from "highlight.js";

  export default hljs;
}

declare module "highlight.js/lib/languages/*" {
  import * as hljs from "highlight.js";

  declare function language(hljs?: hljs.HLJSStatic): hljs.IModeBase;
  export default language;
}
