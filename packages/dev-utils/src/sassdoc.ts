import { writeFile } from "fs-extra";
import { omit } from "lodash";
import log from "loglevel";
import { join } from "path";
import { BuiltInParserName } from "prettier";
import { renderSync } from "sass";
import {
  ExampleType,
  FunctionItem,
  Item,
  ItemReference,
  ItemRequire,
  MixinItem,
  VariableItem,
} from "sassdoc";

import { nonWebpackDist, packagesRoot, src } from "./constants";
import {
  combineAllFiles,
  CompiledExample,
  format,
  FormattedFunctionItem,
  FormattedItem,
  FormattedItemLink,
  FormattedMixinItem,
  FormattedVariableItem,
  getColorVariables,
  getCompiledValue,
  getEverythingScss,
  getSassdoc,
  isFunctionItem,
  isMixinItem,
  isPrimitive,
  isPublic,
  isVariableItem,
  ItemReferenceLink,
  PackageSassDoc,
  PackageSassDocMap,
  ParameterizedItem,
  ValuedVariable,
  VariableValue,
} from "./utils";

export interface FullItemReferenceLink extends ItemReferenceLink {
  private: boolean;
}

const NO_COMPILE_TOKEN = "<!-- no-compile -->";
const OVERRIDE_VARIABLES_TOKEN = "// OVERRIDE_VARIABLES";
const isCompileable = (value: string): boolean =>
  /\$?rmd|if\(/.test(value) && !/^--rmd/.test(value);

const isNestedList = (value: VariableValue): value is ValuedVariable[] =>
  Array.isArray(value) && typeof value[0] === "object";

function getPackageName(item: Item): string {
  const [packageName] = item.group;

  return packageName.replace(/(form).+/, "$1");
}

function createReferenceLink(item: Item): FullItemReferenceLink {
  const { name, type } = item.context;

  return {
    name,
    type,
    packageName: getPackageName(item),
    private: !isPublic(item),
  };
}

/**
 * Updates the decription text to remove the trailing newlines as well as
 * replace all inline newlines with spaces
 */
function formatDescription(description: string | undefined = ""): string {
  return description
    .replace(NO_COMPILE_TOKEN, "")
    .replace(/\r?\n\r?\n$/, "")
    .replace(/([A-z0-9])\r?\n([A-z0-9])/g, "$1 $2");
}

function getCompiledValueString(value: VariableValue): string {
  if (value === null || isPrimitive(value)) {
    return `${value}`;
  }

  if (!isNestedList(value)) {
    const prefix = "export default ";
    return format(`${prefix}${JSON.stringify(value)}`).substring(prefix.length);
  }

  const mapValues = value
    .map(({ name, value }) => `${name}: ${getCompiledValueString(value)}`)
    .join(",\n");

  const prefix = "$compiled-to: ";
  const code = `${prefix}(${mapValues})`;
  return format(code, "scss")
    .replace(/;\r?\n$/, "")
    .substring(prefix.length);
}

function compileExampleCode(code: string, path: string, name: string): string {
  let data = code;
  let prefix = "";
  const i = code.indexOf(OVERRIDE_VARIABLES_TOKEN);
  if (i !== -1) {
    prefix = code.substring(0, i);
    data = code.substring(i + OVERRIDE_VARIABLES_TOKEN.length);
  }

  // since everything is part of the same stylesheet to prevent the `@import` IO
  // slowdown, have to update variables to be `!global` so that they will be
  // overridden/found correctly. (mostly typography)
  data = `${getColorVariables()}
${prefix.replace(/;$/g, " !global;")}

${getEverythingScss()}

${data}`;

  try {
    return format(renderSync({ data }).css.toString(), "css");
  } catch (e) {
    log.error("Unable to compile an example with the following code:");
    log.error(code);
    log.error();
    log.error(`path: ${path}`);
    log.error(`name: ${name}`);
    log.error();
    if (e instanceof Error) {
      log.error(e.message);
    }
    process.exit(1);
  }
}

function getGithubUrl(path: string, start?: number, end?: number): string {
  let line = "";
  if (typeof start === "number") {
    line = `#L${start}`;
  }

  if (typeof end === "number" && start !== end) {
    line += `-L${end}`;
  }

  return `packages/${path}${line}`;
}

function getFormatParser(type: ExampleType): BuiltInParserName {
  switch (type) {
    case "markup":
      return "markdown";
    case "javascript":
      return "babel";
    default:
      return type;
  }
}

function removeUncompilableCode(code: string): string {
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
const isItemRequire = (
  item: ItemReference | ItemRequire
): item is ItemRequire => typeof (item as ItemRequire).name === "string";

function getReferenceLinks(
  items: (ItemReference | ItemRequire)[] | undefined,
  referenceLinks: FullItemReferenceLink[]
): ItemReferenceLink[] | undefined {
  if (!items) {
    return undefined;
  }

  const added = new Set<string>();
  const links = items.reduce<ItemReferenceLink[]>((list, item) => {
    const { name, type } = isItemRequire(item) ? item : item.context;
    const link = referenceLinks.find(
      (ref) => ref.name === name && ref.type === type
    );

    if (!link) {
      throw new Error(`Unable to find a reference for ${name} ${type}`);
    }

    const key = `${name}-${type}`;
    if (!added.has(key)) {
      added.add(key);
      list.push(omit(link, "private"));
    }

    return list;
  }, []);

  return links.length ? links : undefined;
}

function formatItem(
  item: Item,
  references: FullItemReferenceLink[]
): FormattedItem {
  const {
    context: { name, line },
    description = "",
    file: { path },
    link,
    see,
    example,
    usedBy,
    require,
    since,
  } = item;

  let examples: CompiledExample[] | undefined;
  if (example) {
    examples = example.map(({ code, type, description }) => {
      const exampleCode = removeUncompilableCode(code);
      let compiled: string | undefined;
      if (type === "scss" && !description.includes(NO_COMPILE_TOKEN)) {
        compiled = compileExampleCode(exampleCode, path, name);
      }

      return {
        code: format(
          exampleCode.replace(OVERRIDE_VARIABLES_TOKEN, ""),
          getFormatParser(type)
        ),
        compiled,
        type,
        description: formatDescription(description),
      };
    });
  }

  let links: FormattedItemLink[] | undefined;
  if (link) {
    links = link.map(({ url, caption }) => ({
      name: caption || "",
      href: url,
    }));
  }

  return {
    name,
    description: formatDescription(description),
    source: getGithubUrl(
      path.replace("@react-md/", "").replace(nonWebpackDist, src),
      line.start,
      line.end
    ),
    since: since?.[0]?.version,
    links,
    see: getReferenceLinks(see, references),
    usedBy: getReferenceLinks(usedBy, references),
    requires: getReferenceLinks(require, references),
    packageName: getPackageName(item),
    examples,
  };
}

function formatVariableItem(
  variable: VariableItem,
  references: FullItemReferenceLink[]
): FormattedVariableItem {
  const { value, scope } = variable.context;
  const { type } = variable;
  if (!type) {
    log.error(`${variable.context.name} does not have a \`type\` set.`);
    process.exit(1);
  }

  let compiled: string | undefined;
  if (isCompileable(value)) {
    compiled = getCompiledValueString(getCompiledValue(variable).value);

    if (compiled === value) {
      log.error(
        "Found a variable with the same compiled value. The `isCompileable` function should be updated."
      );
      log.error(`${variable.context.name}: ${value}`);
      compiled = undefined;
    }
  }

  return {
    ...formatItem(variable, references),
    type,
    value,
    compiled,
    overridable: scope === "default",
  };
}

type MixinOrFunction = MixinItem | FunctionItem;

function createParamaterizedItem<T extends MixinOrFunction>({
  context,
  parameter,
  throw: throws,
}: T): ParameterizedItem {
  const { name, type } = context;
  let params = "";
  if (parameter) {
    params = parameter
      .map((param) => {
        const { name } = param;
        const defaultValue = (param.default || "").replace(/^rmd/, "$rmd");
        const suffix = defaultValue && `: ${defaultValue}`;

        return `$${name}${suffix}`;
      })
      .join(", ");

    params = `(${params})`;
  }

  const sourceCode = `@${type} ${name}${params} {${context.code}}`;
  const prefix = sourceCode.substring(0, sourceCode.indexOf("{") + 1);
  const suffix = sourceCode.substring(sourceCode.lastIndexOf("}"));
  const code = `${prefix} \u2026 ${suffix}`;

  return {
    code,
    sourceCode: format(sourceCode, "scss"),
    throws,
  };
}

function formatFunctionItem(
  func: FunctionItem,
  references: FullItemReferenceLink[]
): FormattedFunctionItem {
  return {
    ...formatItem(func, references),
    ...createParamaterizedItem(func),
    type: "function",
    parameters: func.parameter.map(({ description, ...param }) => ({
      ...param,
      description: formatDescription(description),
    })),
    returns: func.return,
  };
}

function formatMixinItem(
  mixin: MixinItem,
  references: FullItemReferenceLink[]
): FormattedMixinItem {
  return {
    ...formatItem(mixin, references),
    ...createParamaterizedItem(mixin),
    type: "mixin",
    parameters: mixin.parameter?.map(({ description, ...param }) => ({
      ...param,
      description: formatDescription(description),
    })),
  };
}

function getPackageRecord(
  lookup: PackageSassDocMap,
  packageName: string
): PackageSassDoc {
  if (!lookup[packageName]) {
    lookup[packageName] = {
      functions: {},
      mixins: {},
      variables: {},
    };
  }

  const record = lookup[packageName];
  if (!record) {
    throw new Error();
  }

  return record;
}

export async function sassdoc(): Promise<void> {
  combineAllFiles();
  const documentationSassdoc = join(
    packagesRoot,
    "documentation",
    src,
    "constants",
    "sassdoc"
  );
  const sassdocs = await getSassdoc();
  const references = sassdocs.map((item) => createReferenceLink(item));
  const lookup: PackageSassDocMap = {};

  sassdocs.forEach((item) => {
    const packageName = getPackageName(item);
    const packageDoc = getPackageRecord(lookup, packageName);
    if (isVariableItem(item)) {
      const variable = formatVariableItem(item, references);
      const { name } = variable;
      if (packageDoc.variables[name]) {
        throw new Error(
          `${name} already exists in ${packageName}'s variables...`
        );
      }

      packageDoc.variables[name] = variable;
    }

    if (isFunctionItem(item)) {
      const func = formatFunctionItem(item, references);
      const { name } = func;
      if (packageDoc.functions[name]) {
        throw new Error(
          `${name} already exists in ${packageName}'s functions...`
        );
      }

      packageDoc.functions[name] = func;
    }

    if (isMixinItem(item)) {
      const mixin = formatMixinItem(item, references);
      const { name } = mixin;
      if (packageDoc.mixins[name]) {
        throw new Error(`${name} already exists in ${packageName}'s mixins...`);
      }

      packageDoc.mixins[name] = mixin;
    }
  });

  await Promise.all(
    Object.entries(lookup).map(([packageName, sassdoc]) => {
      const contents = `/** this file is generated from \`yarn dev-utils sassdoc\` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = ${JSON.stringify(sassdoc)}

export default sassdoc;
`;
      return writeFile(
        join(documentationSassdoc, `${packageName}.ts`),
        format(contents)
      );
    })
  );
}
