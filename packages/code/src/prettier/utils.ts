import { type BuiltInParserName } from "prettier";

import { type SupportedCodeLanguage } from "../types.js";

export const BUILT_IN_PARSERS = [
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
] satisfies readonly BuiltInParserName[];

export function isBuiltInParser(
  lang: string | undefined
): lang is BuiltInParserName {
  return !!lang && BUILT_IN_PARSERS.includes(lang as BuiltInParserName);
}

export function getParser(
  lang: SupportedCodeLanguage
): BuiltInParserName | undefined {
  if (isBuiltInParser(lang)) {
    return lang;
  }

  switch (lang) {
    case "js":
    case "jsx":
      return "babel";
    case "ts":
    case "tsx":
      return "typescript";
    default:
    // unsupported
  }
}

export function getParserOrThrow(
  lang: SupportedCodeLanguage
): BuiltInParserName {
  const parser = getParser(lang);
  if (!parser) {
    throw new Error(`prettier does not support lang: "${lang}"`);
  }
  return parser;
}
