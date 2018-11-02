import * as fs from "fs-extra";
import * as path from "path";
import * as TypeDoc from "typedoc";
import prettier from "prettier";

import { ITypeDocConfig } from "../types.d";

import getDocumentablePackages from "./getDocumentablePackages";
import getCombinedTypedocs from "./getCombinedTypedocs";

import {
  ITypeDefinition,
  TypeValue,
  getTypeValue,
  parseAndFormatComment,
  getMainTypedocLibrary,
} from "./format";

// function parseGenericTypes(generics: TypeDoc.TypeParameterReflection[]) {
//   // React Component's gain 3 type parameters of S, SS, and S again and I'm not sure why
//   return generics.filter(({ name }) => !/^SS?$/.test(name)).map(({ name, comment }) => {
//     let fullComment = "";
//     if (!comment || !comment.shortText) {
//       // console.error(`Generic with name: "${name}" does not have a typedoc comment defined.`);
//     } else {
//       fullComment = comment.shortText;
//     }

//     return { name, comment };
//   });
// }

// function isAttributeWorthDocumenting(attribute: TypeDoc.DeclarationReflection) {
//   const skipRegex = /^(Component|New|Deprecated)(Lifecycle)?/;
//   const {
//     kindString,
//     flags: { isPrivate },
//     inheritedFrom,
//     overwrites,
//   } = attribute;
//   if (isPrivate || skipRegex.test(kindString)) {
//     return false;
//   } else if (inheritedFrom) {
//     // documented as only have type, but has name in json
//     // @ts-ignore
//     const name: string = inheritedFrom.name;
//     return !skipRegex.test(name);
//   } else if (overwrites) {
//     // documented as only have type, but has name in json
//     // @ts-ignore
//     const name: string = overwrites.name;
//     return !skipRegex.test(name);
//   }

//   return true;
// }

// function parseClassOrFunctionAttributes(attributes: TypeDoc.DeclarationReflection[]) {
//   return attributes.filter(isAttributeWorthDocumenting);
// }

// let printed = false;
// function parseExportsAndTypes(exportOrType: TypeDoc.DeclarationReflection) {
//   const {
//     name,
//     kindString,
//     flags,
//     typeParameter = [],
//     children = [],
//   } = exportOrType as IDeclarationReflection;
//   if (!flags.isExported) {
//     return;
//   }

//   const generics = parseGenericTypes(typeParameter);
//   const attributes = parseClassOrFunctionAttributes(children);
//   if (!printed) {
//     console.log("attributes:", JSON.stringify(attributes, null, 2));
//     printed = true;
//   }
// }

// function parseExportedFileForExportsOrTypes(exportedFile: TypeDoc.DeclarationReflection) {
//   const { name, originalName: sourcePath, children = [] } = exportedFile;

//   children.forEach(parseExportsAndTypes);
// }

// function parseTopLevelPackageTypeDoc(packageTypeDoc: TypeDoc.ProjectReflection) {
//   const { name, children = [] } = packageTypeDoc;

//   children.forEach(parseExportedFileForExportsOrTypes);
// }

// function parseInterfaceProperty(property: TypeDoc.DeclarationReflection, fileName = "") {
//   const {
//     name,
//     flags: { isOptional = false },
//   } = property;
//   const comment = parseAndFormatComment(property.comment || {}, fileName);
// }

// function parseInterface(intf: TypeDoc.DeclarationReflection, fileName = "") {
//   const { name, sources, groups, children } = intf;
//   const definedAt = sources[0];
//   const comment = parseAndFormatComment(intf.comment || {}, fileName);
//   const generics = ((intf as IDeclarationReflection).typeParameter || []).map(generic => ({
//     name: generic.name,
//     comment: parseAndFormatComment(generic.comment || {}, fileName),
//   }));

//   const properties = children.map(property => parseInterfaceProperty(property, fileName));
// }

// function parsePackageFile(file: TypeDoc.DeclarationReflection) {
//   const { name, kind, kindString, flags, originalName: filePath, groups, children } = file;
//   if (name === '"index"') {
//     return null;
//   }

//   const { components, types, interfaces } = groups.reduce(
//     (combined, group) => {
//       switch (group.title) {
//         case "Classes":
//           [].push.apply(combined.components, group.children);
//           break;
//         case "Interfaces":
//           [].push.apply(combined.interfaces, group.children);
//           break;
//         case "Type aliases":
//           [].push.apply(combined.types, group.children);
//           break;
//         default:
//           console.log("group.title:", group.title);
//       }

