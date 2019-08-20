/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { bem, WithForwardedRef } from "@react-md/utils";

export interface OverlayProps
  extends Omit<CSSTransition.CSSTransitionProps, "children">,
    RenderConditionalPortalProps,
    HTMLAttributes<HTMLSpanElement> {
  /**
   * Boolean if the overlay is currently visible. When this prop changes, the overlay will
   * enter/exit with an opacity transition.
   */
  visible: boolean;

  /**
   * A function that should change the `visible` prop to `false`. This is used so that clicking
   * the overlay can hide the overlay.
   */
  onRequestClose: () => void;

  /**
   * Boolean if the overlay should still be "hidden" from the user while visible. This will just make it
   * so the opacity stays at 0. This is really just helpful if you'd like to create a simple close on
   * outside click feature since you can hook into the `onRequestClose` prop since the overlay will be clicked.
   */
  hidden?: boolean;

  /**
   * Boolean if the overlay should gain the pointer cursor while it's visible. You normally want this enabled
   * by default except when used as a modal's overlay.
   */
  clickable?: boolean;
}

type WithRef = WithForwardedRef<HTMLSpanElement>;
type DefaultProps = Required<
  Pick<
    OverlayProps,
    | "timeout"
    | "mountOnEnter"
    | "unmountOnExit"
    | "tabIndex"
    | "classNames"
    | "hidden"
    | "clickable"
  >
>;
type WithDefaultProps = OverlayProps & DefaultProps & WithRef;

const block = bem("rmd-overlay");

/**
 * The `Overlay` component is a simple component used to render a full page overlay in the page with
 * an enter and exit animation. If there are overflow issues or you need to portal the overlay to a
 * different area within your app, you should use the `OverlayPortal` component instead.
 */
const Overlay: FC<OverlayProps & WithRef> = providedProps => {
  const {
    className,
    visible,
    hidden,
    clickable,
    timeout,
    children,
    mountOnEnter,
    unmountOnExit,
    onRequestClose,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    portal,
    portalInto,
    portalIntoId,
    forwardedRef,
    classNames,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <CSSTransition
        appear
        in={visible}
        classNames={hidden ? "" : classNames}
        timeout={hidden ? 0 : timeout}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        {state => (
          <span
            {...props}
            ref={forwardedRef}
            className={cn(
              block({
                // have to manually set the active state here since react-transition-group doesn't
                // clone in the transition `classNames` and if the overlay re-renders while the
                // animation has finished, the active className will disappear
                active: !hidden && state === "entered",
                visible,
                clickable,
              }),
              className
            )}
            onClick={onRequestClose}
          >
            {children}
          </span>
        )}
      </CSSTransition>
    </ConditionalPortal>
  );
};

const defaultProps: DefaultProps = {
  tabIndex: -1,
  timeout: 150,
  hidden: false,
  clickable: true,
  mountOnEnter: true,
  unmountOnExit: true,
  classNames: {
    appearActive: "rmd-overlay--active",
    enterActive: "rmd-overlay--active",
    enterDone: "rmd-overlay--active",
  },
};

Overlay.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Overlay.displayName = "Overlay";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Overlay.propTypes = {
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
      mountOnEnter: PropTypes.bool,
      unmountOnExit: PropTypes.bool,
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      portalIntoId: PropTypes.string,
      tabIndex: PropTypes.number,
      visible: PropTypes.bool.isRequired,
      onRequestClose: PropTypes.func.isRequired,
      hidden: PropTypes.bool,
      clickable: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLSpanElement, OverlayProps>((props, ref) => (
  <Overlay {...props} forwardedRef={ref} />
));
