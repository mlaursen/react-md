import { type API, type FileInfo, type Options } from "jscodeshift";

import toSvg from "./material-icons/to-svg.js";
import { preset } from "./preset.js";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  preset(toSvg).forEach((transform) => {
    file.source = transform(file, api, options);
  });

  return file.source;
}
