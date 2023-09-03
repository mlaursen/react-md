import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { Ripple } from "./Ripple.js";
import type { ProvidedRippleContainerProps } from "./types.js";

/** @internal */
export interface RippleContainerProps extends ProvidedRippleContainerProps {
  className?: string;
}

/**
 * **Server Component**
 *
 * This component should generally only be used internally within `react-md`
 * unless you are implementing a custom component interaction with
 * `useElementInteraction`.
 *
 * @see {@link useElementInteraction} for example usage.
 */
export function RippleContainer(props: RippleContainerProps): ReactElement {
  const { className, ripples, onEntered, onExited } = props;

  return (
    <span className={cnb("rmd-ripple-container", className)}>
      {ripples.map((ripple) => (
        <Ripple
          key={ripple.startTime}
          ripple={ripple}
          onEntered={onEntered}
          onExited={onExited}
        />
      ))}
    </span>
  );
}