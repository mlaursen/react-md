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

declare module "react-codesandboxer" {
  import { FunctionComponent, ReactNode, CSSProperties } from "react";

  export interface GitInfo {
    account: string;
    repository: string;
    branch?: string;
    host: "bitbucket" | "github";
  }

  interface JSONField {
    [key: string]: string;
  }

  interface Package {
    name: string;
    version: string;
    dependencies?: JSONField;
    devDependencies?: JSONField;
    peerDependencies?: JSONField;
  }

  interface Files {
    [key: string]: {
      content: string;
    };
  }

  type ImportReplacement = [string, string];

  export interface CodeSandboxerProps {
    /* The absolute path to the example within the git file structure */
    examplePath: string;
    /* Name for the codesandbox instance */
    name?: string;
    /* This is all the information we need to fetch information from github or bitbucket */
    gitInfo: GitInfo;
    /* Pass in the example as code to prevent it being fetched */
    example?: string | Promise<string>;
    /* Either take in a package.json object, or a string as the path of the package.json */
    pkgJSON?: Package | string | Promise<Package | string>;
    /* paths in the example that we do not want to be pulled from their relativeLocation */
    importReplacements?: ImportReplacement[];
    /* Dependencies we always include. Most likely react and react-dom */
    dependencies?: JSONField;
    /* Do not actually deploy to codesanbox. Used to for testing alongside the return values of the render prop. */
    skipRedirect?: boolean;
    ignoreInternalImports?: boolean;
    /* Load the files when component mounts, instead of waiting for the button to be clicked */
    preload?: boolean;
    /* Deploy the sandbox when component mounts, instead of waiting for the button to be clicked */
    autoDeploy?: boolean;
    /* Called once loading has finished, whether it preloaded or not */
    onLoadComplete?: (
      result: { parameters: string; files: Files } | { error: any }
    ) => void;
    /* Called once a deploy has occurred. This will still be called if skipRedirect is chosen */
    afterDeploy?: (sandboxUrl: string, sandboxId: string) => void;
    /* Called once a deploy has occurred. This will still be called if skipRedirect is chosen */
    // afterDeployError?: Error => mixed;
    /* Pass in files separately to fetching them. Useful to go alongisde specific replacements in importReplacements */
    providedFiles?: Files;
    /* Render prop that return `isLoading`and `error`. */
    children: (obj: {
      isLoading: boolean;
      files?: Files;
      sandboxId?: string;
      sandboxUrl?: string;
    }) => ReactNode;
    /* Consumers may need access to the wrapper's style */
    style?: CSSProperties;
    /* allow codesandboxer to accept jsx properties */
    extensions?: string[];
    template?: "create-react-app" | "create-react-app-typescript" | "vue-cli";
  }

  const CodeSandboxerComponent: FunctionComponent<CodeSandboxerProps>;
  export default CodeSandboxerComponent;
  // export default FunctionComponent<Props>
}
