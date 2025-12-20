import { release } from "@mlaursen/release-script";

await release({
  repo: "react-md",
  cleanCommand: "clean-release-dist",
  buildCommand: "build-release-packages",
  packagePaths: {
    "@react-md/code": "packages/code",
    "@react-md/codemod": "packages/codemod",
    "@react-md/core": "packages/core",
    "@react-md/material-icons": "packages/material-icons",
    "react-md": "packages/react-md",
  },
});
