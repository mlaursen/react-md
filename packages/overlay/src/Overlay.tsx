import React, {
  HTMLAttributes,
  FunctionComponent,
  useState,
  forwardRef,
  useRef,
  useCallback,
  useEffect,
} from "react";
import cn from "classnames";
import { Transition } from "react-transition-group";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { TransitionProps } from "@react-md/transition";
import { WithForwardedRef } from "@react-md/utils";

export interface OverlayProps
  extends TransitionProps,
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
  Pick<OverlayProps, "timeout" | "mountOnEnter" | "unmountOnExit">
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
    ...props
  } = providedProps as WithDefaultProps;

  const [active, setActive] = useState(visible);
  const triggers = useRef({ onEnter, onExit });
  useEffect(() => {
    triggers.current = { onEnter, onExit };
  });

  const frame = useRef<number | undefined>(undefined);
  const clear = () => {
    if (typeof frame.current === "number") {
      window.cancelAnimationFrame(frame.current);
    }
  };
  const stagger = (enabled: boolean) => {
    clear();
    frame.current = window.requestAnimationFrame(() => {
      frame.current = undefined;
      setActive(enabled);
    });
  };
  useEffect(() => clear, []);

  const activate = useCallback((node: HTMLElement, isEntering: boolean) => {
    if (triggers.current.onEnter) {
      triggers.current.onEnter(node, isEntering);
    }

    stagger(true);
  }, []);

  const deactivate = useCallback((node: HTMLElement) => {
    if (triggers.current.onExit) {
      triggers.current.onExit(node);
    }

    stagger(false);
  }, []);

  return (
    <ConditionalPortal
      visible={visible || active}
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <Transition
        in={visible}
        timeout={timeout}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        onEnter={activate}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={deactivate}
        onExiting={onExiting}
        onExited={onExited}
        appear={true}
      >
        <span
          {...props}
          ref={forwardedRef}
          className={cn(
            "rmd-overlay",
            {
              "rmd-overlay--active": active,
            },
            className
          )}
          onClick={onRequestClose}
        >
          {children}
        </span>
      </Transition>
    </ConditionalPortal>
  );
};

const defaultProps: DefaultProps = {
  timeout: 150,
  mountOnEnter: true,
  unmountOnExit: true,
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
