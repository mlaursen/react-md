import path from "path";

export const DEMOS_FOLDER = path.join("components", "Demos");
export const SANDBOXES_PATH = path.join("constants", "sandboxes");

/**
 * These packages will always be required for a sandbox since they are the base
 * recommended packages or because they are used to setup the "base" styles.
 */
export const ALWAYS_REQUIRED_DEPENDENCIES = [
  "@react-md/states",
  "@react-md/theme",
  "@react-md/typography",
  "@react-md/utils",
];

/**
 * Dev dependencies that will be required for each sandbox.
 */
export const ALWAYS_REQUIRED_DEV_DEPENDENCIES = [
  "react-scripts",
  "node-sass",
  "typescript",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "@types/jest",
];

/**
 * A list of packages tht do not generate styles or do not have any styles.
 * This list is used to make sure that the @include react-md-NAME is not added
 * to the base index.scss for this list.
 */
export const NON_STYLEABLE_RMD_PACKAGES = [
  "@react-md/elevation",
  "@react-md/material-icons",
  "@react-md/portal",
  "@react-md/sizing",
  "@react-md/wia-aria",
];

export const DEMO_INDEX = `import React from "react";
import { render } from "react-dom";
import { StatesConfig } from "@react-md/states";

import "./styles.scss";
import Demo from "./Demo";

const App = () => (
  <StatesConfig>
    <Demo />
  </StatesConfig>
);

render(<App />, document.getElementById("root"));
`;

export const DEMO_INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Material+Icons|Roboto:400,500,700|Source+Code+Pro"
    />
    <title>{{DEMO_TITLE}}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`;

export const DEMO_TS_CONFIG = `{
  "compileroptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowjs": true,
    "skiplibcheck": true,
    "esmoduleinterop": true,
    "allowsyntheticdefaultimports": true,
    "strict": true,
    "forceconsistentcasinginfilenames": true,
    "module": "esnext",
    "moduleresolution": "node",
    "resolvejsonmodule": true,
    "isolatedmodules": true,
    "noemit": true,
    "jsx": "preserve"
  },
  "include": [
    "src"
  ]
}
`;

export const SANDBOXES_FILE = `/** this is a generated file from \`dev-utils sandbox\` */
import { IFiles } from "codesandbox-import-utils/lib/api/define";

const resolve = (importer: Promise<any>) => importer.then(content => content.default as IFiles);

export type GetSandbox = () => Promise<IFiles>;
export type PackageName = {{PACKAGE_UNION}};
export type Sandboxes = Record<PackageName, Record<string, GetSandbox>>;

const sandboxes: Sandboxes = {{SANDBOXES_JSON}};

export default sandboxes;
`;
