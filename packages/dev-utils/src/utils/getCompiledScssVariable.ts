import { renderSync } from "node-sass";
import { VariableItem } from "sassdoc";

import { tempStylesDir } from "../constants";
import { Primative } from "./json";

export type CompiledScssValue = Primative | CompiledScssVariable[];

export interface CompiledScssVariable {
  name: string;
  value: CompiledScssValue;
}

export function isPrimitive(
  variable: CompiledScssValue
): variable is Primative {
  return (
    !Array.isArray(variable) ||
    (variable[0] !== null && typeof variable[0] !== "object")
  );
}

/**
 * Parses a simple string value into a primitive data type. If the value is not
 * a string, the value will just be returned instead where additional parsing
 * logic will be applied at a later point.
 */
function parse(value: CompiledScssValue): CompiledScssValue {
  if (typeof value !== "string") {
    return value;
  }

  if (value === "null") {
    return null;
  }

  if (/^(true|false)$/i.test(value)) {
    return Boolean(value);
  }

  const number = parseFloat(value);
  if (!Number.isNaN(number) && number.toString().length === value.length) {
    return number;
  }

  return value;
}

function matchParen(s: string, count: number = 0): string {
  const match = s.match(/\(|\)/);
  if (!match) {
    return s;
  }

  const i = match.index + 1;
  if (match[0] === ")") {
    if (count === 1) {
      return s.substring(0, i);
    }

    return s.substring(0, i) + matchParen(s.substring(i), count - 1);
  }

  return s.substring(0, i) + matchParen(s.substring(i), count + 1);
}

/**
 * Parsing a map value is a bit more difficult than all the others since this
 * actually needs to have a parser instead of simple regex or checking since
 * maps can be nested. This "parser" will match parenthesis and and try to
 * deeply parse map values as the primitive data types or a list of primitive
 * data types.
 */
function parseMap(mapValue: string): CompiledScssVariable[] {
  let remaining = mapValue.substring(1, mapValue.length - 1);
  const values: CompiledScssVariable[] = [];
  while (remaining.length) {
    const i = remaining.indexOf(": ");
    if (i === -1) {
      /* eslint-disable no-console */
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

    let value: CompiledScssValue = remaining.substring(0, j);
    if (value.startsWith("(")) {
      const mapString = matchParen(remaining);
      j = mapString.length;
      value = parseMap(mapString);
    } else if (value.includes("(")) {
      value = matchParen(remaining);
      j = (value as string).length;
    }

    value = parse(value);
    remaining = remaining.substring(j + 1).trim();
    values.push({ name, value });
  }

  return values;
}

const DATA_TYPES = ["List", "Map", "Number", "Boolean", "String", "Color"];

function isValidType(type: string): boolean {
  return type
    .split("|")
    .map((s) => s.trim())
    .every((part) => DATA_TYPES.includes(part));
}

/**
 * Whew. Get ready for some great "hacking"! The scss variable's compiled value
 * is created by throwing an error formatted as `$variable: #{$value}`. The
 * value is then extracted by extracting the value after the colon.
 *
 * This probably won't work for every single use-case, but should work for
 * everything within react-md.
 */
export default function getCompiledScssVariable(
  variable: VariableItem
): CompiledScssVariable {
  const {
    file: { path },
    context: { name, value },
    type,
  } = variable;

  const prefix = `$${name}: `;
  const data = `@import '${path}';
@error '${prefix}#{${value}}'`;

  try {
    renderSync({
      data,
      outputStyle: "expanded",
      includePaths: [tempStylesDir],
    });
  } catch (e) {
    const { message } = e;
    if (/Undefined variable |File to import not found/.test(message)) {
      console.error(`Unable to hackily generate the value for "${name}"`);
      console.error();
      console.error(message);
      process.exit(1);
    }

    let value = message.substring(prefix.length);
    switch (type) {
      case "List":
        value = value.split(/\s|,/).map((v) => parse(v));
        break;
      case "Map":
        value = parseMap(value);
        break;
      default:
        // sanity check for typos since sassdoc doesn't have any validation for this
        if (!isValidType(type || "")) {
          console.error(
            `${name} variable has an invalid @type declaration: "${type}"`
          );
          console.error();
          process.exit(1);
        }
    }

    return {
      name,
      value: parse(value),
    };
  }
}
