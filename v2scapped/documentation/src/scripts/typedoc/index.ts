import * as path from "path";
import * as Typedoc from "typedoc";

import { PACKAGES_FOLDER, DOCUMENTATION_FOLDER } from "../constants";

const tsdocs = require("../../../../../typedoc.combined.json") as Typedoc.ProjectReflection[];

const IGNORE_INHERIT_REGEX = /^(Component|New|Deprecated)(Lifecycle)?/;
const IGNORE_STUFF_REGEX = /Interface|Type alias|Function|Enumeration|Class/;

const log = (msg: string, thing: any) =>
  console.log.bind(console)(`${msg}:`, JSON.stringify(thing, null, 2));

function extractFromClass(docClass: Typedoc.DeclarationReflection) {
  if (
    !IGNORE_STUFF_REGEX.test(docClass.kindString) &&
    (!docClass.children ||
      // @ts-ignore
      !docClass.typeParameter ||
      docClass.flags.isPrivate ||
      !docClass.flags.isExported)
  ) {
    console.log(docClass.name);
    return;
  }
  let text;
  let shortText;
  if (docClass.hasComment) {
    ({ text, shortText } = docClass.comment);
  }

  let types: Typedoc.TypeParameterReflection[] = [];
  if (!IGNORE_STUFF_REGEX.test(docClass.kindString)) {
    // @ts-ignore
    types = docClass.typeParameter.filter(p => !/^SS?$/.test(p.name));
  }

  let attributes: Typedoc.DeclarationReflection[] = [];
  if (docClass.children) {
    attributes = docClass.children.filter(attr => {
      if (attr.flags.isPrivate) {
        return false;
      }

      let result = true;
      if (attr.overwrites) {
        // documented as only have type, but has name in json
        // @ts-ignore
        result = result && !IGNORE_INHERIT_REGEX.test(attr.overwrites.name);
      }

      if (attr.inheritedFrom) {
        // documented as only have type, but has name in json
        // @ts-ignore
        result = result && !IGNORE_INHERIT_REGEX.test(attr.inheritedFrom.name);
      }

      return result;
    });
  }

  if (docClass.signatures) {
    // if (docClass.name === "TextContainer") {
    //   // console.log("docClass:", docClass);
    //   log("docClass.signatures", docClass.signatures);
    // }
    docClass.signatures.forEach(sig => {
      if (sig.kindString === "Call signature") {
        // console.log("docClass.name:", docClass.name);
        const { comment, hasComment, name, type, parameters } = sig;
        // console.log("name:", name);
        // console.log("comment:", comment);
        // console.log("type:", type);
        // console.log("parameters:", parameters);
        // console.log("\n\n");
      }
    });
    // console.log("docClass.signatures.length:", docClass.signatures.length);
  }

  // if (docClass.name === "AppBar") {
  //   log("docClass:", docClass);
  // }
  // const { extendedTypes } = docClass;
  // console.log("docClass.name:", docClass.name);
  // if (docClass.name === "TreeViewData") {
  //   log("types", types);
  //   log("data", docClass);
  // }
  // log("attributes", attributes.map(({ name }) => name));
  // if (extendedTypes) {
  //   log("extendedTypes", extendedTypes);
  // }
  // console.log("\n");
}

interface ITypedoc {
  name: string;
  comment: string;
  attributes: Typedoc.DeclarationReflection[];
}

interface ITypedocDB {
  [key: string]: ITypedoc;
}

export default async function typedoc() {
  tsdocs.forEach(tsdoc => {
    const exported = tsdoc.children.filter(
      ({ name, flags: { isExported, isPrivate } }) =>
        !isPrivate && isExported && !/.+index"$/.test(name)
    );
    // if (tsdoc.name === "@react-md/utils") {
    //   console.log("tsdoc:", tsdoc.children);
    //   // log("utils", tsdoc);
    // }
    // console.log("tsdoc.name:", tsdoc.name);
    // console.log("tsdoc:", tsdoc.groups);
    // console.log("\n");
    // const modules = exported.filter(({ kind }) => kind === 1);

    exported.forEach(doc => {
      if (doc.children) {
        doc.children.forEach(extractFromClass);
      }
    });
  });
}
