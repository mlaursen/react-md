import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import { ReflectionKind, DeclarationReflection } from "typedoc";
import { ReflectionType, ProjectReflection } from "typedoc/dist/lib/models";

import { PACKAGES_FOLDER } from "./constants";
import { ITypedocConfig } from "./types.d";
import {
  getFileSource,
  getDocumentablePackages,
  createTypedocProject,
  getSrcPaths,
  getProjectName,
  createDocumentedComponent,
  getPackageDependencies,
  getExportedProps,
  getExportedComponents,
  getTopLevelPropTypes,
} from "./utils";

function getExportedFunctionalComponents(project: ProjectReflection, classes: boolean = false) {
  return project
    .getReflectionsByKind(classes ? ReflectionKind.Class : ReflectionKind.Function)
    .filter(
      ({ name, flags }) => /^[A-Z]/.test(name) && (!flags || !flags.isPrivate)
    ) as DeclarationReflection[];
}

export default async function createTypedoc(config: ITypedocConfig) {
  const packages = await getDocumentablePackages();
  const srcPaths = await getSrcPaths(config, packages);
  const project = createTypedocProject(srcPaths, {
    name: getProjectName(config, packages, true),
  });

  const components = getExportedComponents(project);
  const topLevelPropTypes = getTopLevelPropTypes(project);
  console.log(topLevelPropTypes.map(({ name }) => name));

  const exportedPropTypes = getExportedProps(project);
  // console.log("exportedPropTypes:", exportedPropTypes.map(({ name }) => name));

  // const docsFolder = path.join(PACKAGES_FOLDER, "generator", "docs");
  // await fs.ensureDir(docsFolder);
  // console.log("Clearing up old documentation...");
  // await fs.emptyDir(docsFolder);
  // console.log("Done!");
  // console.log();

  // const includedName = getProjectName(config, packages, false);
  // console.log("Creating component documentation...");
  // await Promise.all(
  //   getExportedFunctionalComponents(project, false)
  //     .concat(getExportedFunctionalComponents(project, true))
  //     .filter(comp => {
  //       if (includedName === "react-md") {
  //         return true;
  //       }

  //       const [source] = comp.sources;
  //       return source && (source.url || source.fileName).includes(includedName);
  //     })
  //     .map(component => createDocumentedComponent(component, project))
  //     .map(documentation => {
  //       const fileName = path.join(docsFolder, `${documentation.name}.json`);
  //       console.log("Creating `%s`...", fileName.replace(/^.*react-md/, ""));

  //       return fs.writeJson(fileName, documentation, { spaces: 2 });
  //     })
  // );
  // console.log("Done!");
  // console.log();

  // const interfaces = project.getReflectionsByKind(
  //   ReflectionKind.Interface
  // ) as DeclarationReflection[];
  // const types = project.getReflectionsByKind(ReflectionKind.TypeAlias)
  // as DeclarationReflection[];
  // const propTypes = interfaces.filter(t => /^I((?!Default)[A-Z][a-z]+)+Props$/.test(t.name));
  // let components = project.getReflectionsByKind(ReflectionKind.Class) as DeclarationReflection[];
  // if (projectName !== "react-md") {
  //   components = components.filter(c => getFileSource(c).path.includes(projectName));
  // }

  // const docsFolder = path.join(PACKAGES_FOLDER, "generator", "docs");
  // await fs.ensureDir(docsFolder);
  // await fs.emptyDir(docsFolder);
  // await Promise.all(
  //   components.map(component => {
  //     const documented = createDocumentedComponent(component, propTypes, project);

  //     return fs.writeJson(path.join(docsFolder, `${documented.name}.json`), documented, {
  //       spaces: 2,
  //     });
  //   })
  // );
}
