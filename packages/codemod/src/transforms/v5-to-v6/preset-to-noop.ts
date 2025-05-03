import { type API, type FileInfo, type Options } from "jscodeshift";

import { preset } from "./preset.js";

const noop = (file: FileInfo): string => file.source;

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  preset(noop).forEach((transform) => {
    file.source = transform(file, api, options);
  });

  return file.source;
}
