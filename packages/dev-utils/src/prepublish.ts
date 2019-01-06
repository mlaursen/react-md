import path from "path";

import { nodeModules } from "./paths";
import { exec } from "./utils";

const runAll = path.join(
  "..",
  "..",
  nodeModules,
  "npm-run-all",
  "bin",
  "npm-run-all",
  "index.js"
);

export default function prepublish() {
  try {
    exec(`${runAll} clean build`);
  } catch (e) {
    console.log(e.message);
  }
}
