import { type API, type FileInfo, type Options } from "jscodeshift";

import updateMediaComponents from "./update-media-components.js";

const transformers = [updateMediaComponents];

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
