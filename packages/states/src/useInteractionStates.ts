import { ReactNode } from "react";
import cn from "classnames";
import { Maybe, Omit } from "@react-md/utils";

import { MergableRippleHandlers, RipplesOptions } from "./ripples/types.d";
import useRipples from "./ripples/useRipples";
import {
  StatesConfigContextType,
  useStatesConfigContext,
} from "./StatesConfig";
import useKeyboardClickPolyfill from "./useKeyboardClickPolyfill";
import usePressedStates from "./usePressedStates";

export interface InteractionStatesOptions<E extends HTMLElement = HTMLElement>
  extends Omit<Partial<StatesConfigContextType>, "mode">,
    RipplesOptions<E> {
  /**
   * An optional className to merge with the different interaction states.
   */
  className?: string;

  /**
   * Boolean if the spacebar should not trigger a click event when using the user
   * pressed spacebar on a focusable element. You _normally_ want the spacebar to
   * also trigger a click event , but there are a few cases where it should not
   * (like custom links).
   *
   * When this is disabled, it will also make sure that the ripple and pressed effects
   * are not triggered from a spacebar click.
   *
   * @default false
   */
  disableSpacebarClick?: boolean;

  /**
   * Boolean if the component should fallback to using the custom pressed class names when ripples are
   * disabled.
   *
   * @default false
   */
  disablePressedFallback?: boolean;

  /**
   * Boolean if the element should be able to gain both the ripple effect and the
   * pressed states changes. This will only be enabled if both the  `disableRipple`
   * and `disabledPressedFallback` are still `false`
   */
  enablePressedAndRipple?: boolean;
}

/**
 * This is probably one of the most useful hook in react-md. Any functional component component that uses
 * this will gain all the different interaction states based on the states context or any custom overrides.
 *
 * The main interaction state is the "ripple" effect when an element has been clicked either via keyboard,
 * mouse, or touch.
 *
 * If the ripple effect is disabled, it will fallback to "polyfilling"/fixing the `:pressed` pseudo-selector
 * state for items so that a different background-color opacity is applied instead of the entire ripple
 * effect. This is polyfilled since the `:pressed` state does not work on anything other than buttons and links
 * by default and it is not triggered on "valid" keyboard clicks with a spacebar.
 *
 * Finally, the element that uses this hook will gain a focused className whenever it gains keyboard focus only.
 *
 * To get all these interaction states to work correctly, this hook returns an object containing:
 * - `handlers`- an object of event handlers that must be passed down to your component to get the different
 *  interaction states. All the event handlers are automatically merged with any `handlers` that are provided
 *  to this hook so they can all be called if needed.
 * - `className` - the current class name for the element
 * - `ripples` - a renderable element that displays the ripple effects. This will be `null` when ripples are
 *  disabled.
 *
 * @typeparam E The element type for the component being wrapped. This is really just used to "better type"
 * the event handlers.
 */
export function useInteractionStates<E extends HTMLElement = HTMLElement>(
  options: InteractionStatesOptions<E> = {}
) {
  const {
    disabled,
    rippleClassName,
    rippleContainerClassName,
    disableSpacebarClick = false,
    disablePressedFallback = false,
    enablePressedAndRipple = false,
  } = options;

  let {
    className,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
  } = options;

  // populate undefined props from their context values
  const context = useStatesConfigContext();
  if (typeof disableRipple === "undefined") {
    ({ disableRipple } = context);
  }

  if (typeof disableProgrammaticRipple === "undefined") {
    ({ disableProgrammaticRipple } = context);
  }

  if (typeof rippleTimeout === "undefined") {
    ({ rippleTimeout } = context);
  }

  if (typeof rippleClassNames === "undefined") {
    ({ rippleClassNames } = context);
  }

  let handlers: Maybe<MergableRippleHandlers<E>> = null;
  let ripples: ReactNode = null;
  if (!disableRipple) {
    ({ ripples, handlers } = useRipples({
      ...options,
      disableSpacebarClick,
      disableRipple,
      disableProgrammaticRipple,
      rippleTimeout,
      rippleClassName,
      rippleContainerClassName,
    }));
  }

  if (enablePressedAndRipple || (disableRipple && !disablePressedFallback)) {
    const result = usePressedStates({
      ...options,
      handlers: handlers || options.handlers,
      disableSpacebarClick,
    });

    ({ handlers } = result);
    className = cn(className, { "rmd-states--pressed": result.pressed });
  }

  handlers = handlers || options.handlers || ({} as MergableRippleHandlers<E>);

  handlers.onKeyDown = useKeyboardClickPolyfill(
    handlers.onKeyDown,
    disabled,
    disableSpacebarClick
  );

  return {
    ripples,
    className,
    handlers,
  };
}
