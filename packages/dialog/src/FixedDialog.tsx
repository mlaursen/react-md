import { forwardRef, RefObject } from "react";
import cn from "classnames";
import {
  CSSTransitionClassNames,
  useFixedPositioning,
} from "@react-md/transition";
import {
  CalculateFixedPositionOptions,
  LabelRequiredForA11y,
  TOP_INNER_RIGHT_ANCHOR,
} from "@react-md/utils";

import { BaseDialogProps, Dialog } from "./Dialog";

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

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    FixedDialog.propTypes = {
      fixedTo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      options: PropTypes.shape({
        vwMargin: PropTypes.number,
        vhMargin: PropTypes.number,
        xMargin: PropTypes.number,
        yMargin: PropTypes.number,
        disableSwapping: PropTypes.bool,
        transformOrigin: PropTypes.bool,
      }),
      getOptions: PropTypes.func,
      onRequestClose: PropTypes.func.isRequired,
      overlayHidden: PropTypes.bool,
      classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      disableScrollLock: PropTypes.bool,
      anchor: PropTypes.shape({
        x: PropTypes.oneOf([
          "inner-left",
          "inner-right",
          "center",
          "left",
          "right",
        ]),
        y: PropTypes.oneOf(["above", "below", "center", "top", "bottom"]),
      }),
      children: PropTypes.node,
      className: PropTypes.string,
    };
  } catch (e) {}
}
