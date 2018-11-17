import path from "path";
import { Application, Reflection, ReflectionKind, DeclarationReflection } from "typedoc";
import {
  ReferenceType,
  IntersectionType,
  UnionType,
  ReflectionType,
} from "typedoc/dist/lib/models/types";
import * as Typedoc from "typedoc";

import getDocumentablePackages from "./getDocumentablePackages";
import { PACKAGES_FOLDER } from "../constants";
import { ITypeDocConfig } from "../types.d";
import { DocumentedComponent, DocumentedProp, DocumentedProps } from "../../types.d";
import { parseAndFormatComment, getSource } from "./format";

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

const TYPES_DIR = path.join(PACKAGES_FOLDER, "..", "node_modules", "@types", "react");

export default async function typedoc(config: ITypeDocConfig) {
  const packages = await getDocumentablePackages();
  // const packages = (await getDocumentablePackages()).filter(name => /typography/.test(name));
  const srcPaths = packages.map(name => path.join(PACKAGES_FOLDER, name, "src"));
  // srcPaths.push(path.join(TYPES_DIR, "index.d.ts"));

  const application = new Application(OPTIONS);
  const srcFiles = application.expandInputFiles(srcPaths).filter(name => !/test/.test(name));
  console.log("Converting...", srcPaths);
  const project = application.convert(srcFiles);
  console.log("Done!");

  const exports = project.getChildrenByKind(ReflectionKind.ExternalModule);
  const interfaces = project.getReflectionsByKind(ReflectionKind.Interface);
  const props = interfaces.filter(({ name }) => /^I.*(?!Default)Props/.test(name));
  const classComponents = project.getReflectionsByKind(ReflectionKind.Class);
  const functionalComponents = project
    .getReflectionsByKind(ReflectionKind.Function)
    .filter(({ name }) => /^[A-Z]/.test(name));
  const components = classComponents
    .concat(functionalComponents)
    .filter(({ name }) => name === "Text");
  components.forEach(component => {
    const componentProps = props.find(
      ({ name }) => name === `I${component.name}Props`
    ) as DeclarationReflection;
    const baseDefaultProps = component.getChildByName("defaultProps") as DeclarationReflection;
    if (!componentProps) {
      throw new Error(`Unable to find props for ${component.name}`);
    }
    let defaultValues = [];
    if (baseDefaultProps) {
      defaultValues = baseDefaultProps.children.map(p => p.toString());
      console.log("defaultValues:", defaultValues);
    }
    // console.log("defaultProps:", defaultProps);

    const formattedProps: DocumentedProps = {
      name: componentProps.name,
      description: parseAndFormatComment(componentProps.comment),
      generics: [],
      declared: [],
      inherited: [],
    };
    const documented: DocumentedComponent = {
      name: component.name,
      description: parseAndFormatComment(component.comment),
      source: getSource(component),
      props: formattedProps,
      generics: [],
    };
    console.log("documented:\n", JSON.stringify(documented, null, 2));
  });

  // const Text = components.find(({ name }) => name === "Text");
  // const TextProps = props.find(({ name }) => /ITextProps/.test(name)) as DeclarationReflection;
  // const TextDefaultProps = props.find(({ name }) =>
  //   /ITextDefaultProps/.test(name)
  // ) as DeclarationReflection;
  // if (!TextProps || !TextDefaultProps || !Text) {
  //   return;
  // }
  // console.log("TextProps:", TextProps);
  // console.log(TextProps.toString());
  // console.log(TextProps.toStringHierarchy());
  // console.log("TextDefaultProps:", TextDefaultProps);

  // const defaultProps = Text.getChildByName("defaultProps") as DeclarationReflection;
  // if (defaultProps) {
  // }

  // console.log(Text.toStringHierarchy());
  // const textProps = Text.findReflectionByName("props") as DeclarationReflection;
  // console.log(textProps.toString());
  // console.log(textProps.toStringHierarchy());
  // console.log("textProps:", Object.keys(textProps));
  // debug(textProps.children, "children");
  // debug(components);

  // const exports = project.getReflectionsByKind(ReflectionKind.Function);
  // exports.forEach(exportedFile => {
  //   if (exportedFile.name.match(/ListItemText/)) {
  //     console.log(exportedFile.toObject());
  //     if (exportedFile.comment && exportedFile.comment.tags) {
  //       exportedFile.comment.tags.forEach(tag => {
  //         console.log("tag:", tag);
  //       });
  //     }
  //   }
  // });
  // debug(exports, "exports");

  // console.log(project.getFullName());
  // console.log(project.toStringHierarchy());
  // const aliases = project.getReflectionsByKind(ReflectionKind.TypeAlias);
  // const externals = project.getChildrenByKind(ReflectionKind.ExternalModule);
  // const types = project.getChildrenByKind(ReflectionKind.TypeAlias);
  // debug(aliases);

  // const components = project.getReflectionsByKind(ReflectionKind.Class);
  // const interfaces = project.getReflectionsByKind(ReflectionKind.Interface);
  // const typeAliases = project.getReflectionsByKind(ReflectionKind.TypeAlias);
  // const utils = project
  //   .getReflectionsByKind(ReflectionKind.Function)
  //   .filter(({ name }) => !/^[A-Z]/.test(name));
  // debug(utils, "utils");
  // debug(components, "components");
  // debug(interfaces, "interfaces");
  // debug(typeAliases, "typeAliases");
  // debug(utils, "utils");
  // const Text = components[0] as DeclarationReflection;
  // const externals = Text.getChildrenByKind(ReflectionKind.Interface);
  // console.log("externals:", externals);
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
