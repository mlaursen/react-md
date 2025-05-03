import { type API, type FileInfo, type Options } from "jscodeshift";

import verticalDividerToDivider from "./vertical-divider-to-divider.js";

const transformers = [verticalDividerToDivider];

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
