/* tslint:disable:no-console */
import fs from "fs-extra";
import path from "path";
import childProcess from "child_process";
import { promisify } from "util";
import * as TypeDoc from "typedoc";

import { ITypeDocConfig } from "../types.d";

import { PACKAGE_TYPEDOC_FILE_NAME, COMBINED_TYPEDOC_FILE_NAME } from "./constants";
import { PACKAGES_FOLDER } from "../constants";

const exec = promisify(childProcess.exec);
const COMBINED_TYPEDOC_FILE_PATH = path.join(process.cwd(), COMBINED_TYPEDOC_FILE_NAME);

function createPackagesTypedoc(packages: string[]) {
  console.log(`Running typedoc in the following packages:
 - ${packages.map(name => `@react-md/${name}`).join("\n - ")}

This will take some time...`);
  let command = "./node_modules/typedoc/bin/typedoc";
  command += ' --exclude "**/__tests__/*"';
  command += ` --json ${PACKAGE_TYPEDOC_FILE_NAME}`;

  return Promise.all(
    packages.map(name =>
      exec(command, { cwd: path.join(PACKAGES_FOLDER, name) }).catch(error => {
        console.log(`There was an error running typedoc in \`@react-md/${name}\``);
        throw error;
      })
    )
  ).then(() => {
    console.log("All typedocs completed!\n");
  });
}

function getTypedoc(pathname: string): Promise<TypeDoc.ProjectReflection> {
  return fs.readJson(pathname);
}

async function combineAllTypedocs(packages: string[]) {
  const typedocPaths = packages.map(name =>
    path.join(PACKAGES_FOLDER, name, PACKAGE_TYPEDOC_FILE_NAME)
  );
  const typedocs = await Promise.all(typedocPaths.map(getTypedoc));
  console.log(`Creating \"${COMBINED_TYPEDOC_FILE_PATH}\"...`);
  await fs.outputJson(COMBINED_TYPEDOC_FILE_PATH, typedocs, { spaces: 2 });
  console.log("Done!\n");

  console.log("Removing all packages' temporary typedoc files...");
  await Promise.all(typedocPaths.map(typedocPath => fs.remove(typedocPath)));
  console.log("Done!\n");
  return typedocs;
}

export default async function getCombinedTypedocs(packages: string[], { combine }: ITypeDocConfig) {
  if (!combine && fs.pathExistsSync(COMBINED_TYPEDOC_FILE_PATH)) {
    console.log("Getting the cached combined typedoc file");
    return fs.readJson(COMBINED_TYPEDOC_FILE_PATH) as Promise<TypeDoc.ProjectReflection[]>;
  }

  console.log("Starting to create the combined typedocs...\n=========================");
  await createPackagesTypedoc(packages);
  const typedocs = await combineAllTypedocs(packages);
  return typedocs;
}
