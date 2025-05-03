import { type API, type FileInfo, type Options } from "jscodeshift";

import toFont from "./material-icons/to-font.js";
import { preset } from "./preset.js";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  preset(toFont).forEach((transform) => {
    file.source = transform(file, api, options);
  });

  return file.source;
}
