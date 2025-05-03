import { type API, type FileInfo, type Options } from "jscodeshift";

import removeBadgeContainer from "./remove-badge-container.js";
import updateBadge from "./update-badge.js";

const transformers = [updateBadge, removeBadgeContainer];

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
