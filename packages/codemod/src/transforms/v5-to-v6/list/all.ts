import { type API, type FileInfo, type Options } from "jscodeshift";

import updateListItemProps from "./update-list-item-props.js";

const transformers = [updateListItemProps];

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
