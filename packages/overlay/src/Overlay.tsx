import * as React from "react";
import cn from "classnames";
import { Transition } from "react-transition-group";
import {
  ConditionalPortal,
  IRenderConditionalPortalProps,
} from "@react-md/portal";
import { ITransitionProps, TransitionTimeout } from "@react-md/transition";

export interface IOverlayProps
  extends ITransitionProps,
    IRenderConditionalPortalProps,
    React.HTMLAttributes<HTMLSpanElement> {
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

export interface IOverlayDefaultProps {
  timeout: TransitionTimeout;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
}

export type OverlayWithDefaultProps = IOverlayProps & IOverlayDefaultProps;

export interface IOverlayState {
  active: boolean;
}

/**
 * The `Overlay` component is a simple component used to render a full page overlay in the page with
 * an enter and exit animation. If there are overflow issues or you need to portal the overlay to a
 * different area within your app, you should use the `OverlayPortal` component instead.
 */
export default class Overlay extends React.Component<
  IOverlayProps,
  IOverlayState
> {
  public static defaultProps: IOverlayDefaultProps = {
    timeout: 150,
    mountOnEnter: true,
    unmountOnExit: true,
  };

  private frame?: number;
  constructor(props: IOverlayProps) {
    super(props);

    this.state = { active: props.visible };
  }

  public componentWillUnmount() {
    this.clear();
  }

  public render() {
    const { active } = this.state;
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
      ...props
    } = this.props as OverlayWithDefaultProps;

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
          onEnter={this.activate}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={this.deactivate}
          onExiting={onExiting}
          onExited={onExited}
          appear={true}
        >
          <span
            className={cn(
              "rmd-overlay",
              {
                "rmd-overlay--active": active,
              },
              className
            )}
            {...props}
            onClick={onRequestClose}
          >
            {children}
          </span>
        </Transition>
      </ConditionalPortal>
    );
  }

  private clear = () => {
    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
  };

  private activate = (node: HTMLElement, isEntering: boolean) => {
    if (this.props.onEnter) {
      this.props.onEnter(node, isEntering);
    }

    this.clear();
    this.frame = window.requestAnimationFrame(() => {
      this.frame = undefined;
      this.setState({ active: true });
    });
  };

  private deactivate = (node: HTMLElement) => {
    if (this.props.onExit) {
      this.props.onExit(node);
    }

    this.clear();
    this.frame = window.requestAnimationFrame(() => {
      this.frame = undefined;
      this.setState({ active: false });
    });
  };
}
