import * as fs from "fs-extra";
import * as path from "path";
import * as SassDoc from "sassdoc";
import * as cpx from "cpx";
import * as sass from "node-sass";

import {
  IVariableLookup,
  IVariableSassDoc,
  IMixinSassDoc,
  IFunctionSassDoc,
  ISassDocReference,
  ISassDocLinkTo,
  IFlattenedSassDocs,
  ISassDocExample,
} from "types/sassdoc";

import {
  PACKAGES_FOLDER,
  DOCUMENTATION_FOLDER,
  DOCUMENTATION_COMPONENTS_FOLDER,
  TEMP_STYLES_FOLDER,
} from "../constants";
import { toPascalCase } from "../utils";

async function moveStyles() {
  await fs.remove(TEMP_STYLES_FOLDER);
  await fs.ensureDir(TEMP_STYLES_FOLDER);

  return new Promise((resolve, reject) => {
    cpx.copy("../*/src/*.scss", TEMP_STYLES_FOLDER, error => {
      if (error) {
        reject(error);
      } else {
        fs.remove(path.join(TEMP_STYLES_FOLDER, "documentation"))
          .then(() => resolve())
          .catch(reject);
      }
    });
  });
}

function getPackages(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(TEMP_STYLES_FOLDER, (err, folders) => {
      if (err) {
        reject(err);
      } else {
        resolve(folders.map(folder => folder.substring(folder.lastIndexOf("/"))));
      }
    });
  });
}

async function renameSrcToDist(packages: string[]) {
  return Promise.all(
    packages.map(packageName => {
      const root = path.join(TEMP_STYLES_FOLDER, packageName);
      const src = path.join(root, "src");
      const dist = path.join(root, "dist");

      return fs.move(src, dist);
    })
  );
}

async function moveStylesForParsing(packages: string[]) {
  const tempFolderPath = path.join(DOCUMENTATION_FOLDER, "@react-md");
  await renameSrcToDist(packages);
  await fs.move(TEMP_STYLES_FOLDER, tempFolderPath);
  await fs.move(tempFolderPath, path.join(TEMP_STYLES_FOLDER, "@react-md"));
}

function createLinkTo(
  item: SassDoc.ISee | SassDoc.IRequire,
  references: ISassDocReference[]
): ISassDocLinkTo | null {
  const { description = "" } = item;
  let name = "";
  let type: SassDoc.SassDocType;
  if ("context" in item) {
    item = item as SassDoc.ISee;
    ({ name, type } = item.context);
  } else {
    item = item as SassDoc.IRequire;
    ({ name, type } = item);
  }

  const link = references.find(ref => ref.name === name && ref.type === type);
  if (!link) {
    throw new Error(`Unable to find a link for \`${name}\``);
    return null;
  } else if (link.private) {
    return null;
  }

  return {
    name,
    type,
    description,
    group: link.group,
  };
}

function uniqueAndTrueish(linkTo: ISassDocLinkTo, i: number, list: ISassDocLinkTo[]) {
  if (!linkTo) {
    return false;
  }

  const j = list.findIndex(item => item && item.name === linkTo.name);
  return i === j;
}

function formatBase(item: SassDoc.Item, references: ISassDocReference[]) {
  const {
    context: { name, value, scope },
    description = "",
    file: { path: pathName },
    link: links = [] as SassDoc.ILink[],
  } = item;
  const type = item.type || item.context.type;
  const see = (item.see || ([] as SassDoc.ISee[]))
    .map(i => createLinkTo(i, references))
    .filter(uniqueAndTrueish);
  const usedBy = (item.usedBy || ([] as SassDoc.UsedBy))
    .map(i => createLinkTo(i, references))
    .filter(uniqueAndTrueish);
  const requires = (item.require || ([] as SassDoc.IRequire[]))
    .map(i => createLinkTo(i, references))
    .filter(uniqueAndTrueish);

  return {
    name,
    type,
    description,
    file: pathName,
    group: item.group[0],
    links,
    see,
    usedBy,
    requires,
  };
}

