import log from "loglevel";
import { renderSync } from "sass";
import { VariableItem } from "sassdoc";

import { Primative, SimplePrimative } from "../../constants";
import { getEverythingScss } from "./combineAllFiles";

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

  // remove additional quotes around strings and remove parens around font-family
  if (/^('|").+\1$/.test(value) || /^\(.+\)$/.test(value)) {
    value = value.substring(1, value.length - 1);
  }

  // remove additional spaces that get added to css functions somtimes
  return value.replace(/((\()\s+)|(\s+(\)))/g, "$2$4");
}

function consumeMatchingParens(s: string, totalParens = 0): string {
  const match = s.match(/\(|\)/);
  if (!match || typeof match.index === "undefined") {
    return s;
  }

  const i = match.index + 1;
  let addition = 1;
  if (match[0] === ")") {
    if (totalParens === 1) {
      return s.substring(0, i);
    }

    addition = -1;
  }

  return (
    s.substring(0, i) +
    consumeMatchingParens(s.substring(i), totalParens + addition)
  );
}

function isCssFunction(remaining: string, endIndex: number): boolean {
  return /(var|calc|rgba?|rotate(3d)?|translate(X|Y|3d)?|cubic-bezier)\(/.test(
    remaining.substring(0, endIndex + 1)
  );
}

const VALUE_SEP = ": ";

function parseMap(mapString: string): ValuedVariable[] {
  const values: ValuedVariable[] = [];

  if (mapString[0] !== "(" || mapString[mapString.length - 1] !== ")") {
    throw new Error("INVALID MAP FORMAT");
  }

  let remaining = mapString.substring(1, mapString.length - 1);
  while (remaining.length) {
    const sepIndex = remaining.indexOf(VALUE_SEP);
    if (sepIndex === -1) {
      throw new Error("Unable to find a name");
    }

    const name = remaining.substring(0, sepIndex);
    remaining = remaining.substring(sepIndex + VALUE_SEP.length);
    if (name === "font-family") {
      const tokenIndex = remaining.search(/, [-a-z]+: /);
      if (tokenIndex !== -1) {
        const value = remaining.substring(0, tokenIndex);
        values.push({
          name,
          value: parseValue(value),
        });
        remaining = remaining.substring(tokenIndex + 1).trim();
        continue;
      } else {
        throw new Error("unsupported font-family value");
      }
    }

    const nextMatch = remaining.match(/\(|\)|,/);
    if (!nextMatch) {
      values.push({
        name,
        value: parseValue(remaining),
      });
      break;
    }

    const nextMatchIndex = nextMatch.index;
    if (typeof nextMatchIndex !== "number") {
      throw new Error("NO MATCHINDEX");
    }

    const token = remaining[nextMatchIndex];
    if (token === ",") {
      values.push({
        name,
        value: parseValue(remaining.substring(0, nextMatchIndex)),
      });

      remaining = remaining.substring(nextMatchIndex + 1);
    } else if (token === ")") {
      throw new Error(`token: "${token}"`);
    } else if (isCssFunction(remaining, nextMatchIndex)) {
      const variableValue = consumeMatchingParens(remaining);
      values.push({
        name,
        value: parseValue(variableValue),
      });
      remaining = remaining.substring(variableValue.length + 1);
    } else {
      const nextMap = consumeMatchingParens(remaining);
      values.push({
        name,
        value: parseMap(nextMap),
      });

      remaining = remaining.substring(nextMap.length).replace(/^,\s+/, "");
    }

    remaining = remaining.trim();
  }

  return values;
}

export function getCompiledValue(
  variable: VariableItem,
  index?: number
): ValuedVariable {
  const {
    context: { name, value: originalValue },
    type,
  } = variable;

  // sanity check for typos since sassdoc doesn't have any validation for this
  if (!isValidType(type || "")) {
    log.error(`${name} variable has an invalid @type declaration: "${type}"`);
    log.error(`index is: "${index}"`);
    log.error();
    process.exit(1);
  }

  // this causes the `meta.inspect` to fail since it thinks there are two arguments.
  if (originalValue === "Roboto, sans-serif") {
    return { name, value: originalValue };
  }

  const data = `${getEverythingScss()}

.output {
  --value: #{meta.inspect(${originalValue})};
}
`;

  let output = "";
  try {
    output = renderSync({
      data,
      outputStyle: "expanded",
    }).css.toString();
  } catch (e) {
    log.error(`name: ${name}`);
    log.error(`value: ${originalValue}`);
    log.error("");

    if (e instanceof Error) {
      log.error(e.message);
    }
    process.exit(1);
  }

  // since the `rmd-option-selected-content` is unicode, an `@charset` value
  // might also be rendered in the output
  const compiledValue = output
    .substring(output.indexOf("--value") + "--value: ".length)
    .replace(";\n}", "");

  let value: VariableValue;
  switch (type) {
    case "List":
      value = compiledValue
        .split(/\s|,/)
        .map((part) => parseValue(part)) as SimplePrimative[];
      break;
    case "Map":
      try {
        value = parseMap(compiledValue);
      } catch (e) {
        log.error(`Unable to parse the map: ${name}`);
        log.error(`index is: "${index}"`);
        log.error(compiledValue);
        if (e instanceof Error) {
          log.error(e.message);
        }
        process.exit(1);
      }
      break;
    default:
      value = parseValue(compiledValue);
  }

  return {
    name,
    value,
  };
}
