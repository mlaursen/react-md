import { format } from "prettier";
import { type VariableItem } from "sassdoc";

import { assertValidVariableDataType } from "./assertions.js";
import { compileScss } from "./compileScss.js";
import {
  type Primative,
  type SimplePrimative,
  type ValuedVariable,
  type VariableValue,
} from "./types.js";

function isPrimitive(variable: VariableValue): variable is Primative {
  return (
    !Array.isArray(variable) ||
    (variable[0] !== null && typeof variable[0] !== "object")
  );
}

function isNestedList(value: VariableValue): value is ValuedVariable[] {
  return Array.isArray(value) && typeof value[0] === "object";
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
    // eslint-disable-next-line no-param-reassign
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

function isListValue(remaining: string): boolean {
  const maybeList = consumeMatchingParens(remaining);
  return maybeList !== remaining && !maybeList.includes(":");
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
    } else if (
      isCssFunction(remaining, nextMatchIndex) ||
      isListValue(remaining)
    ) {
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

function parseList(compiledValue: string): SimplePrimative[] {
  return compiledValue
    .split(/\s|,/)
    .map((part) => parseValue(part)) as SimplePrimative[];
}

function compileVariableValue(
  src: string,
  variable: VariableItem,
  index?: number
): ValuedVariable {
  const {
    context: { name, value: originalValue },
    file: { path },
    type = "",
  } = variable;
  assertValidVariableDataType(type);

  // this causes the `meta.inspect` to fail since it thinks there are two arguments.
  if (originalValue === "Roboto, sans-serif") {
    return { name, value: originalValue };
  }

  const scss = `@use "${path}";
`;
  const outputCode = `.output {
--value: #{meta.inspect(${originalValue})};
}
`;
  let output = "";
  try {
    output = compileScss({
      src,
      scss,
      path,
      getCurrentPathContents: (contents) => {
        return `${contents}\n\n${outputCode}`;
      },
    });
  } catch (e) {
    console.error("Unable to compile a variable:");
    console.error("name:", name);
    console.error("value:", originalValue);
    console.error("path:", variable.file.path);
    console.error();
    if (e instanceof Error) {
      console.error(e);
    }

    process.exit(1);
  }

  const compiledValue = output
    .substring(output.indexOf("--value") + "--value: ".length)
    .replace(";\n}", "");

  let value: VariableValue;
  switch (type) {
    case "List":
      value = parseList(compiledValue);
      break;
    case "Map":
      try {
        value = parseMap(compiledValue);
      } catch (e) {
        console.error(`Unable to parse the map: ${name}`);
        console.error(`index is: "${index}"`);
        console.error(compiledValue);
        if (e instanceof Error) {
          console.error();
          console.error(e.message);
          console.error(e.stack);
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

async function stringifyVariableValue(value: VariableValue): Promise<string> {
  if (value === null || isPrimitive(value)) {
    return `${value}`;
  }

  if (!isNestedList(value)) {
    const prefix = "export default ";
    const formatted = await format(`${prefix}${JSON.stringify(value)}`, {
      parser: "typescript",
    });

    return formatted.substring(prefix.length);
  }

  const parts: string[] = [];
  // need to do it synchronously to maintain order
  for (const part of value) {
    parts.push(`${part.name}: ${await stringifyVariableValue(part.value)}`);
  }
  const prefix = "$compiled-to: ";
  const code = `${prefix}(${parts.join(",\n")})`;
  const formatted = await format(code, { parser: "scss" });

  return formatted.replace(/;\r?\n$/, "").substring(prefix.length);
}

export async function getCompiledVariableValue(
  src: string,
  variable: VariableItem
): Promise<string> {
  return await stringifyVariableValue(
    compileVariableValue(src, variable).value
  );
}
