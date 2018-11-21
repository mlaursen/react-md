import path from "path";
import { Application } from "typedoc";

import { PACKAGES_FOLDER } from "../constants";

const OPTIONS = {
  name: "react-md",
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

export function createTypedocProject(paths: string[], options?: object) {
  const application = new Application({ ...OPTIONS, ...options });
  const srcFiles = application.expandInputFiles(paths).filter(name => !/test/.test(name));
  console.log(
    `Converting the source files into a project...\n${paths.map(toPackageList).join("\n")}`
  );
  const project = application.convert(srcFiles);
  console.log("Done!\n");
  return project;
}
