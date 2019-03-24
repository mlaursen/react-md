export const DEMOS_FOLDER = "components/Demos/";

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
