import { type API, type FileInfo, type Options } from "jscodeshift";

import hardcodeScssVariables from "./hardcode-scss-variables.js";
import toReactMdImports from "./to-react-md-imports.js";

const transformers = [toReactMdImports, hardcodeScssVariables];

export default function all(
  file: FileInfo,
  api: API,
  options: Options
): string {
  transformers.forEach((transform) => {
    file.source = transform(file, api, options);
  });

  return file.source;
}
