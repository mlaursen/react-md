import { cnb } from "cnbuilder";
import { type ButtonClassNameOptions, button } from "../button/buttonStyles.js";

/** @since 6.0.0 */
export type FileInputClassNameOptions = ButtonClassNameOptions;

/** @since 6.0.0 */
export function fileInput(options: FileInputClassNameOptions = {}): string {
  return cnb("rmd-file-input", button(options));
}
