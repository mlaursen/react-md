import React, { HTMLAttributes, FunctionComponent, forwardRef } from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { WithForwardedRef, Omit } from "@react-md/utils";

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
}

type WithRef = WithForwardedRef<HTMLSpanElement>;
type DefaultProps = Required<
  Pick<
    OverlayProps,
    "timeout" | "mountOnEnter" | "unmountOnExit" | "tabIndex" | "classNames"
  >
>;
type WithDefaultProps = OverlayProps & DefaultProps & WithRef;

/**
 * The `Overlay` component is a simple component used to render a full page overlay in the page with
 * an enter and exit animation. If there are overflow issues or you need to portal the overlay to a
 * different area within your app, you should use the `OverlayPortal` component instead.
 */
const Overlay: FunctionComponent<OverlayProps & WithRef> = providedProps => {
  const {
    className,
    visible,
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
        classNames={classNames}
        timeout={timeout}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExited}
        onExiting={onExiting}
        onExited={onExited}
      >
        <span
          {...props}
          ref={forwardedRef}
          className={cn("rmd-overlay", className)}
          onClick={onRequestClose}
        >
          {children}
        </span>
      </CSSTransition>
    </ConditionalPortal>
  );
};

const defaultProps: DefaultProps = {
  tabIndex: -1,
  timeout: 150,
  mountOnEnter: true,
  unmountOnExit: true,
  classNames: {
    appear: "",
    appearActive: "rmd-overlay--active",
    enter: "",
    enterActive: "rmd-overlay--active",
    enterDone: "rmd-overlay--active",
    exit: "",
    exitActive: "",
    exitDone: "",
  },
};

Overlay.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Overlay.displayName = "Overlay";

  let PropTypes: any = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Overlay.propTypes = {
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          leave: PropTypes.number,
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
      visible: PropTypes.bool.isRequired,
      onRequestClose: PropTypes.func.isRequired,
    };
  }
}

export default forwardRef<HTMLSpanElement, OverlayProps>((props, ref) => (
  <Overlay {...props} forwardedRef={ref} />
));
