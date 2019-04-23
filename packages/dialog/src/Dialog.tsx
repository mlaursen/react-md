import React, {
  FunctionComponent,
  CSSProperties,
  HTMLAttributes,
  Fragment,
  ReactNode,
} from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import { Overlay } from "@react-md/overlay";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
  useStaggeredVisibility,
} from "@react-md/portal";
import { CSSTransitionProps } from "@react-md/transition";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface DialogProps
  extends CSSTransitionProps,
    RenderConditionalPortalProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * An id required for a11y for the dialog.
   */
  id: string;

  /**
   * Boolean if the dialog is currently visible.
   */
  visible: boolean;

  /**
   * A function used to close the dialog when the overlay is clicked or the escape key
   * is pressed when the `modal` prop is not enabled.
   */
  onRequestClose: () => void;

  /**
   * The tab index for the sheet. This should normally stay at `-1`.
   */
  tabIndex?: number;

  /**
   * Boolean if there should be an overlay displayed with the sheet. This is recommended/required
   * on mobile devices.
   */
  overlay?: boolean;

  /**
   * An optional style to apply to the overlay.
   */
  overlayStyle?: CSSProperties;

  /**
   * An optional className to apply to the overlay.
   */
  overlayClassName?: string;

  modal?: boolean;

  position?: "full-page" | "center" | "none";
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    DialogProps,
    | "tabIndex"
    | "modal"
    | "position"
    | "classNames"
    | "timeout"
    | "mountOnEnter"
    | "unmountOnExit"
  >
>;
type WithDefaultProps = DialogProps & DefaultProps & WithRef;

const block = bem("rmd-dialog");

const Dialog: FunctionComponent<DialogProps & WithRef> = providedProps => {
  const {
    children,
    forwardedRef,
    className,
    classNames,
    timeout,
    visible,
    onRequestClose,
    overlay: propOverlay,
    overlayStyle,
    overlayClassName,
    portal,
    portalInto,
    portalIntoId,
    mountOnEnter,
    unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited: propOnExited,
    modal,
    position,
    ...props
  } = providedProps as WithDefaultProps;
  const isFullPage = position === "full-page";
  const isCentered = position === "center";
  const overlay = typeof propOverlay === "boolean" || !isFullPage;
  const { portalVisible, onExited } = useStaggeredVisibility({
    onExited: propOnExited,
    visible,
  });

  let overlayEl: ReactNode = null;
  if (overlay) {
    overlayEl = (
      <Overlay
        id={`${props.id}-overlay`}
        style={overlayStyle}
        className={overlayClassName}
        visible={visible}
        onRequestClose={onRequestClose}
      />
    );
  }

  return (
    <ConditionalPortal
      visible={portalVisible}
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <Fragment>
        {overlayEl}
        <CSSTransition
          appear={mountOnEnter}
          in={visible}
          classNames={classNames}
          timeout={timeout}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
        >
          <div
            {...props}
            role="dialog"
            ref={forwardedRef}
            className={cn(
              block({ centered: isCentered, "full-page": isFullPage }),
              className
            )}
          >
            {children}
          </div>
        </CSSTransition>
      </Fragment>
    </ConditionalPortal>
  );
};

const defaultProps: DefaultProps = {
  position: "center",
  tabIndex: -1,
  modal: false,
  mountOnEnter: true,
  unmountOnExit: true,
  timeout: {
    enter: 200,
    exit: 150,
  },
  classNames: {
    appear: "rmd-dialog--enter",
    appearActive: "rmd-dialog--enter-active",
    enter: "rmd-dialog--enter",
    enterActive: "rmd-dialog--enter-active",
    exit: "rmd-dialog--exit",
    exitActive: "rmd-dialog--exit-active",
  },
};

Dialog.defaultProps = defaultProps;

export default Dialog;
