import path from "path";

import { PACKAGES_FOLDER } from "./constants";
import { getFileSource, getDocumentablePackages, createTypedocProject } from "./utils";
import { ITypedocConfig } from "./types.d";
import { ReflectionKind, DeclarationReflection } from "typedoc";
import { ReflectionType } from "typedoc/dist/lib/models";

function validateTypescriptPackage(packageName: string, packages: string[]) {
  if (!packages.includes(packageName)) {
    console.error(`Invalid typescript package provided: "${packageName}". Please choose one of:
${packages.map(p => `- ${p}`).join("\n")}
`);
    process.exit(1);
  }
}

function getSrcPath(packageName: string) {
  return path.join(PACKAGES_FOLDER, packageName, "src");
}

function getSrcPaths(packages: string[], config: ITypedocConfig) {
  const cwd = process.cwd();
  const name = cwd.substring(cwd.lastIndexOf(path.sep) + 1);
  if (config.all || (name === "generator" && !config.packageName)) {
    return packages.map(getSrcPath);
  } else if (config.packageName) {
    validateTypescriptPackage(config.packageName, packages);
    return [getSrcPath(config.packageName)];
  }

  validateTypescriptPackage(name, packages);
  return [getSrcPath(name)];
}

export default async function createTypedoc(config: ITypedocConfig) {
  const packages = await getDocumentablePackages();
  const project = createTypedocProject(getSrcPaths(packages, config));

  const interfaces = project.getReflectionsByKind(
    ReflectionKind.Interface
  ) as DeclarationReflection[];
  const types = project.getReflectionsByKind(ReflectionKind.TypeAlias) as DeclarationReflection[];
  const functions = project.getReflectionsByKind(
    ReflectionKind.Function
  ) as DeclarationReflection[];

  const propTypes = interfaces.filter(t => /^I((?!Default)[A-Z][a-z]+)+Props$/.test(t.name));

  functions.forEach(fn => {
    console.log(fn.toObject());

    // if (fn.signatures) {
    //   fn.signatures.forEach(sig => {
    //     sig.parameters.forEach(p => {
    //       if (p.type.type === "reflection") {
    //         const t = p.type as ReflectionType;
    //         console.log(t.declaration.toObject());
    //       }
    //       console.log();
    //     });
    //   });
    // }
  });
}
