import * as fs from "fs-extra";
import * as path from "path";
import * as SassDoc from "sassdoc";
import * as cpx from "cpx";

import {
  PACKAGES_FOLDER,
  DOCUMENTATION_FOLDER,
  DOCUMENTATION_COMPONENTS_FOLDER,
  TEMP_STYLES_FOLDER,
} from "../constants";
import { toPascalCase } from "../utils";

interface ISassDocLinkTo {
  name: string;
  description: string;
  type: SassDoc.SassDocType;
  group: string;
}

interface ISassDoc {
  name: string;
  type: SassDoc.Type;
  description: string;
  file: string;
  group: string;
  see: ISassDocLinkTo[];
  usedBy: ISassDocLinkTo[];
  links: SassDoc.LinkList;

  code?: string;
  examples?: SassDoc.ExampleList;
  parameters?: SassDoc.ParameterList;
  requires?: SassDoc.RequireList;
  returns?: SassDoc.Return;
  throws?: SassDoc.Throw;
}

interface IVariableSassDoc extends ISassDoc {
  code: string;
}

interface IMixinSassDoc extends ISassDoc {
  code: string;
  examples: SassDoc.ExampleList;
  parameters: SassDoc.ParameterList;
  throws: SassDoc.Throw;
}

interface IFunctionSassDoc extends ISassDoc {
  code: string;
  examples: SassDoc.ExampleList;
  parameters: SassDoc.ParameterList;
  returns: SassDoc.Return;
  throws: SassDoc.Throw;
}

export interface IFlattenedSassDoc {
  variables: IVariableSassDoc[];
  mixins: IMixinSassDoc[];
  functions: IFunctionSassDoc[];
}

export interface IFlattenedSassDocs {
  [key: string]: IFlattenedSassDoc;
}

interface ISassDocReference {
  name: string;
  type: SassDoc.SassDocType;
  group: string;
  private: boolean;
}

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

function createLinkTo(item: SassDoc.See | SassDoc.Require, references: ISassDocReference[]): ISassDocLinkTo | null {
  const { description = "" } = item;
  let name = "";
  let type: SassDoc.SassDocType;
  if ("context" in item) {
    item = item as SassDoc.See;
    ({ name, type } = item.context);
  } else {
    item = item as SassDoc.Require;
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

function formatBase(item: SassDoc.Item, references: ISassDocReference[]) {
  const {
    context: { name, value, scope },
    description = "",
    file: { path: pathName },
    type,
    link: links = [] as SassDoc.LinkList,
  } = item;
  const see = (item.see || ([] as SassDoc.SeeList)).map(i => createLinkTo(i, references)).filter(Boolean);
  const usedBy = (item.usedBy || ([] as SassDoc.UsedBy)).map(i => createLinkTo(i, references)).filter(Boolean);
  const requires = (item.require || ([] as SassDoc.RequireList)).map(i => createLinkTo(i, references)).filter(Boolean);

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

function formatVariable(item: SassDoc.VariableSassDoc, references: ISassDocReference[]): IVariableSassDoc {
  const {
    context: { name, value, scope },
    description,
    file: { path: pathName },
    type,
    link: links = [] as SassDoc.LinkList,
  } = item;

  const code = `$${name}: ${value}${scope === "default" ? " !default" : ""};`;
  return {
    ...formatBase(item, references),
    code,
  };
}

function formatWithParams(item: SassDoc.FunctionSassDoc | SassDoc.MixinSassDoc, references: ISassDocReference[]) {
  const {
    context: { code },
    throws = [] as SassDoc.Throw,
    example: examples = [] as SassDoc.ExampleList,
    parameter: parameters = [] as SassDoc.ParameterList,
  } = item;

  return {
    ...formatBase(item, references),
    code,
    throws,
    examples,
    parameters,
  };
}

function formatFunction(item: SassDoc.FunctionSassDoc, references: ISassDocReference[]): IFunctionSassDoc {
  const { return: returns } = item;

  return {
    ...formatWithParams(item, references),
    returns,
  };
}

function formatMixin(item: SassDoc.MixinSassDoc, references: ISassDocReference[]): IMixinSassDoc {
  return formatWithParams(item, references);
}

export default async function sassdoc(clean: boolean) {
  await moveStyles();
  const parsed = await SassDoc.parse(TEMP_STYLES_FOLDER);

  const references: ISassDocReference[] = parsed.map(({ access, context: { name, type }, group }) => ({
    name,
    type,
    group: group[0],
    private: access === "private",
  }));

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
          group.functions.push(formatFunction(item as SassDoc.FunctionSassDoc, references));
          break;
        case "variable":
          group.variables.push(formatVariable(item as SassDoc.VariableSassDoc, references));
          break;
        case "mixin":
          group.mixins.push(formatMixin(item as SassDoc.MixinSassDoc, references));
          break;
        default:
          console.error(`An invalid type: \`${type}\` was provided. Please fix for item: `, item);
      }

      return sassdocs;
    },
    {}
  );

  if (clean) {
    await fs.remove(TEMP_STYLES_FOLDER);
  }

  const files = await Promise.all(
    Object.keys(sassdocs).map(group => {
      const packagePath = path.join(DOCUMENTATION_COMPONENTS_FOLDER, "packages", toPascalCase(group));
      const sassdocPath = path.join(packagePath, "sassdoc.json");
      return fs
        .ensureDir(packagePath)
        .then(() => fs.writeJson(sassdocPath, sassdocs[group]))
        .then(() => sassdocPath.substring(sassdocPath.indexOf("src")));
    })
  );
  files.sort();
  console.log(`Created the following sassdoc files:
- ${files.join("\n- ")}
`);
}
