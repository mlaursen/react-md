import { join } from "path";

import { documentationRoot, src } from "../constants";

export const DEMOS_FOLDER = join(documentationRoot, src, "components", "Demos");
export const SANDBOXES_PATH = join(
  documentationRoot,
  src,
  "constants",
  "sandboxes"
);

export const FORM_PARTS: readonly string[] = [
  "FileInputs",
  "SelectFields",
  "SelectionControls",
  "Sliders",
  "TextFields",
  "Validation",
];

export const DEPENDENCIES: readonly string[] = [
  "react-md",
  "react",
  "react-dom",
];

export const DEV_DEPENDENCIES: readonly string[] = [
  "@types/jest",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "sass",
  "react-scripts",
  "typescript",
];

export const DEMO_INDEX = `import React from "react";
import { render } from "react-dom";
import { Configuration } from "@react-md/layout";

// the styles are actually loaded as the pre-compiled themes in the index.html
// to speed up sandbox compilation. If you want to update the theme, you'll need
// to uncomment this line and remove the \`<link>\` tag in the \`index.html\`
// import "./styles.scss"

import Demo from "./Demo";

const App = () => (
  <Configuration>
    <Demo />
  </Configuration>
);

render(<App />, document.getElementById("root"));
`;

export const DEMO_INDEX_HTML = `<!DOCTYPE html>
<html lang="en" class="{{THEME}}-theme">
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
    <!-- the styles are loaded through the CDN to speed up codesandbox demos. You'll normally want to import the \`src/styles.scss\` in the \`src/index.tsx\` instead to create custom themes -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/mlaursen/react-md@{{RMD_VERSION}}/themes/react-md.teal-pink-200-{{THEME}}.min.css"
    />
    <title>{{DEMO_TITLE}}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`;

export const VARIABLES_SCSS_FILE = `@import "@react-md/theme/dist/color-palette";

$rmd-theme-light: true;
$rmd-theme-primary: $rmd-teal-500;
$rmd-theme-secondary: $rmd-pink-a-200;
`;

export const STYLES_SCSS_FILE = `@import "./variables";
@import "react-md/dist/everything";

@include react-md-utils";
`;

export const PHONE_INDEX_FILE = `export { default } from "./Phone";
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
