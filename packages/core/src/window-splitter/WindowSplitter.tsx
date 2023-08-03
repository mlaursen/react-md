import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { LabelRequiredForA11y } from "../types";
import { bem } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useWindowSplitter } from "./useWindowSplitter";

const styles = bem("rmd-window-splitter");

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterClassNameOptions {
  className?: string;
  dragging?: boolean;
  reversed?: boolean;
  vertical?: boolean;
  disableFixed?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function windowSplitter(
  options: WindowSplitterClassNameOptions = {}
): string {
  const {
    vertical = false,
    dragging,
    reversed,
    disableFixed,
    className,
  } = options;

  return cnb(
    styles({
      h: !vertical,
      hr: !vertical && reversed,
      v: vertical,
      vr: vertical && reversed,
      a: disableFixed,
      dragging,
    }),
    className
  );
}

/**
 * @remarks \@since 6.0.0
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/}
 */
export interface BaseWindowSplitterProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  /**
   * This will be provided by the {@link useWindowSplitter} hook.
   */
  "aria-controls": string;

  /**
   * This will be provided by the {@link useWindowSplitter} hook.
   */
  dragging: boolean;

  /**
   * This will be provided by the {@link useWindowSplitter} hook.
   */
  reversed: boolean;

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
 * **Server Component**
 * Most likely a client component since it relies on `useWindowSplitter`
 *
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
    reversed,
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
        reversed,
        dragging,
        vertical,
        disableFixed,
      })}
    />
  );
});
