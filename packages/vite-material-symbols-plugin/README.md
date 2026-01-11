# @react-md/vite-plugin-material-symbols

This is a very simple [vite] plugin to handle automatically include material
symbols from the google fonts API when using the `MaterialSymbol` component
from `@react-md/core`. This plugin searches all the included files for
`MaterialSymbol` components and extracts the material symbol name from the
`name` prop.

## Installation

```sh
npm install -D @react-md/vite-plugin-material-symbols
```

## Setup

Add the plugin to the `vite.config.ts`:

```diff
 import { resolve } from 'node:path'
 import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react-swc'
+import { materialSymbolsPlugin } from "@react-md/vite-plugin-material-symbols";

 // https://vite.dev/config/
 export default defineConfig({
-  plugins: [react()],
+  plugins: [react(), materialSymbolsPlugin()],
   resolve: {
     alias: {
       everything: resolve(import.meta.dirname, 'src/_everything.scss'),
     },
   },
 })
```

## Configuration

The plugin accepts an object of options to create the google fonts link in the
root html:

| Option                   | Default                        | Description                                                                                                                                                                                                                                                                                                 |
| :----------------------- | :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultSymbolNames`     | `[]`                           | An optional list of material symbol names to include when the simple regex matcher does not work. For example, if you have a custom component that dynamically sets the `name` for the `MaterialSymbol` use this option for known values since the regex will be unable to determine the used symbol names. |
| `family`                 | `"outlined"`                   | Provide this value if the `MATERIAL_CONFIG.family` is not the default.                                                                                                                                                                                                                                      |
| `fill`                   | `0`                            | Provide this value if the `MATERIAL_CONFIG.fill` is not the default.                                                                                                                                                                                                                                        |
| `grade`                  | `0`                            | Provide this value if the `MATERIAL_CONFIG.grade` is not the default.                                                                                                                                                                                                                                       |
| `weight`                 | `400`                          | Provide this value if the `MATERIAL_CONFIG.weight` is not the default.                                                                                                                                                                                                                                      |
| `opticalSize`            | `48`                           | Provide this value if the `MATERIAL_CONFIG.opticalSize` is not the default.                                                                                                                                                                                                                                 |
| `disablePreconnectLinks` | `false`                        | Use this prop to prevent the google fonts preconnect links from being included in the default html.                                                                                                                                                                                                         |
| `pattern`                | `"src\/**\/*.{ts,tsx,js,jsx}"` | The pattern to use to find files referencing material symbols.                                                                                                                                                                                                                                              |

[vite]: https://vite.dev