function formatVariable(
  item: SassDoc.IVariableSassDoc,
  references: ISassDocReference[],
  lookup: Map<string, IVariableLookup>,
  unresolvedVariables: SassDoc.IVariableSassDoc[]
): IVariableSassDoc {
  const {
    context: { name, value, scope },
    description,
    file: { path: pathName },
    type,
    link: links = [] as SassDoc.ILink[],
  } = item;

  const resolvedValue = /\$?rmd/.test(value) ? "" : value;
  if (resolvedValue) {
    lookup.set(name, { name, type, value, resolved: true });
  } else {
    unresolvedVariables.push(item);
  }

  const code = `$${name}: ${value}${scope === "default" ? " !default" : ""};`;
  return {
    ...formatBase(item, references),
    code,
    value: resolvedValue,
  };
}

function toCodeParam({ name, default: defaultValue = "", ...others }) {
  return `$${name}${defaultValue ? `: ${defaultValue.replace(/^rmd/, "$rmd")}` : ""}`;
}

function createFunctionOrMixinCode(
  context: SassDoc.IContext,
  parameters: SassDoc.IParameter[]
): string {
  const { type, code } = context;

  let params = "";
  if (parameters.length) {
    params = `(${parameters.map(toCodeParam).join(", ")})`;
  }

  return `@${type} ${context.name}${params} {${code}}`;
}

function removeUncompilableCode(code: string) {
  const startString = "// START_NO_COMPILE";
  const endString = "// END_NO_COMPILE";
  let startIndex = code.indexOf(startString);
  let endIndex = code.indexOf(endString);
  while (startIndex !== -1 && endIndex !== -1) {
    const whitespace = code.match(/\s*\/\/ START_NO_COMPILE/);
    const whitespaceCount = whitespace ? whitespace[0].indexOf("/") : 0;
    code = `${code.substring(0, startIndex - whitespaceCount)}${code.substring(
      endIndex + endString.length + 1
    )}`;
    startIndex = code.indexOf(startString);
    endIndex = code.indexOf(endString);
  }

  return code;
}

function removeUncompilableCodeComments(code: string) {
  return code.replace(/\s*\/\/ (START|END)_NO_COMPILE\r?\n/g, "\n");
}

function compileExampleCode(example: SassDoc.IExample, packages: string[]) {
  if (example.type !== "scss") {
    return null;
  }

  const { code } = example;
  const data = `
${packages.map(name => `@import '@react-md/${name}/dist/${name}';`).join("\n")}

${removeUncompilableCode(code)}
  `;

  return sass
    .renderSync({
      data,
      includePaths: [TEMP_STYLES_FOLDER],
      outputStyle: "expanded",
    })
    .css.toString();
}

function formatWithParams(
  item: SassDoc.IFunctionSassDoc | SassDoc.IMixinSassDoc,
  references: ISassDocReference[],
  packages: string[]
) {
  const {
    context,
    throw: throws = [] as SassDoc.Throw,
    parameter: parameters = [] as SassDoc.IParameter[],
  } = item;

  const { example: exampleList = [] as SassDoc.IExample[] } = item;
  const examples: ISassDocExample[] = [];
  let i = 0;
  while (i < exampleList.length) {
    const currentExample = exampleList[i];
    const nextExample = exampleList[i + 1];

    try {
      const example: ISassDocExample = {
        ...currentExample,
        code: removeUncompilableCode(currentExample.code),
        compiledCode: compileExampleCode(currentExample, packages),
      };

      if (
        nextExample &&
        nextExample.type === "html" &&
        nextExample.description === currentExample.description
      ) {
        i += 1;
        example.htmlExample = nextExample.code;
      }

      examples.push(example);

      i += 1;
    } catch (e) {
      console.error(
        `There was a problem compiling the \`${context.name}'s\` examples. ` +
          `Unable to compile example ${i + 1}.\n${currentExample.code}\n\n`
      );

      throw e;
    }
  }

  return {
    ...formatBase(item, references),
    code: createFunctionOrMixinCode(context, parameters),
    throws,
    examples,
    parameters,
  };
}

