"use client";
import { forwardRef } from "react";
import type { BaseDialogProps } from "../dialog/Dialog";
import { Dialog } from "../dialog/Dialog";
import type {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "../transition/types";
import type { LabelRequiredForA11y } from "../types";
import type { BaseSheetClassNameOptions } from "./styles";
import { sheet } from "./styles";

declare module "react" {
  interface CSSProperties {
    "--rmd-sheet-height"?: string | number;
    "--rmd-sheet-width"?: string | number;
    "--rmd-sheet-max-height"?: string | number;
    "--rmd-sheet-touch-width"?: string | number;
    "--rmd-sheet-touch-max-height"?: string | number;
    "--rmd-sheet-static-width"?: string | number;
    "--rmd-sheet-transform-offscreen"?: string | number;
    "--rmd-sheet-z-index"?: number;
  }
}

export const DEFAULT_SHEET_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 200,
  exit: 150,
};

export const DEFAULT_SHEET_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  appear: "rmd-sheet--offscreen",
  appearActive: "rmd-sheet--enter rmd-sheet--visible",
  enter: "rmd-sheet--offscreen",
  enterActive: "rmd-sheet--enter rmd-sheet--visible",
  exit: "rmd-sheet--exit",
  exitActive: "rmd-sheet--offscreen",
  exitDone: "rmd-sheet--offscreen rmd-sheet--hidden",
};

export type SheetDialogProps = Omit<BaseDialogProps, "role" | "type" | "modal">;

export interface BaseSheetProps
  extends SheetDialogProps,
    BaseSheetClassNameOptions {
  /**
   * @defaultValue `"dialog"`
   */
  role?: "dialog" | "menu" | "none";

  /**
   * @defaultValue `true`
   * @see {@link SheetDialogProps.exitedHidden}
   * @remarks \@since 6.0.0
   */
  exitedHidden?: boolean;
}

export type SheetProps = LabelRequiredForA11y<BaseSheetProps>;

/**
 * **Client Component**
 *
 */
export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  function Sheet(props, ref) {
    const {
      role = "dialog",
      className,
      position = "left",
      horizontalSize = "media",
      verticalSize = "recommended",
      timeout = DEFAULT_SHEET_TIMEOUT,
      classNames = DEFAULT_SHEET_CLASSNAMES,
      visible,
      temporary = true,
      exitedHidden = true,
      children,
      ...remaining
    } = props;
    const { disableOverlay } = props;

    return (
      <Dialog
        {...remaining}
        ref={ref}
        role={role}
        type="custom"
        timeout={timeout}
        classNames={classNames}
        visible={visible}
        temporary={temporary}
        exitedHidden={exitedHidden}
        className={sheet({
          position,
          horizontalSize,
          verticalSize,
          disableOverlay,
          className,
        })}
      >
        {children}
      </Dialog>
    );
  }
);
