import {
  type BuiltInParserName,
  type Options as PrettierOptions,
  format,
} from "prettier";
import "server-only";

import { type SupportedCodeLanguage } from "../types.js";

function isBuiltInParser(
  parser: SupportedCodeLanguage | BuiltInParserName | undefined
): parser is BuiltInParserName {
  return (
    !!parser &&
    [
      "acorn",
      "angular",
      "babel-flow",
      "babel-ts",
      "babel",
      "css",
      "espree",
      "flow",
      "glimmer",
      "graphql",
      "html",
      "json-stringify",
      "json",
      "json5",
      "jsonc",
      "less",
      "lwc",
      "markdown",
      "mdx",
      "meriyah",
      "scss",
      "typescript",
      "vue",
      "yaml",
    ].includes(parser)
  );
}

export interface FormatCodeOptions extends PrettierOptions {
  code: string;
  parser?: SupportedCodeLanguage | BuiltInParserName;
}

export function getFormatCodeParser(
  options: FormatCodeOptions
): BuiltInParserName | undefined {
  const { code, parser, filepath } = options;

  if (isBuiltInParser(parser)) {
    return parser;
  }

  if (typeof filepath === "string") {
    return;
  }

  switch (parser) {
    case "js":
    case "jsx":
      return "babel";
    case "ts":
    case "tsx":
      return "typescript";
    case "sh":
    case "diff":
      throw new Error(`prettier parser: "${parser}" is not supported`);
  }

  if (code.startsWith("{") || code.startsWith("[")) {
    return "json";
  }

  if (/^(@import|\.[a-z])/m.test(code) || /^\s+@(mixin|include)/.test(code)) {
    return "scss";
  }

  return "typescript";
}

export interface FormatCodeResult {
  formatted: string;
  error?: string;
}

export async function formatCode(
  options: FormatCodeOptions
): Promise<FormatCodeResult> {
  const { code } = options;
  try {
    const formatted = await format(code, {
      ...options,
      parser: getFormatCodeParser(options),
    });

    return {
      formatted,
    };
  } catch (e) {
    return {
      formatted: code,
      error: e instanceof Error ? e.message : "Unable to format code",
    };
  }
}
