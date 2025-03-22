"use client";

import { type RefObject, forwardRef, useRef } from "react";

import { TOP_INNER_RIGHT_ANCHOR } from "../positioning/constants.js";
import {
  type CalculateFixedPositionOptions,
  type PositionAnchor,
} from "../positioning/types.js";
import { useFixedPositioning } from "../positioning/useFixedPositioning.js";
import { DEFAULT_SCALE_CLASSNAMES } from "../transition/useScaleTransition.js";
import { type LabelRequiredForA11y } from "../types.js";
import { type BaseDialogProps, Dialog } from "./Dialog.js";

export interface BaseFixedDialogProps extends Omit<BaseDialogProps, "type"> {
  anchor?: PositionAnchor;
  fixedTo: RefObject<HTMLElement>;
  options?: CalculateFixedPositionOptions;
  getFixedPositionOptions?: () => CalculateFixedPositionOptions;

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

/**
 * **Client Component**
 *
 * @example Simple Example
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { Dialog } from "@react-md/core/dialog/Dialog";
 * import { DialogContent } from "@react-md/core/dialog/DialogContent";
 * import { DialogFooter } from "@react-md/core/dialog/DialogFooter";
 * import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
 * import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
 * import { FixedDialog } from "@react-md/core/dialog/FixedDialog";
 * import { Typography } from "@react-md/core/typography/Typography";
 * import { useToggle } from "@react-md/core/useToggle";
 * import { useId, useRef, type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const {
 *     toggle,
 *     disable: onRequestClose,
 *     toggled: visible,
 *   } = useToggle(false);
 *   const titleId = useId();
 *   const fixedTo = useRef<HTMLButtonElement>(null)
 *
 *   return (
 *     <>
 *       <Button ref={fixedTo} onClick={toggle}>Toggle</Button>
 *       <FixedDialog
 *         aria-labelledby={titleId}
 *         fixedTo={fixedTo}
 *         visible={visible}
 *         onRequestClose={onRequestClose}
 *       >
 *         <DialogHeader>
 *           <DialogTitle id={titleId}>Simple Dialog</DialogTitle>
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
      classNames = DEFAULT_SCALE_CLASSNAMES,
      children,
      anchor = TOP_INNER_RIGHT_ANCHOR,
      options,
      getFixedPositionOptions,
      onEnter = noop,
      onEntering,
      onEntered = noop,
      onExited,
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
      onEnter(appearing) {
        onEnter(appearing);
        disableExitFocus.current = false;
      },
      onEntering,
      onEntered(appearing) {
        onEntered(appearing);
        disableExitFocus.current = false;
      },
      onExited,
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