//       return combined;
//     },
//     { components: [], types: [], interfaces: [] }
//   );

//   console.log("components:", components);
//   console.log("types:", types);
//   console.log("interfaces:", interfaces);
// }

function getByKind(
  name: string,
  declaration: TypeDoc.DeclarationReflection
): TypeDoc.DeclarationReflection[] {
  const group = declaration.groups.find(({ title }) => title === name);
  if (!group || !group.children.length) {
    return [];
  }
  const publicKinds = declaration.children.filter(({ flags: { isPrivate } }) => !isPrivate);

  // @ts-ignore
  const ids: number[] = group.children;
  return ids
    .map(kindId => publicKinds.find(({ id }) => id === kindId) as TypeDoc.DeclarationReflection)
    .filter(Boolean);
}

function toPrettyTypeAlias(typeAlias: TypeDoc.DeclarationReflection) {
  const { name, comment, sources } = typeAlias;
  const formattedComment = parseAndFormatComment(comment);
  const value = getTypeValue(typeAlias as ITypeDefinition);

  return {
    name,
    value,
    comment: formattedComment,
  };
}

export default async function typedoc(config: ITypeDocConfig) {
  const mainTypedocLibrary = await getMainTypedocLibrary();
  const packages = await getDocumentablePackages();
  const tsdocs = await getCombinedTypedocs(packages, config);
  const [typography] = tsdocs;
  const thing: any = {
    [typography.name]: {
      name: typography.name,
      components: [],
      types: [],
      interfaces: [],
      constants: [],
      utils: [],
    },
  };

  interface IPrettyTypeAlias {
    name: string;
    value: TypeValue;
    comment: string;
  }
  const types = typography.children.reduce<IPrettyTypeAlias[]>((list, file) => {
    if ('"index"' === file.name) {
      return list;
    }
    return list.concat(getByKind("Type aliases", file).map(toPrettyTypeAlias));
  }, []);
  // console.log(JSON.stringify(types, null, 2));

  // const TextContainer = typography.children.find(({ name }) => name === '"TextContainer"');
  // // console.log("TextContainer:", TextContainer);
  // if (!TextContainer) {
  //   return;
  // }

  // console.log("\n\n");
  // const types = getByKind("Type aliases", TextContainer).map(toPrettyTypeAlias);
  // console.log(JSON.stringify(types, null, 2));
  // console.log("types:", types);
  // const TextContainerSize = types.find(({ name }) => name === "TextContainerSize");
  // if (!TextContainerSize) {
  //   return;
  // }

  // toPrettyTypeAlias(TextContainerSize);

  // console.log(typography.children.map(({ name }) => name));
  // const textContainerSize = file.children.find(({ name }) => name === "TextContainerSize");
  // if (textContainerSize) {
  //   console.log("FOUND");
  // }

  // const something = tsdocs.reduce<any>((combined, tsdoc) => {
  //   const { name, children } = tsdoc;
  //   combined[name] = {
  //     name,
  //     components: [],
  //     types: [],
  //     interfaces: [],
  //     constants: [],
  //     utils: [],
  //   };

  //   children.forEach(file => parsePackageFile(file));
  // }, {});
  // const comment = stepThroughComment(COMMENT);
  // console.log("comment:", comment);
  // tsdocs.forEach(parseTopLevelPackageTypeDoc);
  // tsdocs.forEach(packageDoc => {
  //   const { name: packageName } = packageDoc;
  //   packageDoc.children.forEach(fileNameDoc => {
  //     const source = fileNameDoc.originalName;
  //     const { name } = fileNameDoc;

  //     fileNameDoc.children.forEach(exportOrType => {

  //     })
  //   })
  // })
  // const [a11y] = tsdocs;
  // const members = getExportedMembers(a11y);
  // const [member] = members;
  // console.log("members:", JSON.stringify(Object.keys(members[0]), null, 2));
  // console.log(JSON.stringify(member.groups, null, 2));
  // tsdocs.forEach(tsdoc => {
  //   const members = getExportedMembers(tsdoc);
  //   members.forEach(member => {
  //     member.children.forEach(memberType => {
  //       getUsefulDeclarationInfo(memberType, member.originalName, config);
  //     });
  //   });
  // });
}
