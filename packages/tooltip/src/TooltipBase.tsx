import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionClassNames, TransitionTimeout } from "@react-md/transition";

import { IBaseTooltipProps, TooltipPosition } from "./types.d";

/**
 * All the props that can be applied to the `TooltipBase` component.
 */
export interface ITooltipBaseProps extends IBaseTooltipProps {
  /**
   * This is the position that the tooltip should appear related to its container elemement as well as
   * updating the animation direction.
   */
  position?: TooltipPosition;

  /**
   * Boolean if the tooltip is visible. This value changing will trigger the different animations.
   */
  visible: boolean;

  /**
   * @private
   */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

/**
 * An interface containing all the props that have a default value.
 */
export interface ITooltipBaseDefaultProps {
  dense: boolean;
  position: TooltipPosition;
  lineWrap: boolean;
  classNames: CSSTransitionClassNames;
  duration: TransitionTimeout;
  lazyMount: boolean;
}

export type TooltipBaseWithDefaultProps = ITooltipBaseProps & ITooltipBaseDefaultProps;

/**
 * This is the base tooltip component that can only be used to render a tooltip with an animation when the
 * visibility changes. If this component is used, you will need to manually add all the event listeners
 * and triggers to change the `visible` prop.
 *
 * @forwardRef
 */
class TooltipBase extends React.Component<ITooltipBaseProps> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    dense: PropTypes.bool,
    lineWrap: PropTypes.bool,
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
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number,
      }),
    ]),
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    lazyMount: PropTypes.bool,
    position: PropTypes.oneOf(["above", "below", "left", "right"]),
    visible: PropTypes.bool.isRequired,
  };

  public static defaultProps: ITooltipBaseDefaultProps = {
    dense: false,
    position: "below",
    lineWrap: false,
    classNames: {
      enter: "rmd-tooltip--enter",
      enterActive: "rmd-tooltip--visible",
      enterDone: "rmd-tooltip--visible",
      exit: "rmd-tooltip--visible rmd-tooltip--exit",
      exitActive: "rmd-tooltip--exit-active",
    },
    duration: {
      enter: 200,
      exit: 150,
    },
    lazyMount: true,
  };

  public render() {
    const {
      className,
      classNames,
      visible,
      duration,
      lazyMount,
      dense,
      lineWrap,
      position,
      children,
      forwardedRef,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props
    } = this.props as TooltipBaseWithDefaultProps;

    return (
      <CSSTransition
        classNames={classNames}
        in={visible}
        timeout={duration}
        appear={lazyMount}
        mountOnEnter={lazyMount}
        unmountOnExit={lazyMount}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        <span
          {...props}
          ref={forwardedRef}
          role="tooltip"
          className={cn(
            "rmd-tooltip",
            {
              "rmd-tooltip--dense": dense,
              "rmd-tooltip--line-wrap": lineWrap,
              "rmd-tooltip--dense-line-wrap": dense && lineWrap,
            },
            `rmd-tooltip--${position}`,
            className
          )}
        >
          {children}
        </span>
      </CSSTransition>
    );
  }
}

export default React.forwardRef<HTMLSpanElement, ITooltipBaseProps>((props, ref) => (
  <TooltipBase {...props} />
));
