import * as fs from "fs-extra";
import * as path from "path";
import * as SassDoc from "sassdoc";
import * as cpx from "cpx";

import {
  IVariableLookup,
  IVariableSassDoc,
  IMixinSassDoc,
  IFunctionSassDoc,
  ISassDocReference,
  ISassDocLinkTo,
  IFlattenedSassDocs,
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
        resolve();
      }
    });
  });
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

function formatWithParams(
  item: SassDoc.IFunctionSassDoc | SassDoc.IMixinSassDoc,
  references: ISassDocReference[]
) {
  const {
    context,
    throw: throws = [] as SassDoc.Throw,
    example: examples = [] as SassDoc.IExample[],
    parameter: parameters = [] as SassDoc.IParameter[],
  } = item;

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
  references: ISassDocReference[]
): IFunctionSassDoc {
  const { return: returns } = item;

  return {
    ...formatWithParams(item, references),
    returns,
  };
}

function formatMixin(item: SassDoc.IMixinSassDoc, references: ISassDocReference[]): IMixinSassDoc {
  return formatWithParams(item, references);
}

export default async function sassdoc(clean: boolean) {
  await moveStyles();
  const parsed = await SassDoc.parse(TEMP_STYLES_FOLDER);

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
          group.functions.push(formatFunction(item as SassDoc.IFunctionSassDoc, references));
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
          group.mixins.push(formatMixin(item as SassDoc.IMixinSassDoc, references));
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
