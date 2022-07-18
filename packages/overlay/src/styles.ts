import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const overlayStyles = bem("rmd-overlay");

/** @remarks \@since 6.0.0 */
export interface OverlayClassNameOptions {
  className?: string;

  visible: boolean;

  /**
   * @defaultValue `false`
   */
  clickable?: boolean;

  /**
   * @defaultValue `false`
   */
  absolute?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function overlay(options: OverlayClassNameOptions): string {
  const { visible, absolute = false, clickable = false, className } = options;

  return cnb(
    overlayStyles({
      visible,
      clickable,
      absolute,
    }),
    className
  );
}
