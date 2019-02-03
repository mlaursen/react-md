import React, {
  ReactNode,
  ComponentType,
  FunctionComponent,
  forwardRef,
} from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";
import { useIsKeyboardFocused } from "@react-md/wia-aria";

import { useStatesContext, useRipplesState, usePressedStates } from "./hooks";
import { IStatesContext } from "./context";
import { MergableRippleHandlers } from "./types.d";

import RippleContainer from "./RippleContainer";
import FixColorPollution from "./FixColorPollution";

export interface IWithStatesInjectedProps {
  className?: string;
  children?: ReactNode;
}

export interface IWithStatesConfig<E extends HTMLElement = HTMLElement>
  extends Partial<IStatesContext>,
    IWithForwardedRef<E>,
    MergableRippleHandlers<E> {
  /**
   * Boolean if the wrapped component needs to have the functionality of a keyboard click
   * event. This is really only necessary when the wrapped component is not a native clickable
   * element like a `<button>`.
   */
  enableKeyboardClick?: boolean;

  /**
   * Boolean if the spacebar should not trigger a click event when using the `enableKeyboardClick`
   * prop. You _normally_ want the spacebar to also trigger a click event when the `enableKeyboardClick`
   * prop is enabled, but there are a few cases where it should not (like custom links).
   *
   * When this is disabled, it will also make sure that the ripple and pressed effects are not triggered
   * from a spacebar click.
   */
  disableSpacebarClick?: boolean;

  /**
   * Boolean if the component should fallback to using the custom pressed class names when ripples are
   * disabled.
   */
  disablePressedFallback?: boolean;
}

/**
 * This is probably one of the most useful higher-order-components in react-md.
 * Any component that is wrapped in this will gain all the different interaction
 * states based on the states context or any custom overrides. If any of the props
 * are `undefined` that can be extracted from the `StatesContext`, their values
 * will be populated from the current context before continuing.
 *
 * @typeparam P The props for the component being wrapped.
 * @typeparam E The element type for the component being wrapped. This is just used
 * for the forwardRef ability and typing some of the event handlers better.
 */
export default function withStates<
  P extends IWithStatesInjectedProps = IWithStatesInjectedProps,
  E extends HTMLElement = HTMLElement
>(Component: ComponentType<P>) {
  const WithStates: FunctionComponent<
    P & IWithStatesConfig<E>
  > = providedProps => {
    const {
      forwardedRef,
      rippleClassName,
      rippleContainerClassName,
      // unable to set default props since getting a weird type error that these do not exist
      enableKeyboardClick = false,
      disablePressedFallback = false,
      disableSpacebarClick = false,
      rippleTimeout: propRippleTimeout,
      rippleClassNames: propRippleClassNames,
      disableRipple: propDisableRipple,
      disableProgrammaticRipple: propDisableProgrammaticRipple,
      preventColorPollution: propPreventColorPollution,
      children: propChildren,
      ...props
    } = providedProps as any;

    let {
      className,
      children,
      disableRipple,
      disableProgrammaticRipple,
      preventColorPollution,
      rippleTimeout,
      rippleClassNames,
    } = providedProps;

    // populate undefined props from their context values
    const context = useStatesContext();
    if (typeof disableRipple === "undefined") {
      ({ disableRipple } = context);
    }

    if (typeof disableProgrammaticRipple === "undefined") {
      ({ disableProgrammaticRipple } = context);
    }

    if (typeof preventColorPollution === "undefined") {
      ({ preventColorPollution } = context);
    }

    if (typeof rippleTimeout === "undefined") {
      ({ rippleTimeout } = context);
    }

    if (typeof rippleClassNames === "undefined") {
      ({ rippleClassNames } = context);
    }

    // this will be populated with a list of event handlers for managing the different
    // interaction states for an element. This will only be undefined if both the ripple
    // and pressed fallback states are disabled
    let handlers: MergableRippleHandlers | null = null;
    let ripplesContainer: ReactNode = null;
    if (!disableRipple) {
      // if the ripple effect is not disabled, will we have ripple interaction states
      // instead of just pressed states.
      const { ripples, setRipples, eventHandlers } = useRipplesState(
        providedProps
      );
      handlers = eventHandlers;

      ripplesContainer = (
        <RippleContainer
          ripples={ripples}
          setRipples={setRipples}
          className={rippleContainerClassName}
          rippleClassName={rippleClassName}
          timeout={rippleTimeout}
          classNames={rippleClassNames}
        />
      );
    } else if (!disablePressedFallback) {
      // if the ripple effect was disabled and the default pressed state interactions were
      // also not disabled, we can hook into it there
      const { pressed, eventHandlers } = usePressedStates(providedProps);
      handlers = eventHandlers;
      className = cn(className, {
        "rmd-states--pressed": pressed,
      });
    }

    if (props.id) {
      // if the element is "valid" and has an id, we can also start the keyboard focus only
      // states for the element by merging the class name
      className = cn(className, {
        "rmd-states--focused": useIsKeyboardFocused(props.id),
      });
    } else if (process.env.NODE_ENV !== "production") {
      console.error(
        "Found a component that does not have an `id` prop, but is wrapped `withStates`. " +
          "This component will be unable to have keyboard focus states applied until this is fixed."
      );
      console.error(new Error().stack);
    }

    // TODO: Look into a better way of fixing color pollution and adding ripples to the component.
    // The problem with this current approach is that if the composed component wraps the children
    // in other components/elements for styling, the ripples and color pollution fixes will not
    // work as expected and positioning will be wrong. The current workaround is to create another
    // wrapper for the "custom" component children and do the wrapping before passing to the WithStates
    // hoc. ListItem is a good example of this
    if (preventColorPollution) {
      // note that the `ripplesContainer` is NOT added to the color pollution fix children. if the
      // ripples are added in here, the same color problems will occur when the ripples are visible
      children = <FixColorPollution>{children}</FixColorPollution>;
    }

    // "polyfill" the keyboard click events for elements that are supposed to behave like clickable
    // elements but really aren't. this will make sure to merge existing onKeyDown behaviors from
    // the ripple/pressed effects (if any) or the onKeyDown behavior from props
    if (enableKeyboardClick) {
      const { onKeyDown } = handlers || providedProps;
      if (!handlers) {
        handlers = {};
      }

      handlers.onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (onKeyDown) {
          onKeyDown(event);
        }

        if (!disableSpacebarClick && event.key === " ") {
          // need to prevent default behavior of screen scrolling
          event.preventDefault();
          event.currentTarget.click();
        } else if (event.key === "Enter") {
          event.currentTarget.click();
        }
      };
    }

    return (
      <Component
        {...props}
        {...handlers}
        ref={forwardedRef}
        className={className}
      >
        {children}
        {ripplesContainer}
      </Component>
    );
  };

  if (process.env.NODE_ENV !== "production") {
    WithStates.displayName = `withStates(${Component.displayName ||
      "unknown"})`;

    // unable to set prop types due to weird ts error
  }

  return forwardRef<E, P & IWithStatesConfig>((props, ref) => (
    <WithStates {...props} forwardedRef={ref} />
  ));
}
