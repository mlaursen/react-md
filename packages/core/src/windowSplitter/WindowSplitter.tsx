import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { LabelRequiredForA11y } from "../types";
import { bem } from "../utils";

const styles = bem("rmd-window-splitter");

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterClassNameOptions {
  className?: string;
  dragging?: boolean;
  vertical?: boolean;
  disableFixed?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function windowSplitter(
  options: WindowSplitterClassNameOptions = {}
): string {
  const { vertical = false, dragging, disableFixed, className } = options;

  return cnb(
    styles({ h: !vertical, v: vertical, dragging, a: disableFixed }),
    className
  );
}

/**
 * @remarks \@since 6.0.0
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/}
 */
export interface BaseWindowSplitterProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  "aria-controls": string;
  dragging: boolean;

  /**
   * Set this to `true` if the window splitter should use `position: absolute`
   * instead of `position: fixed`.
   *
   * @defaultValue `false`
   */
  disableFixed?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export type WindowSplitterProps = LabelRequiredForA11y<BaseWindowSplitterProps>;

/**
 * @see {@link useWindowSplitter} for an example usage
 * @remarks \@since 6.0.0
 */
export const WindowSplitter = forwardRef<
  HTMLButtonElement,
  WindowSplitterProps
>(function WindowSplitter(props, ref) {
  const {
    role = "separator",
    className,
    dragging,
    disableFixed = false,
    ...remaining
  } = props;
  const vertical = props["aria-orientation"] === "vertical";

  return (
    <button
      {...remaining}
      ref={ref}
      type="button"
      role={role}
      className={windowSplitter({
        className,
        dragging,
        vertical,
        disableFixed,
      })}
    />
  );
});
