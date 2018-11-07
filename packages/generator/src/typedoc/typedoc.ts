import path from "path";
import { Application, Reflection, ReflectionKind, DeclarationReflection } from "typedoc";
import { ReferenceType, IntersectionType, UnionType } from "typedoc/dist/lib/models/types";
import * as Typedoc from "typedoc";

import getDocumentablePackages from "./getDocumentablePackages";
import { PACKAGES_FOLDER } from "../constants";
import { ITypeDocConfig } from "../types.d";

const OPTIONS = {
  name: "react-md",
  mode: "modules",
  readme: false,
  excludeExternals: true,
  excludePrivate: true,
  includeDeclarations: true,
  tsConfig: path.join(PACKAGES_FOLDER, "..", "tsconfig.json"),
};

function debug(list: Array<DeclarationReflection | Reflection>, logName: string = "list") {
  console.log(`${logName}: `, list.map(({ name }) => name));
}

export interface IReactComponentType {
  name: string;
  description: string;
  source: {
    line: number;
    href: string;
  };
}

export default async function typedoc(config: ITypeDocConfig) {
  const packages = (await getDocumentablePackages()).filter(name => /typography/.test(name));
  const srcPaths = packages.map(name => path.join(PACKAGES_FOLDER, name, "src"));
  const application = new Application(OPTIONS);
  const srcFiles = application.expandInputFiles(srcPaths).filter(name => !/test/.test(name));
  const project = application.convert(srcFiles);

  // console.log(project.getFullName());
  // console.log(project.toStringHierarchy());
  const aliases = project.getReflectionsByKind(ReflectionKind.TypeAlias);
  // const externals = project.getChildrenByKind(ReflectionKind.ExternalModule);
  // const types = project.getChildrenByKind(ReflectionKind.TypeAlias);
  // debug(aliases);

  const components = project.getReflectionsByKind(ReflectionKind.Class);
  const interfaces = project.getReflectionsByKind(ReflectionKind.Interface);
  const typeAliases = project.getReflectionsByKind(ReflectionKind.TypeAlias);
  const Text = components[0] as DeclarationReflection;
  const externals = Text.getChildrenByKind(ReflectionKind.Interface);
  console.log("externals:", externals);
  // const properties = Text.getChildrenByKind(ReflectionKind.Property);
  // console.log("properties:", properties);
  // console.log(Text.toObject());
  // Text.extendedTypes.forEach(type => {
  //   console.log("type:", type);
  //   // if (type.type === "reference") {
  //   //   const ref = type as ReferenceType;
  //   //   ref.typeArguments.forEach(typeA => {
  //   //     // console.log("typeA:", typeA);
  //   //     if (typeA.type === "intersection") {
  //   //       const t = typeA as UnionType;
  //   //       console.log(t.types);

  //   //       // console.log(JSON.stringify(typeA, null, 2));
  //   //     }
  //   //   });
  //   // }
  // });
  // console.log(Text.extendedTypes[0].typeArguments);
  // console.log(Text.children.map(({ name }) => name));
  // const properties = Text.getChildrenByKind(ReflectionKind.Property);
  // console.log("properties:", properties);
  // console.log("implementedTypes", Text.implementedTypes);
  // console.log("implementedBy", Text.implementedBy);
  // console.log("implementationOf", Text.implementationOf);
  // console.log("extendedTypes", Text.extendedTypes);
  // console.log("typeHierarchy", Text.typeHierarchy);
  // console.log("typeParameters", Text.typeParameters);
  // console.log(Text.typeHierarchy);
  // debug(components, "components");
  // debug(interfaces, "interfaces");
  // debug(typeAliases, "typeAliases");
  // console.log(project.toStringHierarchy("  "));
  // const components = project.getReflectionsByKind(ReflectionKind.Class);
  // components.forEach(component => {
  //   // console.log("component.name:", component.name);
  //   // console.log("sources:", component.sources);
  //   component.sources.forEach(source => {
  //     const { file } = source;
  //     if (file) {
  //       // console.log("file.groups:", JSON.stringify(file.groups, null, 2));
  //       console.log("component.name:", component.name);
  //       // console.log(source.file.categories);
  //       // console.log("source.file.groups:", source.file.groups);
  //       // console.log("\n\n");
  //     }
  //   });
  // });
  // const functions = project.getReflectionsByKind(ReflectionKind.Function);
  // debug(components, "components");
  // debug(functions, "functions");
  // debug(types);
  // console.log("types:", types.map(({ name }) => name));
  // console.log("externals.length:", externals.map(({ name }) => name));
  // const Text = externals.find(refl => refl.getFullName().endsWith('Text"'));
  // if (Text) {
  //   const sigs = Text.getChildrenByKind(ReflectionKind.Interface);
  //   console.log(sigs.map((sig) => sig.getFullName()))
  //   // const exes = Text.getChildrenByKind(ReflectionKind.ExternalModule);
  //   // console.log(exes.length);
  // }
  // console.log(Text);
  // const interfaces = project.getChildrenByKind(ReflectionKind.Interface);
  // console.log(externals.map(decl => decl.getFullName()));
}
