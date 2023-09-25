import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-switch-track-background-color"?: string;
    "--rmd-switch-ball-background-color"?: string;
  }
}

const styles = bem("rmd-switch");

/**
 * @remarks \@since 6.0.0
 */
export interface SwitchClassNameOptions {
  className?: string;

  clickable?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function switchStyles(options: SwitchClassNameOptions = {}): string {
  const { className, clickable } = options;

  return cnb(styles({ clickable }), className);
}
