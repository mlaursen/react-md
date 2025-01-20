"use client";

import { forwardRef } from "react";

import { type BaseDialogProps, Dialog } from "../dialog/Dialog.js";
import { type LabelRequiredForA11y } from "../types.js";
import {
  type BaseSheetClassNameOptions,
  DEFAULT_SHEET_CLASSNAMES,
  DEFAULT_SHEET_TIMEOUT,
  sheet,
} from "./styles.js";

/**
 * @since 6.0.0
 */
export type SheetDialogProps = Omit<BaseDialogProps, "role" | "type" | "modal">;

/**
 * @since 6.0.0 extends the `SheetDialogProps` instead of `AllowedDialogProps`
 * and exports the `SheetDialogProps`.
 */
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
   * @since 6.0.0
   */
  exitedHidden?: boolean;
}

export type SheetProps = LabelRequiredForA11y<BaseSheetProps>;

/**
 * **Client Component**
 *
 * The `Sheet` component is a {@link Dialog} that is fixed to the top, right,
 * bottom, or left of the viewport.
 *
 * @example Simple Example
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { Sheet } from "@react-md/core/sheet/Sheet";
 * import { useToggle } from "@react-md/core/useToggle";
 * import { type ReactElement } from "react";
 *
 * export function Example(): ReactElement {
 *   const { toggled, disable, enable } = useToggle();
 *
 *   return (
 *     <>
 *       <Button onClick={enable}>Show</Button>
 *       <Sheet aria-label="Customization" visible={toggled} onRequestClose={disable}>
 *         Whatever Content
 *       </Sheet>
 *     </>
 *   );
 * }
 * ```
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
