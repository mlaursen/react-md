import React, { ReactNode, ComponentType, FunctionComponent } from "react";
import cn from "classnames";

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
    MergableRippleHandlers<E> {
  disablePressedFallback?: boolean;
}

/**
 * This is probably one of the most useful higher-order-components in react-md.
 * Any component that is wrapped in this will gain all the different interaction
 * states based on the states context or any custom overrides. If any of the props
 * are `undefined` that can be extracted from the `StatesContext`, their values
 * will be populated from the current context before continuing.
 */
export default function withStates<
  Props extends IWithStatesInjectedProps = IWithStatesInjectedProps
>(Component: ComponentType<Props>) {
  const WithStates: FunctionComponent<
    Props & IWithStatesConfig
  > = providedProps => {
    const {
      rippleClassName,
      rippleContainerClassName,
      disablePressedFallback = false,
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
    let handlers;
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
      console.warn(
        "Found a component that does not have an `id` prop, but is wrapped `withStates`. " +
          "This component will be unable to have keyboard focus states applied until this is fixed."
      );
      console.warn(new Error().stack);
    }

    if (preventColorPollution) {
      // note that the `ripplesContainer` is NOT added to the color pollution fix children. if the
      // ripples are added in here, the same color problems will occur when the ripples are visible
      children = <FixColorPollution>{children}</FixColorPollution>;
    }

    return (
      <Component {...props} {...handlers} className={className}>
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

  return WithStates;
}
