import { type API, type FileInfo, type Options } from "jscodeshift";

import updateScaleTransition from "./update-scale-transition.js";

const transformers = [updateScaleTransition];

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