function formatFunction(
  item: SassDoc.IFunctionSassDoc,
  references: ISassDocReference[],
  packages: string[]
): IFunctionSassDoc {
  const { return: returns } = item;

  return {
    ...formatWithParams(item, references, packages),
    returns,
  };
}

function formatMixin(
  item: SassDoc.IMixinSassDoc,
  references: ISassDocReference[],
  packages: string[]
): IMixinSassDoc {
  return formatWithParams(item, references, packages);
}

export default async function sassdoc(clean: boolean) {
  await moveStyles();
  const parsed = await SassDoc.parse(TEMP_STYLES_FOLDER);
  const packages = await getPackages();
  await moveStylesForParsing(packages);

  const references: ISassDocReference[] = parsed.map(
    ({ access, context: { name, type }, group }) => ({
      name,
      type,
      group: group[0],
      private: access === "private",
    })
  );

  const lookup = new Map<string, IVariableLookup>();
  const unresolvedVariables: SassDoc.IVariableSassDoc[] = [];
  const sassdocs = parsed.reduce<IFlattenedSassDocs>(
    // tslint:disable-next-line:no-shadowed-variable
    (sassdocs, item) => {
      if (item.access === "private") {
        return sassdocs;
      }

      const [groupName] = item.group;
      if (!sassdocs[groupName]) {
        sassdocs[groupName] = {
          functions: [],
          mixins: [],
          variables: [],
        };
      }
      const group = sassdocs[groupName];

      const { type } = item.context;
      switch (type) {
        case "function":
          group.functions.push(
            formatFunction(item as SassDoc.IFunctionSassDoc, references, packages)
          );
          break;
        case "variable":
          group.variables.push(
            formatVariable(
              item as SassDoc.IVariableSassDoc,
              references,
              lookup,
              unresolvedVariables
            )
          );
          break;
        case "mixin":
          group.mixins.push(formatMixin(item as SassDoc.IMixinSassDoc, references, packages));
          break;
        default:
          console.error(`An invalid type: \`${type}\` was provided. Please fix for item: `, item);
      }

      return sassdocs;
    },
    {}
  );

  let i = unresolvedVariables.length;
  while (i > 0) {
    i -= 1;
    const {
      context: { name, value },
      type,
    } = unresolvedVariables[i];
    if (!value.match(/if|(rmd(-\w+)+\()/)) {
      const variables = value.match(/\$(rmd(-\w+)+)/g);
      let resolvedValue = "";
      if (type === "Color" && variables) {
        resolvedValue = variables.reduce((updated, codeVariable) => {
          const variable = codeVariable.substring(1);
          if (lookup.has(variable)) {
            return updated.replace(codeVariable, lookup.get(variable).value);
          }

          return updated;
        }, value);

        lookup.set(name, {
          name,
          value: resolvedValue,
          type,
          resolved: /\$?rmd/.test(resolvedValue),
        });
        unresolvedVariables.splice(i, 1);
      } else {
        lookup.set(name, { name, value, type, resolved: false });
      }
    }
  }

  if (clean) {
    await fs.remove(TEMP_STYLES_FOLDER);
  }

  const lookupTablePath = path.join(
    DOCUMENTATION_FOLDER,
    "src",
    "constants",
    "sassdocVariables.json"
  );
  await fs.writeJson(
    lookupTablePath,
    Array.from(lookup).reduce((l, [key, value]) => {
      l[key] = value;
      return l;
    }, {})
  );

  const files = await Promise.all(
    Object.keys(sassdocs).map(group => {
      const packagePath = path.join(
        DOCUMENTATION_COMPONENTS_FOLDER,
        "packages",
        toPascalCase(group)
      );
      const sassdocPath = path.join(packagePath, "sassdoc.json");
      return fs
        .ensureDir(packagePath)
        .then(() => fs.writeJson(sassdocPath, sassdocs[group]))
        .then(() => sassdocPath.substring(sassdocPath.indexOf("src")));
    })
  );
  files.push(lookupTablePath.substring(lookupTablePath.indexOf("src")));
  files.sort();
  console.log(`Created the following sassdoc files:
- ${files.join("\n- ")}
`);
}
