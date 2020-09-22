import log from "loglevel";
import prettier, { BuiltInParserName } from "prettier";

function getParser(
  code: string,
  parser: BuiltInParserName | undefined,
  filePath: string | undefined
): BuiltInParserName | undefined {
  if (typeof parser === "string") {
    return parser;
  }

  if (typeof filePath === "string") {
    return undefined;
  }

  if (code.startsWith("{") || code.startsWith("[")) {
    return "json";
  }

  if (/^(@import|\.[a-z])/m.test(code) || /^\s+@(mixin|include)/.test(code)) {
    return "scss";
  }

  return "typescript";
}

export function format(
  code: string,
  parser?: BuiltInParserName,
  filepath?: string
): string {
  const resolvedParser = getParser(code, parser, filepath);
  try {
    return prettier.format(code, {
      filepath,
      parser: resolvedParser,
      proseWrap: resolvedParser === "markdown" ? "always" : undefined,
      singleQuote: resolvedParser === "scss" || resolvedParser === "babel",
    });
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
}
