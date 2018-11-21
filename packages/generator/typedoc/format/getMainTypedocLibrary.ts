// import fs from "fs-extra";
// import path from "path";
// import { ProjectReflection } from "typedoc";

// import { ITypeDeclaration, ITypeDefinition, IMainTypescriptLibrary } from "./typedoc.d";

// import {
//   LIBRARY_TYPEDOC_FILE_NAME,
//   LIBRARY_TYPEDOC_FILE_PATH,
//   TEMP_TYPEDOC_FILE_NAME,
// } from "./constants";
// import createMainLibraryTypedoc from "./createMainLibraryTypedoc";
// import { parseAndFormatComment, getTypeValue } from "./format";

// function createDetailedAttribute(
//   attribute: ITypeDeclaration,
//   mainLib: ITypeDeclaration,
//   excludeUndefined: boolean = true
// ) {
//   let { comment } = attribute;
//   if (!comment) {
//     const mainLibComment = mainLib.children.find(
//       ({ name }) => name.replace(/^\w+\./, "").toLowerCase() === attribute.name.toLowerCase()
//     );
//     if (mainLibComment && mainLibComment.comment) {
//       ({ comment } = mainLibComment);
//     }
//   }

//   const definition = attribute as ITypeDefinition;
//   return {
//     name: attribute.name,
//     comment: parseAndFormatComment(comment || ""),
//     value: getTypeValue(definition, excludeUndefined),
//   };
// }

// function createDetailedInterface(
//   intf: ITypeDeclaration | undefined | null,
//   mainLib: ITypeDeclaration,
//   excludeUndefined: boolean = true
// ) {
//   if (!intf) {
//     return null;
//   }

//   return {
//     name: intf.name,
//     attributes: intf.children.map(attribute =>
//       createDetailedAttribute(attribute, mainLib, excludeUndefined)
//     ),
//   };
// }

// /**
//  * "Lazily" gets the main library typedoc file.
//  *
//  * If the library typedoc file doesn't exist yet, a new temp project will be created to run
//  * typedoc in while including declaration files. Once typedoc has finished, the typedoc
//  * will be reduced to just useful React HTMLAttributes interfaces and written to a file.
//  */
// export default async function getMainTypedocLibrary() {
//   if (fs.pathExistsSync(LIBRARY_TYPEDOC_FILE_PATH)) {
//     return fs.readJson(LIBRARY_TYPEDOC_FILE_PATH) as Promise<IMainTypescriptLibrary>;
//   }

//   await createMainLibraryTypedoc();
//   const mainLibraryTypedoc: ITypeDeclaration = await fs.readJson(
//     path.join(process.cwd(), TEMP_TYPEDOC_FILE_NAME)
//   );
//   const typescriptLib = mainLibraryTypedoc.children.find(({ name }) =>
//     /typescript.+lib\.dom\.d/.test(name)
//   );
//   const reactLib = mainLibraryTypedoc.children.find(({ name }) => /react\/index\.d/.test(name));
//   if (!typescriptLib) {
//     throw new Error("Unable to find the main typescript types library");
//   }

//   if (!reactLib) {
//     throw new Error("Unable to find the main react types library");
//   }

//   const reactNamespace = reactLib.children.find(({ name }) => name === "React");
//   if (!reactNamespace) {
//     throw new Error("Unable to find the `React` namespace in the react types library.");
//   }

//   const mainLibrary = reactNamespace.children
//     .filter(({ name }) => /HTMLAttributes/.test(name))
//     .reduce<IMainTypescriptLibrary>((combined, htmlAttributeIntf) => {
//       const detailedInterface = createDetailedInterface(htmlAttributeIntf, typescriptLib, true);

//       if (detailedInterface) {
//         combined[htmlAttributeIntf.name] = detailedInterface;
//       }

//       return combined;
//     }, {});

//   console.log(`Creating ${LIBRARY_TYPEDOC_FILE_NAME}...`);
//   await fs.writeJson(LIBRARY_TYPEDOC_FILE_PATH, mainLibrary, { spaces: 2 });
//   console.log("Done!\n");
//   return mainLibrary;
// }
