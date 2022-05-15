import type { ReactElement } from "react";
import cn from "classnames";
import type {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";
import { useCSSTransition } from "@react-md/transition";

import { useStatesConfigContext } from "../StatesConfig";
import type { RippleState } from "./types";

export interface RippleProps {
  className?: string;
  classNames?: CSSTransitionClassNames;
  timeout?: TransitionTimeout;
  entered: (ripple: RippleState) => void;
  exited: (ripple: RippleState) => void;
  ripple: RippleState;
}

export function Ripple({
  className,
  classNames: propClassNames,
  timeout: propTimeout,
  ripple,
  entered,
  exited,
}: RippleProps): ReactElement | null {
  const { exiting, style } = ripple;

  let timeout = propTimeout;
  let classNames = propClassNames;
  const context = useStatesConfigContext();
  if (typeof timeout === "undefined" || typeof classNames === "undefined") {
    if (typeof timeout === "undefined") {
      timeout = context.rippleTimeout;
    }

    if (typeof classNames === "undefined") {
      classNames = context.rippleClassNames;
    }
  }

  const { elementProps, rendered } = useCSSTransition({
    appear: true,
    transitionIn: !exiting,
    timeout,
    className: cn("rmd-ripple", className),
    classNames,
    onEntered() {
      entered(ripple);
    },
    onExited() {
      exited(ripple);
    },
  });

  if (!rendered) {
    return null;
  }

  return <span {...elementProps} style={style} />;
}
