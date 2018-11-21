/* tslint:disable:no-var-requires */
import fs from "fs-extra";
import path from "path";
import childProcess from "child_process";
import { promisify } from "util";

import { TEMP_TYPEDOC_LIB_FOLDER, TEMP_TYPEDOC_FILE_NAME } from "./constants";

const PACKAGE_JSON: any = require("../../../../../package.json");

const execPromise = promisify(childProcess.exec);
const exec = (command: string) => execPromise(command, { cwd: TEMP_TYPEDOC_LIB_FOLDER });

const pkg = {
  name: "temp",
  version: "0.0.1",
  license: "MIT",
  scripts: {
    typedoc: `typedoc --json ${TEMP_TYPEDOC_FILE_NAME} --includeDeclarations`,
  },
  dependencies: {
    "@types/react": "latest",
    typedoc: PACKAGE_JSON.devDependencies.typedoc,
    typescript: PACKAGE_JSON.devDependencies.typescript,
  },
};

const tsconfig = {
  compilerOptions: {
    target: "es5",
    module: "commonjs",
    sourceMap: true,
    jsx: "react",
    strict: true,
    noImplicitAny: true,
    noImplicitThis: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictPropertyInitialization: true,
    alwaysStrict: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    moduleResolution: "node",
    lib: ["dom", "es2017"],
  },
};

const PACKAGE_PATH = path.join(TEMP_TYPEDOC_LIB_FOLDER, "package.json");
const TSCONFIG_PATH = path.join(TEMP_TYPEDOC_LIB_FOLDER, "tsconfig.json");
const TEST_PATH = path.join(TEMP_TYPEDOC_LIB_FOLDER, "Test.tsx");

const TEMP_TYPEDOC_FILE_PATH = path.join(process.cwd(), TEMP_TYPEDOC_FILE_NAME);

/**
 * This will create a temp project to run typedoc on with minimal types so that some more information
 * can be provided for React Components that extend HTMLAttributes.
 */
export default async function createMainLibraryTypedoc() {
  if (fs.pathExistsSync(TEMP_TYPEDOC_FILE_PATH)) {
    return;
  }

  console.log("Creating the temp project structure...");
  await fs.ensureDir(TEMP_TYPEDOC_LIB_FOLDER);
  await Promise.all([
    fs.writeJson(PACKAGE_PATH, pkg),
    fs.writeJson(TSCONFIG_PATH, tsconfig),
    fs.createFile(TEST_PATH),
  ]);

  console.log("\nInstalling depdendencies...");
  await exec("npm install");

  console.log("\nRunning typedoc with `--includeDeclarations`. This will take a very long time.");
  await exec("npm run typedoc");

  console.log(
    `\nMoving the generated typedoc json file to \`packages/generator/${TEMP_TYPEDOC_FILE_NAME}\`...`
  );
  await fs.move(path.join(TEMP_TYPEDOC_LIB_FOLDER, TEMP_TYPEDOC_FILE_NAME), TEMP_TYPEDOC_FILE_PATH);

  console.log("\nRemoving the temp project...");
  await fs.remove(TEMP_TYPEDOC_LIB_FOLDER);
}
