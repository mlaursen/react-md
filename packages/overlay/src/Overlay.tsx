import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { Transition } from "react-transition-group";

export interface IOverlayProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Boolean if the overlay is currently visible. When this prop changes, the overlay will enter/exit
   * with an opacity transition.
   *
   * @docgen
   */
  visible: boolean;

  /**
   * A function that should change the `visible` prop to `false`. This is used so that clicking the overlay
   * can hide the overlay.
   *
   * @docgen
   */
  onRequestClose: () => void;

  /**
   * The transition duration for the overlay. This should not be changed unless you manually change the
   * `$rmd-overlay-transition-duration` scss variable.
   *
   * @docgen
   */
  timeout?: number | { enter?: number; exit?: number };

  /**
   * Pass-down prop to the `Transition` component from react-transition-group. By default, the overlay will
   * not be rendered in the DOM until the `visible` prop is `true` but this can be changed by setting this
   * prop to `false`.
   *
   * @docgen
   */
  mountOnEnter?: boolean;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group. By default, the overlay will
   * be removed from the DOM when the `visible` prop is `false` but this can be changed by setting this
   * prop to `false`.
   *
   * @docgen
   */
  unmountOnExit?: boolean;
}

export interface IOverlayDefaultProps {
  timeout: number | { enter?: number; leave?: number };
  mountOnEnter: boolean;
  unmountOnExit: boolean;
}

export type OverlayWithDefaultProps = IOverlayProps & IOverlayDefaultProps;

export interface IOverlayState {
  active: boolean;
}

export default class Overlay extends React.Component<IOverlayProps, IOverlayState> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    timeout: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number,
      }),
    ]),
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
  };

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
    const { className, visible, timeout, children, mountOnEnter, unmountOnExit, onRequestClose, ...props } = this
      .props as OverlayWithDefaultProps;

    return (
      <Transition
        in={visible}
        timeout={timeout}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        onEnter={this.activate}
        onExit={this.deactivate}
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
    );
  }

  private clear = () => {
    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
  };

  private activate = () => {
    this.clear();
    this.frame = window.requestAnimationFrame(() => {
      this.frame = undefined;
      this.setState({ active: true });
    });
  };

  private deactivate = () => {
    this.clear();
    this.frame = window.requestAnimationFrame(() => {
      this.frame = undefined;
      this.setState({ active: false });
    });
  };
}
