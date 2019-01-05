import path from "path";
import { Application } from "typedoc";
import _ from "lodash";

import { PACKAGES_FOLDER } from "../constants";
import { ITypedocConfig } from "../types";
import { getPackageDependencies } from "./getPackageDependencies";

const OPTIONS = {
  mode: "modules",
  readme: false,
  excludeExternals: true,
  excludePrivate: true,
  includeDeclarations: true,
  tsConfig: path.join(PACKAGES_FOLDER, "..", "tsconfig.json"),
};

function toPackageList(srcPath: string) {
  const regex = /.*packages\/(.+)\/src$/;
  if (!regex.test(srcPath)) {
    return `- ${srcPath}`;
  }

  return `- ${srcPath.replace(regex, "@react-md/$1")}`;
}

export function createTypedocProject(paths: string[], options: { name: string }) {
  const application = new Application({ ...OPTIONS, ...options });
  const srcFiles = application.expandInputFiles(paths).filter(name => !/test/.test(name));
  console.log(`Creating a typedoc project for \`@react-md/${
    options.name
  }\` with the following source files:
${paths.map(toPackageList).join("\n")}
`);
  const project = application.convert(srcFiles);
  console.log("Done!\n");
  return project;
}

function validateTypescriptPackage(packageName: string, packages: string[]) {
  if (!packages.includes(packageName)) {
    console.log('Invalid typescript package provided: "%s"', packageName);
    console.log("Please choose one of:");
    console.log(`${packages.map(p => `- ${p}`).join("\n")}`);
    console.log();
    process.exit(1);
  }
}

export function getProjectName(config: ITypedocConfig, packages: string[], includePrefix: boolean) {
  let name = config.packageName;
  if (!name) {
    const cwd = process.cwd();
    name = cwd.substring(cwd.lastIndexOf(path.sep) + 1);
    if (name === "generator") {
      name = "react-md";
    }
  }

  if (name === "react-md") {
    return name;
  }

  validateTypescriptPackage(name, packages);
  return `${includePrefix ? "@react-md/" : ""}${name}`;
}

function getSrcPath(packageName: string) {
  return path.join(PACKAGES_FOLDER, packageName, "src");
}

export async function getSrcPaths(config: ITypedocConfig, packages: string[]) {
  const name = getProjectName(config, packages, false);
  if (name === "react-md") {
    return packages.map(getSrcPath);
  }

  const dependencies = await getPackageDependencies(name);
  const rmdDeps = _.uniq(
    Object.keys(dependencies).reduce<string[]>(
      (list, name) => {
        if (name.startsWith("@react-md")) {
          list.push(name.split("/")[1]);
        }

        return list;
      },
      [name]
    )
  );

  return rmdDeps.map(getSrcPath);
}
