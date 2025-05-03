import { type API, type FileInfo, type Options } from "jscodeshift";

import replaceMenuItemLink from "./replace-menu-item-link.js";
import updateUseContextMenuApi from "./update-use-context-menu-api.js";

const transformers = [replaceMenuItemLink, updateUseContextMenuApi];

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
