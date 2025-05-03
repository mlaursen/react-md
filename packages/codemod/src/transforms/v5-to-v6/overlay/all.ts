import { type API, type FileInfo, type Options } from "jscodeshift";

import updateOverlayProps from "./update-overlay-props.js";

const transformers = [updateOverlayProps];

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
