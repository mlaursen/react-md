import { VariableSassDoc } from "sassdoc";
import { CompileOptions, compileScss } from "../compileScss";

export type HackedVariablePrimitive = boolean | number | string | null;
export type HackedVariableValue =
  | HackedVariablePrimitive
  | HackedVariablePrimitive[]
  | HackedVariable[];

export interface HackedVariable {
  name: string;
  value: HackedVariableValue;
}

export interface HackedVar {
  name: string;
  value: HackedVariableValue | HackedVar[];
}

export interface HackSCSSVariableOptions extends CompileOptions {
  scssVariable: VariableSassDoc;
  packageName: string;
  importPath?: string;
}

function parseValue(value: HackedVariableValue) {
  if (value === "true" || value === "false") {
    return Boolean(value);
  } else if (value === "null") {
    return null;
  } else if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed.toString().length === value.length) {
      return parsed;
    }
  }

  return value;
}

function matchParen(s: string, count: number = 0) {
  const match = s.match(/\(|\)/);
  if (!match) {
    return s;
  }

  const i = match.index + 1;
  if (match[0] === ")") {
    if (count === 1) {
      return s.substring(0, i);
    }

    console.log("s:", s);
    console.log("count:", count);
    return s.substring(0, i);
  }

  const prefix = s.substring(0, i);
  if (/rotate|transform/.test(prefix)) {
    const j = s.indexOf(")") + 1;
    if (j === s.length) {
      return s;
    }

    return s.substring(0, j) + matchParen(s.substring(j), count);
  }

  return prefix + matchParen(s.substring(i), count + 1);
}

function hackSCSSMapValues(mapValue: string) {
  let remaining = mapValue.substring(1, mapValue.length - 1);
  const values: HackedVariable[] = [];
  while (remaining.length) {
    const i = remaining.indexOf(": ");
    if (i === -1) {
      console.error(
        "Unable to hack a css variable correctly since no valid key/value split was found."
      );
      console.error("Original Map Value: ", mapValue);
      console.error("Remaining string: ", remaining);
      break;
    }

    const name = remaining.substring(0, i);
    remaining = remaining.substring(i + 2);
    let j =
      name === "font-family"
        ? remaining.search(/, [-a-z]+: /)
        : remaining.indexOf(",");
    if (j === -1) {
      j = remaining.length;
    }

    let value: HackedVariableValue = remaining.substring(0, j);
    if (value.startsWith("(")) {
      const mapString = matchParen(remaining);
      j = mapString.length;
      value = hackSCSSMapValues(mapString);
    } else if (value.includes("(")) {
      value = matchParen(remaining);
      j = (value as string).length;
    }

    value = parseValue(value);
    remaining = remaining.substring(j + 1).trim();
    values.push({ name, value });
  }

  return values;
}

export function isVariableDerived(value: string) {
  return /\$?rmd|if/.test(value);
}

export function hackSCSSVariableValue(
  options: HackSCSSVariableOptions
): HackedVar {
  const {
    scssVariable,
    packageName,
    importPath = "src/mixins",
    ...compileOptions
  } = options;

  const { name, value } = scssVariable.context;
  const prefix = `$${name}: `;

  try {
    const data = `@import '${importPath}';
@error '${prefix}#{${value}}';
`;

    compileScss(
      {
        ...compileOptions,
        data,
        outputStyle: "expanded",
      },
      false
    );
  } catch (error) {
    const { message } = error;
    if (/Undefined variable |File to import not found/.test(message)) {
      console.error(`Variable hack error in ${packageName}`);
      console.error();
      console.error(error.message);
      console.error();
      process.exit(1);
    }

    let value = message.substring(prefix.length);
    switch (scssVariable.type) {
      case "List":
        value = value.split(/\s|,/);
        break;
      case "Map":
        value = hackSCSSMapValues(value);
        break;
      case undefined:
        console.error(`${name} does not have a valid Sass Data Type.`);
        console.error();
        process.exit(1);
        break;
      default:
      // console.log("scssVariable.type:", scssVariable.type);
    }

    return {
      name,
      value: parseValue(value),
    };
  }
}

/**
 * Converts a package's scss variables into a list of variables
 * with their default compiled values.
 */
export function getHackedScssVariableValues(
  variables: VariableSassDoc[],
  packageName: string
) {
  return variables.map(scssVariable =>
    hackSCSSVariableValue({ scssVariable, packageName })
  );
}
