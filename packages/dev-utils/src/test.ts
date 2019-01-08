import jestConfig from "../../../jest.config";

import { src } from "./paths";
import { glob } from "./utils";

export default async function test(args: string[]) {
  if (!(await isTestable())) {
    console.log("No test files for this project.");
    return;
  }

  args.push("--config");
  args.push(JSON.stringify(jestConfig));
  return require("jest").run(args);
}

async function isTestable() {
  const files = await glob(`${src}/**/__tests__/*.+(ts|tsx)`);
  return files.length > 0;
}
