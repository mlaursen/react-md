import { type API, type FileInfo, type Options } from "jscodeshift";

import removeUnusedProps from "./remove-unused-props.js";
import removeButtonThemeClassNames from "./rename-button-theme-class-names.js";
import renameFab from "./rename-fab.js";
import renameUnstyledButton from "./rename-unstyled-button.js";

const transformers = [
  removeUnusedProps,
  removeButtonThemeClassNames,
  renameFab,
  renameUnstyledButton,
];

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
