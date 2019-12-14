import prettier from "prettier";
import { join } from "path";
import { packagesRoot } from "../constants";

const prettierConfig = prettier.resolveConfig.sync(
  join(packagesRoot, "button", "src", "index.ts")
);

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
  parser?: prettier.BuiltInParserName
): string {
  return prettier.format(code, {
    ...prettierConfig,
    parser: parser || prettierConfig?.parser || "babel",
  });
}
