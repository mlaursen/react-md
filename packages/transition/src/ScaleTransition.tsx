import React, { ReactElement, ReactNode } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";

import {
  SCALE_CLASSNAMES,
  SCALE_TIMEOUT,
  SCALE_Y_CLASSNAMES,
} from "./constants";
import { OverridableCSSTransitionProps } from "./types";

export interface ScaleTransitionProps
  extends OverridableCSSTransitionProps,
    RenderConditionalPortalProps {
  /**
   * Boolean if the vertical scale animation should be used instead of the
   * normal scale animation.
   */
  vertical?: boolean;

  /**
   * Boolean if the animation should be triggered. Enabling this will trigger
   * the appear/enter animations while disabling it will trigger the exit
   * animation.
   */
  visible: boolean;

  /**
   * The children to render.
   */
  children?: ReactNode;
}

/**
 * This `ScaleTransition` component is used to trigger an animation that
 * switches between an opacity of `0` and `1` and using a `transform: scale(0)`
 * to `transform: scale(1)`. It is recommended to also manually apply a
 * `transform-origin` style or use the `useFixedPositioning` hook to generate
 * for you so that the animation starts from a specific point.
 *
 * Since the default scale animation is X and Y, you can enable the `vertical`
 * prop which will update the transition to use `transform: scaleY(0)` to
 * `transform: scaleY(1)` instead.
 */
export function ScaleTransition({
  visible,
  children,
  classNames: propClassNames,
  vertical = false,
  timeout = SCALE_TIMEOUT,
  portal = false,
  portalInto,
  portalIntoId,
  mountOnEnter = true,
  unmountOnExit = true,
  ...props
}: ScaleTransitionProps): ReactElement {
  let classNames = propClassNames;
  if (!classNames) {
    classNames = vertical ? SCALE_Y_CLASSNAMES : SCALE_CLASSNAMES;
  }

  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <CSSTransition
        {...props}
        in={visible}
        timeout={timeout}
        classNames={classNames}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
      >
        {children}
      </CSSTransition>
    </ConditionalPortal>
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ScaleTransition.propTypes = {
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      portalIntoId: PropTypes.string,
      mountOnEnter: PropTypes.bool,
      unmountOnExit: PropTypes.bool,
      visible: PropTypes.bool.isRequired,
      vertical: PropTypes.bool,
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
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
      children: PropTypes.node,
    };
  } catch (e) {}
}
