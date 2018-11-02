import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionClassNames, TransitionTimeout } from "@react-md/transition";

import { IBaseTooltipProps, TooltipPosition } from "./types.d";

export interface ITooltipBaseProps extends IBaseTooltipProps {
  /**
   * The position of the tooltip to use.
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

export interface ITooltipBaseDefaultProps {
  dense: boolean;
  position: TooltipPosition;
  lineWrap: boolean;
  classNames: CSSTransitionClassNames;
  duration: TransitionTimeout;
  lazyMount: boolean;
}

export type TooltipBaseWithDefaultProps = ITooltipBaseProps & ITooltipBaseDefaultProps;

class TooltipBase extends React.Component<ITooltipBaseProps> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    dense: PropTypes.bool,
    position: PropTypes.oneOf(["above", "below", "left", "right"]),
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
