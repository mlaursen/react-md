import { readFile } from "fs-extra";
import { omit } from "lodash";
import log from "loglevel";
import { renderSync } from "node-sass";
import { join } from "path";
import { BuiltInParserName } from "prettier";
import {
  ExampleType,
  FunctionItem,
  Item,
  ItemReference,
  MixinItem,
  VariableItem,
} from "sassdoc";

import { nonWebpackDist, packagesRoot, src, tempStylesDir } from "./constants";
import {
  CompiledExample,
  FormattedFunctionItem,
  FormattedItem,
  FormattedItemLink,
  FormattedMixinItem,
  FormattedVariableItem,
  isFunctionItem,
  isMixinItem,
  isPublic,
  isVariableItem,
  ItemReferenceLink,
  PackageSassDocMap,
  ParameterizedItem,
  ParameterizedItemParameter,
} from "./sassdoc-custom";
import copyStyles from "./utils/copyStyles";
import format from "./utils/format";
import getCompiledScssVariable, {
  CompiledScssValue,
  CompiledScssVariable,
  isPrimitive,
} from "./utils/getCompiledScssVariable";
import getPackages from "./utils/getPackages";
import getSassdoc from "./utils/getSassdoc";
import { cleanTempStyles } from "./utils/moveToTempStyles";
import writeFile from "./utils/writeFile";

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

function compileExampleCode(code: string): string {
  const imports = getPackages("scss")
    .map(p => `@import '@react-md/${p}/${nonWebpackDist}/mixins';`)
    .join("\n");
  const data = `${imports}
@import '@react-md/icon/${nonWebpackDist}/material-icons';

${code}
`;

  try {
    return format(
      renderSync({
        data,
        includePaths: [tempStylesDir],
      }).css.toString(),
      "css"
    );
  } catch (e) {
    log.error("Unable to compile an example with the following code:");
    log.error(code);
    log.error();
    log.error(e.message);
    process.exit(1);
  }
}

/**
 * Updates the decription text to remove the trailing newlines as well as
 * replace all inline newlines with spaces
 */
function formatDescription(description: string | undefined = ""): string {
  return description
    .replace(/\r?\n\r?\n$/, "")
    .replace(/([A-z0-9])\r?\n([A-z0-9])/g, "$1 $2");
}

export interface FullItemReferenceLink extends ItemReferenceLink {
  private: boolean;
}

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

function getReferenceLinks(
  references: ItemReference[] | undefined,
  referenceLinks: FullItemReferenceLink[]
): ItemReferenceLink[] | undefined {
  if (!references) {
    return undefined;
  }

  const links = references
    .map(reference => {
      const { name, type } = reference.context;
      const link = referenceLinks.find(
        reference => reference.name === name && reference.type === type
      );

      if (!link) {
        throw new Error(`Unable to find a reference for ${name} ${type}`);
      }

      if (link.private) {
        return null;
      }

      return omit(link, "private");
    })
    .filter(Boolean);

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
  } = item;

  let examples: CompiledExample[] | undefined;
  if (example) {
    examples = example.map(({ code, type, description }) => {
      const exampleCode = removeUncompilableCode(code);
      let compiled: string | undefined;
      if (type === "scss") {
        compiled = compileExampleCode(exampleCode);
      }

      return {
        code: format(exampleCode, getFormatParser(type)),
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
    links,
    see: getReferenceLinks(see, references),
    usedBy: getReferenceLinks(usedBy, references),
    packageName: getPackageName(item),
    examples,
  };
}

const isCompileable = (value: string): boolean =>
  /\$?rmd|if\(/.test(value) && !/^--rmd/.test(value);

const isNestedList = (
  value: CompiledScssValue
): value is CompiledScssVariable[] =>
  Array.isArray(value) && typeof value[0] === "object";

function getCompiledValue(value: CompiledScssValue): string {
  if (value === null || isPrimitive(value)) {
    return `${value}`;
  }

  if (!isNestedList(value)) {
    const prefix = "export default ";
    return format(`${prefix}${JSON.stringify(value)}`).substring(prefix.length);
  }

  const mapValues = value
    .map(({ name, value }) => `${name}: ${getCompiledValue(value)}`)
    .join(",\n");

  const prefix = "$compiled-to: ";
  const code = `${prefix}(${mapValues})`;
  return format(code, "scss")
    .replace(/;\r?\n$/, "")
    .substring(prefix.length);
}

function formatVariableItem(
  variable: VariableItem,
  references: FullItemReferenceLink[]
): FormattedVariableItem {
  const { value, scope } = variable.context;
  const { type } = variable;

  let compiled: string | undefined;
  if (isCompileable(value)) {
    compiled = getCompiledValue(getCompiledScssVariable(variable).value);

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

interface ParameterizedCodeOptions {
  name: string;
  type: "function" | "mixin";
  code: string;
  parameters: ParameterizedItemParameter[] | undefined;
}

function createParamaterizedItem<T extends MixinItem | FunctionItem>({
  context,
  parameter,
  throw: throws,
}: T): ParameterizedItem {
  const { name, type } = context;
  let params = "";
  if (parameter) {
    params = parameter
      .map(param => {
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

const devUtilsSrc = join(packagesRoot, "dev-utils", src);
const documentationSrc = join(packagesRoot, "documentation", src);
const documentationSassdoc = join(documentationSrc, "constants", "sassdoc");

/**
 * This creates a custom utils/sassdoc.ts file within the documentation site
 * that is a combination of the sassdoc.d.ts and the sassdoc-custom.ts within
 * this package. It's kind of hacky, but I was getting errors when trying to
 * reuse these definitions in the documentation site.
 */
export async function createSassdocUtil(): Promise<void> {
  const sassdocDef = await readFile(join(devUtilsSrc, "sassdoc.d.ts"), "utf8");
  const customDef = await readFile(
    join(devUtilsSrc, "sassdoc-custom.ts"),
    "utf8"
  );

  const sassdocLines = sassdocDef.split(/\r?\n/);
  const sassdocStart = sassdocLines.findIndex(line =>
    line.startsWith("declare module")
  );
  const sassdocEnd = sassdocLines.findIndex(line =>
    line.startsWith("  export interface ParseOptions")
  );
  const sassdocTypes = sassdocLines
    .slice(sassdocStart + 1, sassdocEnd)
    .join("\n");

  const customLines = customDef.split(/\r?\n/);
  const customStart = customLines.findIndex(line =>
    line.startsWith('export * from "sassdoc')
  );
  const customContent = customLines.slice(customStart + 1).join("\n");

  const contents = format(
    `/** this is a generated file from \`yarn dev-utils sassdoc\` and should not be manually updated */
${sassdocTypes}${customContent}`,
    "typescript"
  );
  await writeFile(join(documentationSrc, "utils", "sassdoc.ts"), contents);
}

export default async function sassdoc(): Promise<void> {
  await copyStyles();
  await createSassdocUtil();

  const sassdocs = await getSassdoc();
  const publicSassdocs = sassdocs.filter(isPublic);
  const references = sassdocs.map(item => createReferenceLink(item));
  const lookup: PackageSassDocMap = {};
  publicSassdocs.forEach(item => {
    const packageName = getPackageName(item);
    if (!lookup[packageName]) {
      lookup[packageName] = {
        functions: {},
        mixins: {},
        variables: {},
      };
    }

    const packageDoc = lookup[packageName];
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

  await cleanTempStyles();
}
