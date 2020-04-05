import { readJsonSync } from "fs-extra";
import { join } from "path";
import { CompilerOptions } from "typescript";

import { documentationRoot, projectRoot } from "../constants";

export default function getCompilerOptions(): CompilerOptions {
  const base = readJsonSync(join(projectRoot, "tsconfig.base.json"));
  const docs = readJsonSync(join(documentationRoot, "tsconfig.json"));

  // this isn't entirely correct, but not sure how to really do this.
  const resolved = {
    ...base.compilerOptions,
    ...docs.compilerOptions,
  } as CompilerOptions;
  resolved.skipLibCheck = true;
  delete resolved.moduleResolution;

  return resolved;
}
