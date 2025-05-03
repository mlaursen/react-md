import { type API, type FileInfo, type Options } from "jscodeshift";

import toSymbol from "./material-icons/to-symbol.js";
import { preset } from "./preset.js";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  preset(toSymbol).forEach((transform) => {
    file.source = transform(file, api, options);
  });

  return file.source;
}
