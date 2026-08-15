import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 80,
  trailingComma: "all",
  sortImports: {
    groups: [
      "builtin",
      "external",
      "rmdConfig",
      ["internal", "subpath"],
      ["parent", "sibling", "index"],
      "style",
      "unknown",
    ],
    customGroups: [
      {
        groupName: "rmdConfig",
        elementNamePattern: ["**/rmdConfig.js"],
      },
    ],
  },
  ignorePatterns: [
    "CHANGELOG.md",
    "**/CHANGELOG.md",
    "**/public/prism-themes/",
    "**/__testfixtures__/",
    "pnpm-*.yaml",
    "examples/**",
    "!examples/mlaursen-nextjs",
    "!examples/mlaursen-vite",
    "packages/material-icons/src/**",
    "packages/material-icons/types.d.ts",
  ],
});
