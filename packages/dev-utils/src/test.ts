import fs from "fs-extra";
import path from "path";

import { src } from "./paths";
import { glob } from "./utils";

export default async function test(args: string[]) {
  if (!(await isTestable())) {
    console.log("No test files for this project.");
    return;
  }

  await prepare();
  return require("jest").run(args);
}

async function isTestable() {
  const files = await glob(`${src}/**/__tests__/*.+(ts|tsx)`);
  return files.length > 0;
}

async function prepare() {
  const config = "jest.config.js";
  const setup = "jest.setup.js";
  const devUtilsRoot = path.join(process.cwd(), "..", "dev-utils");
  await fs.copy(
    path.join(devUtilsRoot, config),
    path.join(process.cwd(), config)
  );
  await fs.copy(
    path.join(devUtilsRoot, setup),
    path.join(process.cwd(), setup)
  );
}
