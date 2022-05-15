import type { RefObject } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type { CSSTransitionClassNames } from "@react-md/transition";
import { useFixedPositioning } from "@react-md/transition";
import type {
  CalculateFixedPositionOptions,
  LabelRequiredForA11y,
} from "@react-md/utils";
import { TOP_INNER_RIGHT_ANCHOR } from "@react-md/utils";

import type { BaseDialogProps } from "./Dialog";
import { Dialog } from "./Dialog";

export interface BaseFixedDialogProps
  extends Omit<BaseDialogProps, "type">,
    Pick<CalculateFixedPositionOptions, "anchor"> {
  /**
   * The element the dialog should be fixed to. This can either be:
   * - a query selector string to get an element
   * - an HTMLElement (normally a ref.current)
   * - a function that returns an HTMLElement or null
   * - null
   */
  fixedTo: RefObject<HTMLElement>;

  /**
   * Any additional options to apply to the fixed positioning logic. The
   * `transformOrigin` option will be enabled by default.
   */
  options?: CalculateFixedPositionOptions;

  /**
   * An optional function to call to get the fixed positioning options.
   */
  getOptions?(): CalculateFixedPositionOptions;
}

export type FixedDialogProps = LabelRequiredForA11y<BaseFixedDialogProps>;

const DEFAULT_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-dialog--fixed-enter",
  appearActive: "rmd-dialog--fixed-enter-active",
  enter: "rmd-dialog--fixed-enter",
  enterActive: "rmd-dialog--fixed-enter-active",
  exit: "rmd-dialog--fixed-exit",
  exitActive: "rmd-dialog--fixed-exit-active",
};

/**
 * The `FixedDialog` is a wrapper for the `Dialog` component that can be used to
 * be fix itself to another element. Another term for this component might be a
 * "Pop out Dialog".
 */
export const FixedDialog = forwardRef<HTMLDivElement, FixedDialogProps>(
  function FixedDialog(
    {
      fixedTo,
      style: propStyle,
      anchor = TOP_INNER_RIGHT_ANCHOR,
      options,
      getOptions,
      children,
      className,
      classNames = DEFAULT_CLASSNAMES,
      overlayHidden = true,
      disableScrollLock = true,
      onEnter,
      onEntering,
      onEntered,
      onExited,
      ...props
    },
    nodeRef
  ) {
    const { onRequestClose } = props;

    const { ref, style, callbacks } = useFixedPositioning({
      nodeRef,
      style: propStyle,
      transformOrigin: true,
      onEnter,
      onEntering,
      onEntered,
      onExited,
      anchor,
      fixedTo,
      onScroll: /* istanbul ignore next */ (_event, { visible }) => {
        if (!visible) {
          onRequestClose();
        }
      },
      ...options,
      getFixedPositionOptions: getOptions,
    });

    return (
      <Dialog
        {...props}
        {...callbacks}
        ref={ref}
        type="custom"
        style={style}
        className={cn("rmd-dialog--fixed", className)}
        classNames={classNames}
        overlayHidden={overlayHidden}
        disableScrollLock={disableScrollLock}
      >
        {children}
      </Dialog>
    );
  }
);
