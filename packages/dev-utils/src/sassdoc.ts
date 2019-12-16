import { readJsonSync } from "fs-extra";
import log from "loglevel";
import { renderSync } from "node-sass";
import { join } from "path";
import { BuiltInParserName } from "prettier";
import { ExampleType, Item, LineNumberRange, VariableItem } from "sassdoc";

import {
  CompiledExample,
  FormattedItem,
  FormattedItemType,
  FormattedVariableItem,
} from "../sassdoc-custom";
import { nonWebpackDist, projectRoot, tempStylesDir } from "./constants";
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
import {
  isFunctionItem,
  isMixinItem,
  isPlaceholderItem,
  isPublic,
  isVariableItem,
} from "./utils/sassdoc";
import writeFile from "./utils/writeFile";

let githubUrl: string;
function getGithubUrl(path: string, lineRange: LineNumberRange): string {
  if (!githubUrl) {
    const packageJson = readJsonSync(join(projectRoot, "package.json"));

    githubUrl = packageJson.repository.url
      .replace("git+", "")
      .replace(".git", "");
  }

  let line = `#L${lineRange.start}`;
  if (lineRange.end !== lineRange.start) {
    line += `-L${lineRange.end}`;
  }

  const location = path.replace("@react-md/", "").replace("dist/scss", "src");
  return `${githubUrl}/blob/master/packages/${location}${line}`;
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

function formatItem(item: Item): FormattedItem {
  const {
    context: { name, line },
    description = "",
    file: { path },
    group,
    link: links,
    see,
    example,
    usedBy,
  } = item;

  let type: FormattedItemType;
  if (isVariableItem(item)) {
    ({ type } = item);
  } else if (
    isFunctionItem(item) ||
    isMixinItem(item) ||
    isPlaceholderItem(item)
  ) {
    ({ type } = item.context);
  } else {
    throw new Error("Impossible");
  }

  let examples: CompiledExample[] | undefined;
  if (example) {
    examples = example.map(({ code, type, description }) => {
      const exampleCode = removeUncompilableCode(code);

      return {
        code: format(exampleCode, getFormatParser(type)),
        compiled: compileExampleCode(exampleCode),
        type,
        description,
      };
    });
  }

  return {
    name,
    type,
    description,
    source: getGithubUrl(path, line),
    links,
    see,
    usedBy,
    group: group[0],
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

function formatVariableItem(variable: VariableItem): FormattedVariableItem {
  const { value, scope } = variable.context;

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
    ...formatItem(variable),
    value,
    compiled,
    overridable: scope === "default",
  };
}

export default async function sassdoc(): Promise<void> {
  await copyStyles();

  const sassdocs = (await getSassdoc()).filter(isPublic);
  const variables = sassdocs.filter(isVariableItem).map(formatVariableItem);
  await writeFile(
    "variables.ts",
    format(`import { FormattedVariableItem } from "./customSassdoc";

const variables: FormattedVariableItem[] = ${JSON.stringify(variables)};

export default variables;
`)
  );

  // console.log(variables);

  // const functions = sassdocs.filter(isFunctionItem);
  // const mixins = sassdocs.filter(isMixinItem);
  // const compiled = getCompiledScssVariables(variables);
  // console.log(compiled);
  await cleanTempStyles();
}
