import type {
  CalculateFixedPositionOptions,
  CSSTransitionClassNamesObject,
  LabelRequiredForA11y,
  PositionAnchor,
} from "@react-md/core";
import {
  SCALE_CLASSNAMES,
  TOP_INNER_RIGHT_ANCHOR,
  useFixedPositioning,
} from "@react-md/core";
import type { RefObject } from "react";
import { forwardRef, useRef } from "react";
import type { BaseDialogProps } from "./Dialog";
import { Dialog } from "./Dialog";

export interface BaseFixedDialogProps extends Omit<BaseDialogProps, "type"> {
  anchor?: PositionAnchor;
  fixedTo: RefObject<HTMLElement>;
  options?: CalculateFixedPositionOptions;
  getFixedPositionOptions?(): CalculateFixedPositionOptions;

  /**
   * @defaultValue `true`
   */
  overlayHidden?: boolean;

  /**
   * @defaultValue `true`
   */
  disableScrollLock?: boolean;
}

export type FixedDialogProps = LabelRequiredForA11y<BaseFixedDialogProps>;

const noop = (): void => {
  // do nothing
};
export const DEFAULT_FIXED_DIALOG_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> =
  {
    appear: "rmd-dialog--fixed-enter",
    appearActive: "rmd-dialog--fixed-enter-active",
    enter: "rmd-dialog--fixed-enter",
    enterActive: "rmd-dialog--fixed-enter-active",
    exit: "rmd-dialog--fixed-exit",
    exitActive: "rmd-dialog--fixed-exit-active",
  };

/**
 * @example
 * Simple Example
 * ```tsx
 * import { Button } from "@react-md/button";
 * import { Typography, useToggle } from "@react-md/core";
 * import {
 *   DialogHeader,
 *   DialogTitle,
 *   DialogContent,
 *   DialogFooter,
 *   FixedDialog,
 * } from "@react-md/dialog";
 * import { useRef } from "react";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const {
 *     toggle,
 *     disable: onRequestClose,
 *     toggled: visible,
 *   } = useToggle(false);
 *   const fixedTo = useRef<HTMLButtonElement>(null)
 *
 *   return (
 *     <>
 *       <Button ref={fixedTo} onClick={toggle}>Toggle</Button>
 *       <FixedDialog
 *         aria-labelledby="dialog-title"
 *         visible={visible}
 *         onRequestClose={onRequestClose}
 *       >
 *         <DialogHeader>
 *           <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
 *         </DialogHeader>
 *         <DialogContent>
 *           <Typography margin="none">This is some text in a dialog.</Typography>
 *         </DialogContent>
 *         <DialogFooter>
 *           <Button onClick={onRequestClose}>
 *             Close
 *           </Button>
 *         </DialogFooter>
 *       </FixedDialog>
 *     </>
 *   );
 * }
 * ```
 */
export const FixedDialog = forwardRef<HTMLDivElement, FixedDialogProps>(
  function FixedDialog(props, nodeRef) {
    const {
      fixedTo,
      style: propStyle,
      classNames = SCALE_CLASSNAMES,
      children,
      anchor = TOP_INNER_RIGHT_ANCHOR,
      options,
      getFixedPositionOptions,
      onEnter,
      onEntering,
      onEntered,
      onExited = noop,
      onRequestClose,
      overlayHidden = true,
      disableScrollLock = true,
      isFocusTypeDisabled = noop,
      ...remaining
    } = props;

    const disableExitFocus = useRef(false);
    const { ref, style, callbacks } = useFixedPositioning({
      nodeRef,
      style: propStyle,
      transformOrigin: true,
      onEnter,
      onEntering,
      onEntered,
      onExited() {
        onExited();
        disableExitFocus.current = false;
      },
      anchor,
      fixedTo,
      onScroll(_event, data) {
        if (!data.visible) {
          disableExitFocus.current = true;
          onRequestClose();
        }
      },
      ...options,
      getFixedPositionOptions,
    });

    return (
      <Dialog
        {...remaining}
        {...callbacks}
        ref={ref}
        type="custom"
        fixed
        style={style}
        classNames={classNames}
        onRequestClose={onRequestClose}
        overlayHidden={overlayHidden}
        disableScrollLock={disableScrollLock}
        isFocusTypeDisabled={(type) =>
          isFocusTypeDisabled(type) ||
          (type === "unmount" && disableExitFocus.current)
        }
      >
        {children}
      </Dialog>
    );
  }
);
