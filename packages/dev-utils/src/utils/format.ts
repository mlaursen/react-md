import prettier, { Options, resolveConfig, BuiltInParserName } from "prettier";
import { join } from "path";
import { packagesRoot } from "../constants";

let prettierConfig: Options;
function getOptions(parser?: BuiltInParserName): Options {
  if (prettierConfig !== null) {
    prettierConfig = resolveConfig.sync(
      join(packagesRoot, "button", "src", "index.ts")
    );
  }

  if (!parser && prettierConfig.parser) {
    return prettierConfig;
  }

  return {
    ...prettierConfig,
    parser: parser || "babel",
  };
}

/**
 * Formats any code provided with prettier.
 *
 * @param code The code to format
 * @param filePath A filepath to use to resolve prettier config.
 * @param parser An optional parser to apply when the file being formatted
 * is not typescript or javascript.
 */
export default function format(
  code: string,
  parser?: BuiltInParserName
): string {
  return prettier.format(code, getOptions(parser));
}
