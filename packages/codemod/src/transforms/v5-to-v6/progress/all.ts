import { type API, type FileInfo, type Options } from "jscodeshift";

import updateCircularProgressProps from "./update-circular-progress-props.js";

const transformers = [updateCircularProgressProps];

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
