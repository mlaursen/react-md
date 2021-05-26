import { VariableItem } from "sassdoc";
import log from "loglevel";
import { renderSync } from "sass";
import { tempStylesDir, Primative, SimplePrimative } from "../../constants";

export type VariableValue =
  | SimplePrimative
  | SimplePrimative[]
  | ValuedVariable
  | ValuedVariable[];

export interface ValuedVariable {
  name: string;
  value: VariableValue;
}

const DATA_TYPES = ["List", "Map", "Number", "Boolean", "String", "Color"];

export function isPrimitive(variable: VariableValue): variable is Primative {
  return (
    !Array.isArray(variable) ||
    (variable[0] !== null && typeof variable[0] !== "object")
  );
}

function isValidType(type: string): boolean {
  return type
    .split("|")
    .map((s) => s.trim())
    .every((part) => DATA_TYPES.includes(part));
}

function parseValue(value: VariableValue): VariableValue {
  if (typeof value !== "string") {
    return value;
  }

  if (value === "null") {
    return null;
  }

  if (/^(true|false)$/i.test(value)) {
    return value === "true";
  }

  const number = parseFloat(value);
  if (!Number.isNaN(number) && number.toString().length === value.length) {
    return number;
  }

  return value;
}

function matchParen(s: string, count = 0): string {
  const match = s.match(/\(|\)/);
  if (!match || typeof match.index === "undefined") {
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

function parseMap(mapValue: string): ValuedVariable[] {
  let remaining = mapValue.substring(1, mapValue.length - 1);
  const values: ValuedVariable[] = [];
  while (remaining.length) {
    const i = remaining.indexOf(": ");
    if (i === -1) {
      log.error(
        "Unable to hack a css variable correctly since no valid key/value split was found."
      );
      log.error("Original Map Value: ", mapValue);
      log.error("Remaining string: ", remaining);
      process.exit(1);
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

    const remainingString = remaining.substring(0, j);
    let value: VariableValue = remainingString;
    if (remainingString.startsWith("(")) {
      const mapString = matchParen(remaining);
      j = mapString.length;
      value = parseMap(mapString);
    } else if (remainingString.includes("(")) {
      const matched = matchParen(remaining);
      j = matched.length;
      value = matched;
    }

    value = parseValue(value);
    remaining = remaining.substring(j + 1).trim();
    values.push({ name, value });
  }

  return values;
}

export function getCompiledValue(variable: VariableItem): ValuedVariable {
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
    throw new Error("Should never happen");
  } catch (e) {
    const { message } = e as Error;
    if (/Undefined variable |File to import not found/.test(message)) {
      log.error(`Unable to hackily generate the value for "${name}"`);
      log.error();
      log.error(message);
      process.exit(1);
    }

    let value: VariableValue = message.substring(prefix.length);
    switch (type) {
      case "List": {
        const parsed = value
          .split(/\s|,/)
          .map((part) => parseValue(part)) as SimplePrimative[];

        value = parsed;
        break;
      }
      case "Map":
        value = parseMap(value);
        break;
      default:
        // sanity check for typos since sassdoc doesn't have any validation for this
        if (!isValidType(type || "")) {
          log.error(
            `${name} variable has an invalid @type declaration: "${type}"`
          );
          log.error();
          process.exit(1);
        }
        value = parseValue(value);
    }

    return {
      name,
      value,
    };
  }
}
