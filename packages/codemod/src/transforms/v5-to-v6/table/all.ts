import { type API, type FileInfo, type Options } from "jscodeshift";

import captionToTypography from "./caption-to-typography.js";
import updateTableCellProps from "./update-table-cell-props.js";
import updateTableCheckboxProps from "./update-table-checkbox-props.js";

const transformers = [
  captionToTypography,
  updateTableCellProps,
  updateTableCheckboxProps,
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
