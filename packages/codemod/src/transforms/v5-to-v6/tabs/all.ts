import { type API, type FileInfo, type Options } from "jscodeshift";

import updateTabsApi from "./update-tabs-api.js";

const transformers = [updateTabsApi];

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
